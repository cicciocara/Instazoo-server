import { Static, Type } from '@sinclair/typebox';

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

export const animalsSchemaUpdate = Type.Object(
  {
    animal: Type.Object({
      name: Type.Optional(Type.String()),
      latin_name: Type.Optional(Type.String()),
      geo_range: Type.Optional(Type.String()),
      animal_type: Type.Optional(Type.String()),
      diet: Type.Optional(Type.String()),
      habitat_id: Type.Optional(Type.Integer()),
      image_link: Type.Optional(Type.String()),
    }),
    image: Type.Optional(Type.String()),
  },
  { additionalProperties: false }
);

export type AnimalsDataUpdate = Static<typeof animalsSchema>;
