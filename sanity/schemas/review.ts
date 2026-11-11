import { defineField, defineType } from "sanity";

export const review = defineType({
  name: "review",
  title: "Guest review",
  type: "document",
  description: "Only publish genuine reviews (from Google, TripAdvisor, or with the guest's permission).",
  fields: [
    defineField({ name: "author", type: "string", validation: (r) => r.required() }),
    defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required().max(280) }),
    defineField({ name: "rating", type: "number", initialValue: 5, validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "source", type: "string", description: "e.g. Google, TripAdvisor" }),
    defineField({ name: "featured", title: "Show on homepage", type: "boolean", initialValue: true }),
  ],
  preview: { select: { title: "author", subtitle: "quote" } },
});