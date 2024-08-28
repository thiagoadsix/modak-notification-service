import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
