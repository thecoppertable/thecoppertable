"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./sanity/client";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "the-copper-table",
  title: "The Copper Table Bistro",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.documentTypeListItem("dish").title("Dishes"),
            S.documentTypeListItem("menuCategory").title("Menu categories"),
            S.divider(),
            S.documentTypeListItem("location").title("Branches"),
            S.documentTypeListItem("chef").title("Chefs"),
            S.divider(),
            S.documentTypeListItem("galleryImage").title("Gallery"),
            S.documentTypeListItem("review").title("Reviews"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});