document.addEventListener('DOMContentLoaded', () => {
  const input = new Validator(selectors.inputErrorList);
  selectors.startButton.addEventListener('click', handleTournament.bind(this, input), false);
});

function handleTournament(input) {
  const confettiContainer = document.querySelector('.confetti-container');
  if (confettiContainer) document.querySelector('html').removeChild(confettiContainer);
  if (input.validateInput(selectors.teamsPerMatch.value, selectors.numberOfTeams.value)) {
    const { numberOfTeams, teamsPerMatch, numberOfRounds } = input.getValidInput();
    const tournamentModel = new TournamentModel(numberOfTeams, teamsPerMatch, numberOfRounds);
    const tournamentView = new TournamentView(tournamentModel);
    const tournamentController = new TournamentController(tournamentModel);
    tournamentController.runSimulation();
  } else {
    TournamentView.clearAll();
  }
}
