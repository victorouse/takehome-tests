// Constants
const START_OF_BUSINESS = 9;
const END_OF_BUSINESS = 17;
const WORKING_HOURS = 8;
const SATURDAY = 6;
const SUNDAY = 0;
const MONDAY = 1;
const FRIDAY = 5;

/**
 * Returns true if the given day is a weekday.
 *
 * @param {number} day - The day in numerical form i.e. 0 = Sunday, 6 = Saturday
 * @returns {boolean} True if day is a weekday, false otherwise.
 */
function isWeekday(day) {
  // True if day within Monday - Friday
  return day >= MONDAY && day <= FRIDAY;
}

/**
 * Returns true if a particular time given in hours:minutes:seconds:millis is between
 * the start and end of business hours.
 *
 * @param {number} hours - The amount of hours.
 * @param {number} minutes - The amount of minutes.
 * @param {number} seconds - The amount of seconds.
 * @param {number} millis - The amount of milliseconds.
 * @returns {boolean} True if time is between working hours, false otherwise.
 */
function isBetweenWorkingHours(hours, minutes, seconds, millis) {
  if (hours < START_OF_BUSINESS || hours > END_OF_BUSINESS) {
    // Outside of 9:00 AM - 5:00 PM
    return false;
  }

  if (hours === END_OF_BUSINESS && (minutes > 0 || seconds > 0 || millis > 0)) {
    // Some minutes/seconds/millis past 5 o'clock
    return false;
  }

  return true;
}

/**
 * Validates that the submission date is a Date object, and that the date is on a weekday
 * and between working hours.
 *
 * @param {Date} submitDate - The date of submission.
 */
function validateSubmitDate(submitDate) {
  if (!(submitDate instanceof Date)) {
    throw new TypeError('Invalid submit date: submit date is not a valid Date(..) object');
  }

  const day = submitDate.getDay();

  if (!isWeekday(day)) {
    throw new RangeError('Invalid submit date: submit date is not on a working day (Monday - Friday)');
  }

  const hours = submitDate.getHours();
  const minutes = submitDate.getMinutes();
  const seconds = submitDate.getSeconds();
  const millis = submitDate.getMilliseconds();

  if (!isBetweenWorkingHours(hours, minutes, seconds, millis)) {
    throw new RangeError('Invalid submit date: submit time is not between working hours (9:00:00 AM - 5:00:00 PM)');
  }
}

/**
 * Validates that the turn around time is a number and is greater than or equal to 0.
 *
 * @param {number} turnAroundTime  - The turn around time in hours.
 */
function validateTurnAroundTime(turnAroundTime) {
  if (isNaN(turnAroundTime) || turnAroundTime == null) {
    throw new TypeError('Invalid turnaround time: not a valid number');
  }

  if (turnAroundTime <= 0) {
    throw new RangeError('Invalid turnaround time: cannot be <= 0 hours');
  }
}

/**
 * Recursively calculates the due date by subtracting the amount of hours left
 * on the task, and seeing if it fits into that days business hours. If the task
 * will take longer than a working day, it recurses to the next day (skipping weekends).
 *
 * @param {Date} day - The day to try fit the task into.
 * @param {number} workingHoursLeft - The number of working hours left in that day.
 * @param {number} hoursRemaining - The number of hours left to complete the task.
 * @returns {Date} The due date of the task.
 */
function findDueDate(day, workingHoursLeft, hoursRemaining) {
  const totalHoursRemaining = workingHoursLeft - hoursRemaining;

  // Task can be finished today
  if (totalHoursRemaining >= 0) {
    const dueDate = new Date(day);

    if (totalHoursRemaining === 0) {
      return dueDate;
    }

    dueDate.setHours(dueDate.getHours() + hoursRemaining);
    return dueDate;
  }

  // Try finish on the next day
  const nextDay = new Date(day);
  nextDay.setDate(day.getDate() + 1);

  // Skip weekends
  while (nextDay.getDay() === SATURDAY || nextDay.getDay() === SUNDAY) {
    nextDay.setDate((nextDay.getDate() + 1));
  }

  nextDay.setHours(START_OF_BUSINESS, 0, 0, 0);
  return findDueDate(nextDay, WORKING_HOURS, Math.abs(totalHoursRemaining));
}

/**
 * Calculates the due date given the submission date and expected turn around time.
 *
 * @param {Date} submitDate - The date of submission.
 * @param {number} turnAroundTime  - The turn around time in hours.
 * @returns {Date} Due date of the task.
 */
function calculateDueDate(submitDate, turnAroundTime) {
  validateSubmitDate(submitDate);
  validateTurnAroundTime(turnAroundTime);

  // How many working hours are left today
  const todayCOB = new Date(submitDate);
  todayCOB.setHours(END_OF_BUSINESS, 0, 0, 0);
  const workingHoursLeft = todayCOB.getHours() - submitDate.getHours();

  return findDueDate(submitDate, workingHoursLeft, turnAroundTime);
}

export default calculateDueDate;
