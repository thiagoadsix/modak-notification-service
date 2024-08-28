import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ["__tests__/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "__tests__/**",
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
