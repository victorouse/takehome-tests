class Validator {
  constructor(errorList) {
    this.validMatch = null;
    this.validTeams = null;
    this.validRounds = null;
    this.validationErrors = [];
    this.errorList = errorList;
  }

  validateInput(teamsPerMatch, numberOfTeams) {
    this.validMatch = this._validateMatch(teamsPerMatch);
    this.validTeams = this._validateTeams(numberOfTeams);

    if (this.validMatch && this.validTeams) {
      this.validRounds = this._validateRounds(this.validMatch, this.validTeams);
      if (this.validRounds) {
        this._clearList();
        this._clearErrors();
        return true;
      }
    }

    this._renderErrors();
    return false;
  }

  getValidInput() {
    return {
      teamsPerMatch: this.validMatch,
      numberOfTeams: this.validTeams,
      numberOfRounds: this.validRounds
    }
  }

  _renderErrors() {
    this._clearList();
    this.validationErrors.map((error) => {
      const errorNode = this._createErrorNode(error);
      this.errorList.appendChild(errorNode);
    });
    this._clearErrors();
  }

  _createErrorNode(errorText) {
      const element = document.createElement('li');
      const content = document.createTextNode(errorText);
      element.append(content);
      return element;
  }

  _clearList() {
    this.errorList.innerHTML = '';
  }

  _addError(error) {
    this.validationErrors.push(error);
  }

  _clearErrors() {
    this.validationErrors = [];
  }

  _validateMatch(teamsPerMatch) {
    teamsPerMatch = Math.floor(teamsPerMatch || undefined);

    if (isNaN(teamsPerMatch)) {
      this._addError(ERRORS.NO_TEAMS_PER_MATCH);
      return null;
    }

    if (teamsPerMatch <= 1) {
      this._addError(ERRORS.INVALID_TEAM_NUMBER);
      return null;
    }

    return teamsPerMatch;
  }

  _validateTeams(numberOfTeams) {
    numberOfTeams = Math.floor(numberOfTeams || undefined);

    if (isNaN(numberOfTeams)) {
      this._addError(ERRORS.NO_NUMBER_OF_TEAMS);
      return null;
    }

    return numberOfTeams;
  }

  _validateRounds(teamsPerMatch, numberOfTeams) {
    const numberOfRounds = this._getNumberOfRounds(teamsPerMatch, numberOfTeams);

    if (numberOfRounds == null || numberOfRounds <= 0) {
      this._addError(ERRORS.INVALID_ROUND_NUMBER);
      return null;
    }

    return numberOfRounds;
  }

  _getNumberOfRounds(teamsPerMatch, numberOfTeams) {
    let rounds = 1;
    let teamCount;

    for (teamCount = teamsPerMatch; teamCount < numberOfTeams; teamCount *= teamsPerMatch) {
      rounds++;
    }

    return teamCount === numberOfTeams
        ? rounds
        : null;
  }
}
