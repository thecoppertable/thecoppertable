import { defineField, defineType } from "sanity";
import { imageField, orderField } from "./fields";

export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery photo",
  type: "document",
  fields: [
    imageField("image", "Photo", true),
    defineField({ name: "caption", type: "string" }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          { title: "Food", value: "food" },
          { title: "Interior", value: "interior" },
          { title: "Events", value: "events" },
          { title: "Team", value: "team" },
        ],
        layout: "radio",
      },
      initialValue: "food",
    }),
    orderField,
  ],
  preview: { select: { title: "caption", subtitle: "category", media: "image" } },
});