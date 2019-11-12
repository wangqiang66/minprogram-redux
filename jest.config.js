/**
 * function: jest.config
 * author  : wq
 * update  : 2019/11/12 11:32
 */

module.exports = {
  rootDir: path.resolve(__dirname, './'),
  coverageDirectory: './test/coverage/',
  collectCoverage: true,
  testURL: 'http://localhost',
  global: {
    wx: true,
    dd: true,
    my: true
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  }
}
