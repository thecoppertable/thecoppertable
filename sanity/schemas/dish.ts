import { defineField, defineType } from "sanity";
import { imageField, orderField } from "./fields";

export const dish = defineType({
  name: "dish",
  title: "Dish",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, validation: (r) => r.required() }),
    defineField({ name: "description", type: "text", rows: 2, description: "One short line, e.g. 'Rich, creamy and full of flavour.'" }),
    defineField({ name: "category", type: "reference", to: [{ type: "menuCategory" }], validation: (r) => r.required() }),
    defineField({ name: "price", title: "Price (AED)", type: "number", validation: (r) => r.min(0) }),
    defineField({ name: "priceNote", title: "Price note", type: "string", description: "Optional, e.g. 'per 100g'." }),
    imageField(),
    defineField({
      name: "signature",
      title: "Guest Favourite",
      type: "boolean",
      description: "Show this dish in 'Our Guest Favourites' on the homepage.",
      initialValue: false,
    }),
    defineField({
      name: "tags",
      title: "Dietary tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Vegan", value: "vegan" },
          { title: "Gluten-free", value: "gluten-free" },
          { title: "Contains nuts", value: "nuts" },
          { title: "Spicy", value: "spicy" },
        ],
      },
    }),
    orderField,
  ],
  preview: { select: { title: "name", subtitle: "category.title", media: "image" } },
});