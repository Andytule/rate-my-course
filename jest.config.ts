exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    "\\.(css|less)$": "identity-obj-proxy",
  },
  "jest": {
    "testEnvironment": "jsdom"
  }
};
