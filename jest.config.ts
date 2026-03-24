import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customConfig: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/tests/e2e/'],
};

// createJestConfig returns an async function; we wrap it to override transformIgnorePatterns
// after nextJest has set its own defaults (nextJest overrides our patterns, so we post-process)
async function jestConfig() {
  const nextConfig = await createJestConfig(customConfig)();
  return {
    ...nextConfig,
    transformIgnorePatterns: [
      '/node_modules/(?!(next-intl|use-intl|@formatjs|intl-messageformat)/)',
    ],
  };
}

export default jestConfig;
