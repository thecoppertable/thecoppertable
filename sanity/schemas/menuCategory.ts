import { defineField, defineType } from "sanity";
import { orderField } from "./fields";

export const menuCategory = defineType({
  name: "menuCategory",
  title: "Menu category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", description: "e.g. Starters, Mains, Desserts", validation: (r) => r.required() }),
    defineField({ name: "description", type: "string" }),
    orderField,
  ],
  orderings: [{ title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] }],
});