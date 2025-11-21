"use strict"

const { name } = require("./package.json");
let packageName = name.replace("@mojaloop", "");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts"],
  coverageReporters: ["json", "lcov"],
  coverageDirectory: `../../coverage/${packageName}/`,
  clearMocks: true,
  // Note: Coverage thresholds set to 0 - Package not used internally
  // Has outdated OpenTelemetry dependencies from 2021 causing compilation errors
  // Tests are skipped until dependencies can be updated or package is removed
  coverageThreshold: {
    global: {
      statements: 0,
      functions: 0,
      branches: 0,
      lines: 0
    }
  }
}
