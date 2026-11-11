import { defineArrayMember, defineField, defineType } from "sanity";
import { imageField, orderField } from "./fields";

export const location = defineType({
  name: "location",
  title: "Branch",
  type: "document",
  fields: [
    defineField({ name: "emirate", title: "Emirate", type: "string", description: "e.g. Sharjah", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "emirate" }, validation: (r) => r.required() }),
    defineField({ name: "venue", title: "Mall / venue", type: "string", description: "e.g. City Centre Al Zahia" }),
    defineField({ name: "area", type: "string", description: "e.g. Sharjah or Al Maryah Island" }),
    defineField({ name: "address", title: "Full address", type: "text", rows: 2 }),
    defineField({ name: "phone", type: "string" }),
    defineField({ name: "whatsapp", title: "WhatsApp number", type: "string", description: "Digits only, e.g. 9715XXXXXXXX" }),
    defineField({
      name: "hours",
      title: "Opening hours",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "days", type: "string", description: "e.g. Monday – Thursday" }),
            defineField({ name: "time", type: "string", description: "e.g. 12:00 – 23:00" }),
          ],
          preview: { select: { title: "days", subtitle: "time" } },
        }),
      ],
    }),
    defineField({ name: "mapQuery", title: "Google Maps search", type: "string", description: "Name or address exactly as on Google Maps." }),
    imageField(),
    orderField,
  ],
  preview: { select: { title: "emirate", subtitle: "venue", media: "image" } },
});