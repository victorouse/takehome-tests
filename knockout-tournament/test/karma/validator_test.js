describe('Input validation', function() {
  let errorList;
  let validator;

  before(function() {
    errorList = document.createElement('ul');
    validator = new Validator(errorList);
  });

  beforeEach(function() {
    errorList.innerHTML = '';
  });

  it('should prompt for input when there is none', function() {
    const addError = sinon.spy(validator, '_addError');

    validator.validateInput('', '');
    expect(errorList.childNodes.length).to.equal(2);
    expect(errorList.childNodes[0].innerText).to.equal(ERRORS.NO_TEAMS_PER_MATCH);
    expect(errorList.childNodes[1].innerText).to.equal(ERRORS.NO_NUMBER_OF_TEAMS);
    expect(addError.callCount).to.equal(2);

    addError.restore();
  });

  it('should prompt for number of teams when there is none', function() {
    const addError = sinon.spy(validator, '_addError');

    validator.validateInput('', '4');
    expect(errorList.childNodes.length).to.equal(1);
    expect(errorList.childNodes[0].innerText).to.equal(ERRORS.NO_TEAMS_PER_MATCH);
    expect(addError.callCount).to.equal(1);

    addError.restore();
  });

  it('should prompt for teams per match when there is none', function() {
    const addError = sinon.spy(validator, '_addError');

    validator.validateInput('2', '');
    expect(errorList.childNodes.length).to.equal(1);
    expect(errorList.childNodes[0].innerText).to.equal(ERRORS.NO_NUMBER_OF_TEAMS);
    expect(addError.callCount).to.equal(1);

    addError.restore();
  });

  it('should error if number of teams results in an invalid number of rounds', function() {
    const addError = sinon.spy(validator, '_addError');

    validator.validateInput('2', '5');
    expect(errorList.childNodes.length).to.equal(1);
    expect(errorList.childNodes[0].innerText).to.equal(ERRORS.INVALID_ROUND_NUMBER);
    expect(addError.callCount).to.equal(1);

    addError.restore();
  });

  it('should error if not enough teams per match', function() {
    const addError = sinon.spy(validator, '_addError');

    validator.validateInput('1', '5');
    expect(errorList.childNodes.length).to.equal(1);
    expect(errorList.childNodes[0].innerText).to.equal(ERRORS.INVALID_TEAM_NUMBER);
    expect(addError.callCount).to.equal(1);

    addError.restore();
  });

  it('should allow valid input', function() {
    const addError = sinon.spy(validator, '_addError');

    validator.validateInput('2', '4');
    expect(errorList.childNodes.length).to.equal(0);
    expect(addError.callCount).to.equal(0);

    addError.restore();
  });

  it('should return valid inputs if they are in fact valid', function() {
    const addError = sinon.spy(validator, '_addError');

    validator.validateInput('2', '4');
    expect(errorList.childNodes.length).to.equal(0);
    expect(addError.callCount).to.equal(0);

    const { numberOfTeams, teamsPerMatch, numberOfRounds } = validator.getValidInput();
    expect(numberOfTeams).to.equal(4);
    expect(teamsPerMatch).to.equal(2);
    expect(numberOfRounds).to.equal(2);

    addError.restore();
  });
});
