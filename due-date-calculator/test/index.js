import { expect } from 'chai';
import dueDateCalculator from '../src/dueDateCalculator';

describe('Due date calculator tests', () => {
  const MONDAY_START = new Date('10 April, 2017 09:00:00');
  const MONDAY_END = new Date('10 April, 2017 17:00:00');
  const TUESDAY_START = new Date('11 April, 2017 09:00:00');
  const FRIDAY_END = new Date('14 April, 2017 17:00:00');
  const SATURDAY = new Date('15 April, 2017');

  const MONDAY_START_PLUS_HOUR = new Date(MONDAY_START);
  MONDAY_START_PLUS_HOUR.setHours(MONDAY_START.getHours() + 1);

  const MONDAY_START_MINUS_HOUR = new Date(MONDAY_START);
  MONDAY_START_MINUS_HOUR.setHours(MONDAY_START.getHours() - 1);

  const MONDAY_START_PLUS_WEEK = new Date(MONDAY_START);
  MONDAY_START_PLUS_WEEK.setDate(MONDAY_START.getDate() + 7);

  const MONDAY_END_PLUS_HOUR = new Date(MONDAY_END);
  MONDAY_END_PLUS_HOUR.setHours(MONDAY_END.getHours() + 1);

  const MONDAY_START_MINUS_MINUTE = new Date(MONDAY_START);
  MONDAY_START_MINUS_MINUTE.setMinutes(MONDAY_START.getMinutes() - 1);

  const MONDAY_END_PLUS_MINUTE = new Date(MONDAY_END);
  MONDAY_END_PLUS_MINUTE.setMinutes(MONDAY_END.getMinutes() + 1);

  const MONDAY_END_PLUS_SECOND = new Date(MONDAY_END);
  MONDAY_END_PLUS_SECOND.setSeconds(MONDAY_END.getSeconds() + 1);

  const MONDAY_END_PLUS_MILLI = new Date(MONDAY_END);
  MONDAY_END_PLUS_MILLI.setMilliseconds(MONDAY_END.getMilliseconds() + 1);

  const TUESDAY_START_PLUS_HOUR = new Date(TUESDAY_START);
  TUESDAY_START_PLUS_HOUR.setHours(TUESDAY_START.getHours() + 1);

  it('Should reject submit times that are not Date() objects', () => {
    expect(() => dueDateCalculator(1, 1)).to.throw(TypeError);
    expect(() => dueDateCalculator(null, 1)).to.throw(TypeError);
    expect(() => dueDateCalculator('a string', 1)).to.throw(TypeError);
    expect(() => dueDateCalculator({}, 1)).to.throw(TypeError);
  });

  it('Should reject turnaround times that are not valid numbers', () => {
    expect(() => dueDateCalculator(MONDAY_START, null)).to.throw(TypeError);
    expect(() => dueDateCalculator(MONDAY_START, 'a string')).to.throw(TypeError);
    expect(() => dueDateCalculator(MONDAY_START, {})).to.throw(TypeError);
    expect(() => dueDateCalculator(MONDAY_START, 0)).to.throw(RangeError);
    expect(() => dueDateCalculator(MONDAY_START, -1)).to.throw(RangeError);
  });

  it('Should reject submit times outside of working hours', () => {
    // Submit: Saturday (invalid)
    expect(() => dueDateCalculator(SATURDAY, 1)).to.throw(RangeError);

    // Submit: Monday 6:00 PM (invalid)
    expect(() => dueDateCalculator(MONDAY_END_PLUS_HOUR, 1)).to.throw(RangeError);

    // Submit: Monday 8:00 AM (invalid)
    expect(() => dueDateCalculator(MONDAY_START_MINUS_HOUR, 1)).to.throw(RangeError);

    // Submit: Monday 8:59 PM (invalid)
    expect(() => dueDateCalculator(MONDAY_START_MINUS_MINUTE, 1)).to.throw(RangeError);

    // Submit: Monday 5:01 PM (invalid)
    expect(() => dueDateCalculator(MONDAY_END_PLUS_MINUTE, 1)).to.throw(RangeError);

    // Submit: Monday 5:00:01 PM (invalid)
    expect(() => dueDateCalculator(MONDAY_END_PLUS_SECOND, 1)).to.throw(RangeError);

    // Submit: Monday 5:00:00:0001 PM (invalid)
    expect(() => dueDateCalculator(MONDAY_END_PLUS_MILLI, 1)).to.throw(RangeError);
  });

  it('Should correctly calculate a same-day turnaround time', () => {
    // Submit: Monday 9:00 AM
    // Turnaround: Monday 10:00 AM (1 business hour)
    expect(dueDateCalculator(MONDAY_START, 1).toString()).to.equal(MONDAY_START_PLUS_HOUR.toString());
    console.log(dueDateCalculator(MONDAY_START,1).toString());
  });

  it('Should correctly calculate a next day turnaround time between weekdays', () => {
    // Submit: Monday 5:00 PM
    // Turnaround: Tuesday 10:00 AM (1 business hour)
    expect(dueDateCalculator(MONDAY_END, 1).toString()).to.equal(TUESDAY_START_PLUS_HOUR.toString());

    // Submit: Monday 10:00 AM
    // Turnaround: Tuesday 10:00 AM (1 business day)
    expect(dueDateCalculator(MONDAY_START_PLUS_HOUR, 8).toString()).to.equal(TUESDAY_START_PLUS_HOUR.toString());

    // Submit: Monday 9:00 AM
    // Turnaround: Tuesday 10:00 AM (1 business day + 1 hour)
    expect(dueDateCalculator(MONDAY_START, 9).toString()).to.equal(TUESDAY_START_PLUS_HOUR.toString());
  });

  it('Should correctly calculate turnaround time when there is a weekend inbetween', () => {
    // Submit: Monday 9:00 AM
    // Turnaround: Monday 9:00 AM (1 business week)
    expect(dueDateCalculator(MONDAY_START, 48).toString()).to.equal(MONDAY_START_PLUS_WEEK.toString());
  });
});
