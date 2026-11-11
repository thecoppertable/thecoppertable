import { defineField, defineType } from "sanity";
import { imageField, orderField } from "./fields";

export const chef = defineType({
  name: "chef",
  title: "Chef",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", description: "e.g. Chef Marco Bianchi", validation: (r) => r.required() }),
    defineField({ name: "role", type: "string", description: "e.g. Executive Chef" }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({ name: "philosophy", title: "Culinary philosophy", type: "string" }),
    imageField(),
    orderField,
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});