/**
 * Tournament view that creates manipulates and manipulates DOM on tournament events.
 * @extends View
 */
class TournamentView extends View {
  /**
   * Creates an instance of TournamentView and clears and prepares the current DOM.
   *
   * @param {Object} model - The {@link TournamentModel|TournamentModel} to attach.
   * @returns {void}
   */
  constructor(model) {
    super(model); // You are fabulous
    this.currentMatch = 0;
    this.confettiCannon = new ConfettiCannon(document.querySelector('html'));

    this._clearWinner();
    this._clearMatches();
    this._log('Initializing tournament');
    this._showSpinner();
  }

  /**
   * Event handler for responding to events fired from the {@link TournamentModel|TournamentModel}.
   *
   * @param {Object} notifier - Notifying class that calls this method.
   * @param {string} event - Event name (defined in TOURNAMENT constants).
   * @param {any[]} [args] - Additional parameters passed from the notifier.
   * @returns {void}
   */
  notify(notifier, event, ...args) {
    if (notifier == this.model && event) {
      console.log(event);
      switch (event) {
        case TOURNAMENT.MATCH_COMPLETED:
          const teamIds = args[0].teamIds;
          this._log(`Playing ${teamIds[0]} vs ${teamIds[1]}`);
          this._completeMatch();
          break;

        case TOURNAMENT.NEW_TOURNAMENT:
          this._log('Tournament created');
          this._hideSpinner();
          this._initMatches(this.model.getNumberOfMatches());
          break;

        case TOURNAMENT.TOURNAMENT_COMPLETED:
          this._log('And the winner is..');
          this._setWinner(args[0].name);
          this.confettiCannon.fire();
          break;
      }
    }
  }

  /**
   * Clears all the DOM elements that might have been set in a prior run.
   *
   * Note: kind of fuckin' hacky considering the this._clear*(...) methods
   * but ¯\_(ツ)_/¯ since it has to be called from outside the instance.
   *
   * @static
   * @returns {void}
   */
  static clearAll() {
    selectors.winnerCelebrate.classList.remove('bounceInUp');
    selectors.winnerCelebrate.style.display = 'none';
    selectors.winner.innerHTML = '';
    selectors.matches.innerHTML = '';
    selectors.log.innerHTML = '';
  }

  /**
   * Writes a message to the #log DOM element.
   *
   * @param {string} message - Message to log.
   * @returns {void}
   */
  _log(message) {
    const log = selectors.log;
    const previousMessage = selectors.logMessage[selectors.logMessage.length - 1];

    if (previousMessage) {
      // Clear the last message if it exists
      log.removeChild(previousMessage);
    }

    const messageElement = document.createElement('p');
    messageElement.classList.add('log-message');
    messageElement.classList.add('animated');
    messageElement.classList.add('fadeInUp');
    messageElement.innerText = message;

    log.appendChild(messageElement);
  }

  /**
   * Replaces a pending match symbol with a completed match symbol.
   * @returns {void}
   */
  _completeMatch() {
    const matchSymbols = selectors.matches.children;
    matchSymbols[this.currentMatch].classList.remove(EMOJIS.PENDING_MATCH_SYMBOL);
    matchSymbols[this.currentMatch].classList.add(EMOJIS.COMPLETED_MATCH_SYMBOL);
    this.currentMatch++;
  }

  /**
   * Creates an array of pending match symbols and appends it to the DOM.
   *
   * @param {number} numberOfMatches - The number of matches.
   * @returns {void}
   */
  _initMatches(numberOfMatches) {
    const emptyMatch = document.createElement('i');
    emptyMatch.classList.add('emoji');
    emptyMatch.classList.add('emoji-md');
    emptyMatch.classList.add(EMOJIS.PENDING_MATCH_SYMBOL);

    selectors.matches.classList.add('animated');
    selectors.matches.classList.add('fadeIn');

    const emptyMatches = Array(numberOfMatches).fill(emptyMatch.outerHTML).join('');
    selectors.matches.innerHTML = emptyMatches;
  }

  /**
   * Sets the winner of the tournament in the DOM.
   *
   * @param {string} winner - Name of the winner.
   * @returns {void}
   */
  _setWinner(winner) {
    selectors.winnerCelebrate.classList.add('animated');
    selectors.winnerCelebrate.classList.add('bounceInUp');
    selectors.winnerCelebrate.style.display = '';
    selectors.winner.innerHTML = winner;
  }

  /**
   * Clears the winner name and hides surrounding decoration.
   * @returns {void}
   */
  _clearWinner() {
    selectors.winnerCelebrate.classList.remove('bounceInUp');
    selectors.winnerCelebrate.style.display = 'none';
    selectors.winner.innerHTML = '';
  }

  /**
   * Clears the match symbols from the DOM.
   * @returns {void}
   */
  _clearMatches() {
    selectors.matches.innerHTML = '';
  }

  /**
   * Clears the log messages from the DOM.
   * @returns {void}
   */
  _clearLog() {
    selectors.log.innerHTML = '';
  }

  /**
   * Unhides the loading spinner.
   * @returns {void}
   */
  _showSpinner() {
    selectors.spinner.style.display = '';
  }

  /**
   * Hides the loading spinner.
   * @returns {void}
   */
  _hideSpinner() {
    selectors.spinner.style.display = 'none';
  }
}
