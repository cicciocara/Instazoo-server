import passportLocal from 'passport-local';
import passport from 'passport';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const LocalStrategy = passportLocal.Strategy;

const localStrategy = new LocalStrategy(async function (
  username,
  password,
  done
) {
  const users = await prisma.users.findMany();
  const user = users.find((user) => user.username === username);

  if (!user) {
    return done(null, false, { message: 'Credentials are wrong' });
  }
  const isCorrectPwd = await bcrypt.compare(password, user.password);
  if (!isCorrectPwd) {
    return done(null, false, { message: 'Credentials are wrong' });
  }
  return done(null, user);
});

export default localStrategy;
