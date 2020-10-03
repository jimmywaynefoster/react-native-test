module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  setupFiles: ['./jest.mock.js'],
  moduleNameMapper: {
    '^asap/+.*$': '<rootDir>/test/asap.js',
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        filename: 'jest.report.html',
        expand: true,
      },
    ],
  ],
};
