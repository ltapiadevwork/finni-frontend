// jest.config.ts
export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // or setupTests.ts
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
