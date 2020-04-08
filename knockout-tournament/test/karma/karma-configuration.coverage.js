module.exports = function (configuration) {
  let config = {
    basePath: '',
    browsers: ['Chrome'],
    colors: true,
    exclude: [
    ],
    preprocessors: {
      '../../client/**/*.js': ['coverage']
    },
    files: [
      '../../client/**/*.js',
      '../../test/karma/**/*_test.js'
    ],
    frameworks: [
      'mocha',
      'sinon-chai',
    ],
    reporters: ['progress', 'coverage'],
    port: 9876,
    singleRun: true,
    customLaunchers: {
      chrome_travis: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    coverageReporter: {
      dir: '../../coverage',
      reporters: [
        { type: 'text' },
        { type: 'json', subdir: 'client' },
        { type: 'lcovonly', subdir: 'client' },
        { type: 'html', subdir: 'client' }
      ]
    }
  }

  if (process.env.TRAVIS) {
    configuration.browsers = ['chrome_travis'];
  }

  configuration.set(config)
}
