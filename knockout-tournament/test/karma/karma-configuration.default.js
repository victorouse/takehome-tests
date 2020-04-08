module.exports = function (configuration) {
  let config = {
    autoWatch: true,
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    exclude: [
    ],
    files: [
      '../../client/**/*.js',
      '../../test/karma/**/*_test.js'
    ],
    frameworks: [
      'mocha',
      'sinon-chai'
    ],
    reporters: ['progress'],
    port: 9876,
    singleRun: false,
    customLaunchers: {
      chrome_travis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    }
  }

  if (process.env.TRAVIS) {
    configuration.browsers = ['chrome_travis'];
  }

  configuration.set(config)
}
