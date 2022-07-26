import express from "express";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import {
  validate,
  validationErrorMiddleware,
  animalsSchema,
  AnimalsData,
} from "./lib/validation";
import { nextTick } from "process";

const prisma = new PrismaClient();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

app.get("/animals", async (req, res) => {
  try {
    const animalsArr = await prisma.animals.findMany({
      include: { Habitats: { select: { name: true } } },
    });

    res.status(200).json(animalsArr);
  } catch (error) {
    res.status(401).send(error);
  }
});

app.get("/animals/:id(\\d+)", async (req, res) => {
  const idAnimal = Number(req.params.id);
  try {
    const animal = await prisma.animals.findUnique({
      where: { id: idAnimal },
      include: { Habitats: { select: { name: true } } },
    });
    if (!animal) {
      return res.status(404).json({ message: "Do not exists" });
    }
    res.status(200).json(animal);
  } catch (error) {
    res.status(401).json(error);
  }
});

app.post("/animals", validate({ body: animalsSchema }), async (req, res) => {
  const newAnimal: AnimalsData = req.body;
  try {
    const animal = await prisma.animals.create({
      data: newAnimal,
      include: { Habitats: { select: { name: true } } },
    });

    res.status(201).json({ animal: animal, message: "Added correctly" });
  } catch (error) {
    res.status(401).send(error);
  }
});

app.patch(
  "/animals/:id(\\d+)",
  validate({ body: animalsSchema }),
  async (req, res) => {
    const editAnimal: AnimalsData = req.body;
    const idAnimal = Number(req.params.id);
    try {
      const animal = await prisma.animals.update({
        where: { id: idAnimal },
        data: editAnimal,
        include: { Habitats: { select: { name: true } } },
      });

      if (!animal) {
        return res.status(404).json({ message: "Something gone wrong" });
      }

      res.status(200).json({ animal: animal, message: "Edited correctly" });
    } catch (error) {
      res.status(404).send(error);
    }
  }
);

app.delete("/animals/:id(\\d+)", async (req, res) => {
  const idAnimal = Number(req.params.id);
  try {
    const animalToDelete = await prisma.animals.delete({
      where: { id: idAnimal },
    });

    if (!animalToDelete) {
      return res
        .status(404)
        .json({ message: `Cannot delete Animal whit this id : ${idAnimal}` });
    }

    res.status(204).json({ message: "Animal Deleted" });
  } catch (error) {
    res.status(404).send(error);
  }
});

app.use(validationErrorMiddleware);
app.listen(port);
