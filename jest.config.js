module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testPathIgnorePatterns: ["vendor/", "factories.ts"],
}
