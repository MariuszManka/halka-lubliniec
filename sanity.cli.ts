import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  },
  studioHost: process.env.SANITY_STUDIO_HOST || "halka-lubliniec",
  deployment: {
    appId: "kgz7fezcj9tltt04qb6ai63a",
  },
});
