const input = {
  teamsPerMatch: document.getElementById('teamsPerMatch'),
  numberOfTeams: document.getElementById('numberOfTeams'),
  startButton: document.getElementById('start')
}

const output = {
  winner: document.getElementById('winner'),
  winnerCelebrate: document.getElementById('winner-celebrate'),
  matches: document.getElementById('matches'),
  log: document.getElementById('log'),
  logMessage: document.getElementsByClassName('log-message'),
  spinner: document.getElementById('spinner')
}

const error = {
  inputErrorList: document.getElementById('input-error-list')
}

const selectors = Object.assign(input, output, error);
