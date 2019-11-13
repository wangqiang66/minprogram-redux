/**
 * function: jest.config
 * author  : wq
 * update  : 2019/11/12 11:32
 */
const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname),
  coverageDirectory: './test/coverage/',
  collectCoverage: true,
  testURL: 'http://localhost',
  testMatch: [`<rootDir>/test/unit/**/*.js`],
  globals: {
    wx: true,
    dd: true,
    my: true
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  setupFiles: ['<rootDir>/test/setup'],
}
