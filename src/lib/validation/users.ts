import { Static, Type } from "@sinclair/typebox";

export const usersSchema = Type.Object(
  {
    name: Type.String(),
    surname: Type.String(),
    username: Type.String(),
    password: Type.String(),
    email: Type.String(),
    city: Type.String(),
    address: Type.Optional(Type.String()),
    gender: Type.String(),
    age: Type.String(),
  },
  { additionalProperties: false }
);

export type UsersData = Static<typeof usersSchema>;
