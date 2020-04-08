const adjectives = require('./adjectives');
const employees = require('./employees');

class TeamNameGenerator {
  constructor(adjectives, employees) {
    this.adjectivesList = adjectives;
    this.canvaEmployeeNames = employees;
  }

  static create() {
    const adjectivesList = new RandomizedList(adjectives);
    const canvaEmployeeNames = new RandomizedList(employees);
    return new TeamNameGenerator(adjectivesList, canvaEmployeeNames);
  }

  next() {
    return `${this.adjectivesList.next()} ${this.canvaEmployeeNames.next()}`;
  }
}

class RandomizedList {
  constructor(srcList) {
    this.list = [];
    this.srcList = srcList;
  }

  next() {
    if (this.list.length === 0) {
      this.list = this.srcList.slice();
    }

    const randomIndex = Math.floor(Math.random() * this.list.length);
    return this.list.splice(randomIndex, 1)[0];
  }
}

module.exports = TeamNameGenerator;
