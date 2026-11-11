import { defineField } from "sanity";

/** Image with cropping and required alt text (for accessibility and Google). */
export const imageField = (name = "image", title = "Photo", required = false) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Describe the photo",
        type: "string",
        description: "For screen readers and Google, e.g. 'Truffle risotto with parmesan'.",
        validation: (rule) => rule.required(),
      }),
    ],
    validation: required ? (rule) => rule.required() : undefined,
  });

export const orderField = defineField({
  name: "order",
  title: "Display order",
  type: "number",
  description: "Lower numbers appear first.",
  initialValue: 10,
});