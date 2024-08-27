import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "src/**/index.ts",
        "src/**/*.interface.ts",
        "node_modules",
        "dist",
        "coverage",
        "vitest.config.mts",
      ],
    },
  },
});
