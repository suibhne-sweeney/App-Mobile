module.exports = {
    preset: 'jest-expo',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(jest-)?react-native|@react-native|expo|@expo|@testing-library)'
    ]
  };