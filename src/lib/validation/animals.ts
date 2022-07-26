import { Static, Type } from "@sinclair/typebox";

export const animalsSchema = Type.Object(
  {
    name: Type.String(),
    latinName: Type.String(),
    geoRange: Type.String(),
    type: Type.String(),
    diet: Type.String(),
    habitat_id: Type.Integer(),
  },
  { additionalProperties: false }
);

export type AnimalsData = Static<typeof animalsSchema>;
