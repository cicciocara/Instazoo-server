import { Static, Type } from "@sinclair/typebox";

export const animalsSchema = Type.Object(
  {
    name: Type.String(),
    latin_name: Type.String(),
    geo_range: Type.String(),
    animal_type: Type.String(),
    diet: Type.String(),
    habitat_id: Type.Integer(),
    image_link: Type.String(),
  },
  { additionalProperties: false }
);

export type AnimalsData = Static<typeof animalsSchema>;
