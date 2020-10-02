// https://github.com/testing-library/vue-testing-library/blob/master/src/__mocks__/axios.js

module.exports = {
  get: jest.fn(() => Promise.resolve({data: {}})),
  post: jest.fn(() => Promise.resolve({data: {}})),
}
