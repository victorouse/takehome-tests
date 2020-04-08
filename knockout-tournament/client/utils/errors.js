const VALIDATION_ERRORS = {
  NO_TEAMS_PER_MATCH: 'Oops, you forgot to give me the teams per match',
  NO_NUMBER_OF_TEAMS: 'Oops, you forgot to give me the number of teams in the tournament',
  INVALID_TEAM_NUMBER: 'Can\'t run a tournament with 1 or fewer teams per match',
  INVALID_ROUND_NUMBER: 'Wait... you can\'t make a knockout tournament with that number of teams'
}

const ERRORS = Object.assign(VALIDATION_ERRORS);
