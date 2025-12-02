/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/2025"],
  testMatch: ["**/*.test.ts"],
  moduleFileExtensions: ["ts", "js"],
  collectCoverageFrom: ["2025/**/*.ts", "!2025/**/*.test.ts"],
  verbose: true,
};
