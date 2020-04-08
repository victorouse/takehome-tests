# Due Date Calculator

[![Coverage Status](https://coveralls.io/repos/github/victorouse/due-date-calculator/badge.svg?branch=master)](https://coveralls.io/github/victorouse/due-date-calculator?branch=master)
[![Build Status](https://travis-ci.org/victorouse/due-date-calculator.svg?branch=master)](https://travis-ci.org/victorouse/due-date-calculator)

## Installation

This module can be installed via npm by running:

```
npm install @victorouse/due-date-calculator
```

## Usage

```js
const calculateDueDate = require('@victorouse/due-date-calculator');

const submitDate = new Date('Monday 10 April, 2017 9:00:00');
const turnAroundTime = 1;

const dueDate = calculateDueDate(submitDate, turnAroundTime); // returns a Date object
console.log(dueDate.toString()); // prints 'Mon Apr 10 2017 10:00:00'
```

## Documentation


### calculateDueDate(submitDate, turnAroundTime) ⇒ <code>Date</code>
Calculates the due date given the submission date and expected turn around time.

**Kind**: global function  
**Returns**: <code>Date</code> - Due date of the task.  

| Param | Type | Description |
| --- | --- | --- |
| submitDate | <code>Date</code> | The date of submission. |
| turnAroundTime | <code>number</code> | The turn around time in hours. |

A link to the full documentation can be found [here](DOCUMENTATION.md).

## Commands

- `npm run clean` - Remove `dist/` directory
- `npm test` - Run tests
- `npm test:watch` - Run tests with watch option (watches files from `./src/**/*.js`)
- `npm run test:cover` - Runs coverage via [nyc/istanbul](https://github.com/istanbuljs/nyc)
- `npm run cover:publish` - Publishes coverage report to coveralls.io
- `npm run lint` - Lint files using [airbnb-config](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
- `npm run build` - Transpiles ES6 to ES5 and places result in `./dist`
- `npm run prepublish` - Hook for npm. Runs tests, lints, and publishes the coverage report.


