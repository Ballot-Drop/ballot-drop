module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'vue'],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
  },
};

// in the 'test' script, using '--env=jest-environment-jsdom-sixteen' because of:
// https://github.com/testing-library/dom-testing-library/issues/477#issuecomment-598606649
