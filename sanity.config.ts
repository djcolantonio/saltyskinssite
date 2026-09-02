import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schemaTypes } from "./sanity/schemaTypes";
import { sendAsEmailAction } from "./sanity/actions/sendAsEmailAction";

export default defineConfig({
  name: "default",
  title: "Salty Skins Blog",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) =>
      context.schemaType === "post" ? [...prev, sendAsEmailAction] : prev,
  },
});
