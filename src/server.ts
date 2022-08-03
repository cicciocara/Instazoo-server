import express, { application } from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import {
  validate,
  validationErrorMiddleware,
  animalsSchema,
  AnimalsData,
  usersSchema,
  UsersData,
} from './lib/validation';
import { photoUploaderMiddleware } from './lib/middleware/multer';
import localStrategy from './lib/middleware/passport';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from './config';
import session from 'express-session';
import { validateToken } from './lib/middleware/validationToken';
import bcrypt from 'bcrypt';

const generateAccessToken = (id: Number) => {
  return jwt.sign({ id }, config.TOKEN_SECRET);
};

const upload = photoUploaderMiddleware();

const prisma = new PrismaClient();

const port = process.env.PORT;

const app = express();
app.use(
  session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(localStrategy);

// GET ALL ANIMALS

app.get('/animals', async (req, res) => {
  try {
    const animalsArr = await prisma.animals.findMany({
      include: { Habitats: { select: { name: true } } },
    });
    const arr: any = []; // con (if check) ts assegna a 'arr' type any
    for (let i = 1; i < 10; i++) {
      const rndNumber = Math.floor(Math.random() * animalsArr.length);
      const rndAnimal = animalsArr[rndNumber];
      const check = arr.includes(rndAnimal);

      if (check) {
        i--;
      } else {
        arr.push(rndAnimal);
      }
    }

    res.status(200).json(arr);
  } catch (error) {
    res.status(401).send(error);
  }
});

// GET ANIMAL'S DETAILS

app.get('/animals/:id(\\d+)', async (req, res) => {
  const idAnimal = Number(req.params.id);
  try {
    const animal = await prisma.animals.findUnique({
      where: { id: idAnimal },
      include: { Habitats: { select: { name: true } } },
    });
    if (!animal) {
      return res.status(404).json({ message: 'Do not exists' });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(401).json(error);
  }
});

// CREATE NEW ANIMAL

app.post(
  '/animals',
  validateToken,
  validate({ body: animalsSchema }),
  upload.single('image'),
  async (req, res) => {
    const newAnimal: AnimalsData = req.body.animal;
    // const newAnimal = req.body;
    try {
      const animal = await prisma.animals.create({
        data: newAnimal,
        include: { Habitats: { select: { name: true } } },
      });

      res.status(201).json({ animal: animal, message: 'Added correctly' });
    } catch (error: any) {
      res.status(401).send(error);
      console.log(error.message);
    }
  }
);

// EDIT ANIMAL

app.patch(
  '/animals/:id(\\d+)',
  validateToken,
  validate({ body: animalsSchema }),
  upload.single('image'),
  async (req, res) => {
    const editAnimal: AnimalsData = req.body;
    const idAnimal = Number(req.params.id);
    try {
      const animal = await prisma.animals.update({
        where: { id: idAnimal },
        data: editAnimal,
        include: { Habitats: { select: { name: true } } },
      });

      res.status(200).json({ animal: animal, message: 'Edited correctly' });
    } catch (error) {
      res.status(404).json({ message: 'Something gone wrong' });
    }
  }
);

// DELETE ANIMAL

app.delete('/animals/:id(\\d+)', validateToken, async (req, res) => {
  const idAnimal = Number(req.params.id);
  try {
    const animalToDelete = await prisma.animals.delete({
      where: { id: idAnimal },
    });

    res.status(200).json({ message: 'Animal Deleted' });
  } catch (error) {
    res
      .status(404)
      .json({ message: `Cannot delete Animal whit this id : ${idAnimal}` });
  }
});

// GET PREFERRED ANIMALS

app.get('/user/:id(\\d+)/animals', validateToken, async (req, res) => {
  const idUser = Number(req.params.id);
  try {
    const preferredAnimal = await prisma.preferred.findMany({
      where: { user_id: idUser },
      include: {
        Animals: {
          include: {
            Habitats: true,
          },
        },
      },
    });
    res.status(200).json(preferredAnimal);
  } catch (error) {
    res.status(404).json({ message: 'Animals Not found' });
  }
});

// ADD ANIMAL TO PREFERRED

app.post(
  '/user/:id(\\d+)/animals/:animalId(\\d+)',
  validateToken,
  async (req, res) => {
    const idUser = Number(req.params.id);
    const idAnimal = Number(req.params.animalId);
    try {
      const addAnimal = await prisma.preferred.create({
        data: { user_id: idUser, animal_id: idAnimal },
      });

      res
        .status(201)
        .json({ addAnimal: addAnimal, message: 'Animal added successfully' });
    } catch (error) {
      res.status(422).json({ message: `Something gone wrong` });
    }
  }
);

// REMOVE ANIMAL FROM PREFERRED

app.delete(
  '/user/:id(\\d+)/animals/:animalId(\\d+)',
  validateToken,
  async (req, res) => {
    const idUser = Number(req.params.id);
    const idAnimal = Number(req.params.animalId);
    try {
      const deleteAnimal = await prisma.preferred.findMany({
        where: { animal_id: idAnimal, user_id: idUser },
      });
      await prisma.preferred.delete({ where: { id: deleteAnimal[0].id } });
      res.status(201).json({ message: 'Animal deleted successfully' });
    } catch (error) {
      res.status(422).json(error);
    }
  }
);

// USERS SIGNUP

app.post('/signup', validate({ body: usersSchema }), async (req, res) => {
  const newUserValidate: UsersData = req.body;
  try {
    const users = await prisma.users.findMany();
    const {
      name,
      surname,
      username,
      password,
      email,
      city,
      address,
      gender,
      age,
    } = newUserValidate;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      name: name,
      surname: surname,
      username: username,
      password: hashedPassword,
      email: email,
      city: city,
      address: address,
      gender: gender,
      age: age,
    };

    const checkUsername = users.find(
      (user) => user.username === newUser.username
    );

    if (checkUsername) {
      res.status(400).json({ message: 'Username already exists' });
    } else {
      await prisma.users.create({ data: newUser });

      res.status(200).json({ message: 'User added correctly', status: 'ok' });
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(422).json({ message: 'Something gone wrong' });
  }
});

// USERS LOGIN

app.post('/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    const token = generateAccessToken(user.id);
    return res.status(200).json({ token });
  })(req, res, next);
});

// app.post("/add", async (req, res) => {
//   await prisma.animals.createMany({ data: data });

//   res.status(201).json({ message: "Added successfully" });
// });

app.use(express.static('src/assets/img'));
app.use(validationErrorMiddleware);
app.listen(port);
