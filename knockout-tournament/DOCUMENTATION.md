<a name="TournamentController"></a>

## TournamentController
Tournament controller that coordinates with the tournament API to simulate a tournament.

**Kind**: global class

* [TournamentController](#TournamentController)
    * [new TournamentController(tournamentModel)](#new_TournamentController_new)
    * [.runSimulation()](#TournamentController+runSimulation) ⇒ <code>void</code>
    * [._getWinner()](#TournamentController+_getWinner) ⇒ <code>Object</code>
    * [._getRoundWinners(matchScores)](#TournamentController+_getRoundWinners) ⇒ <code>Array.&lt;number&gt;</code>
    * [._setTeamScores(teams)](#TournamentController+_setTeamScores) ⇒ <code>void</code>
    * [._setMatchScores(round)](#TournamentController+_setMatchScores) ⇒ <code>void</code>

<a name="new_TournamentController_new"></a>

### new TournamentController(tournamentModel)
Creates an instance of TournamentController.


| Param | Type | Description |
| --- | --- | --- |
| tournamentModel | <code>Object</code> | The TournamentModel to attach. |

<a name="TournamentController+runSimulation"></a>

### tournamentController.runSimulation() ⇒ <code>void</code>
Main method to begin the tournament simulation.

**Kind**: instance method of <code>[TournamentController](#TournamentController)</code>
<a name="TournamentController+_getWinner"></a>

### tournamentController._getWinner() ⇒ <code>Object</code>
Simulates the 'rest' of the tournament matches after the first round.

**Kind**: instance method of <code>[TournamentController](#TournamentController)</code>
**Returns**: <code>Object</code> - Winner of the tournament
**Example** *(Example winner object.)*
```js
{
 teamId: 1,
 name: 'Malicious Tall Jan',
 score: 69
}
```
<a name="TournamentController+_getRoundWinners"></a>

### tournamentController._getRoundWinners(matchScores) ⇒ <code>Array.&lt;number&gt;</code>
Gets the winning team ID given the match scores for a given round.

Requests for each match of the round are first aggregated as promises
and then asynchronously retrieved to save a sever round-trip.

**Kind**: instance method of <code>[TournamentController](#TournamentController)</code>
**Returns**: <code>Array.&lt;number&gt;</code> - The winning team ID

| Param | Type | Description |
| --- | --- | --- |
| matchScores | <code>Array.&lt;Object&gt;</code> | The match score as well as the team scores for this round (see example below) |

**Example** *(Example match scores object.)*
```js
[ // Array indexed by match number
 { round: 0, match: 0, matchScore: 49, teamScores: {0: 83, 1: 99} }, // teamScores indexed by team ID
 { round: 0, match: 1, matchScore: 68, teamScores: {2: 68, 3: 18} }
]
```
<a name="TournamentController+_setTeamScores"></a>

### tournamentController._setTeamScores(teams) ⇒ <code>void</code>
Gets the team scores from the server and sets them in the tournament model.

Requests for each team score are first aggregated as promises
and then asynchronously retrieved to save a sever round-trip.

**Kind**: instance method of <code>[TournamentController](#TournamentController)</code>

| Param | Type | Description |
| --- | --- | --- |
| teams | <code>Array.&lt;number&gt;</code> | Array of team IDs. |

<a name="TournamentController+_setMatchScores"></a>

### tournamentController._setMatchScores(round) ⇒ <code>void</code>
Gets the match scores for a round from the server and sets them in the tournament model.

Requests for each match score are first aggregated as promises
and then asynchronously retrieved to save a sever round-trip.

**Kind**: instance method of <code>[TournamentController](#TournamentController)</code>

| Param | Type | Description |
| --- | --- | --- |
| round | <code>number</code> | The round number. |


<a name="TournamentModel"></a>

## TournamentModel ⇐ <code>Model</code>
Tournament model representing the state of the tournament.

**Kind**: global class
**Extends**: <code>Model</code>

* [TournamentModel](#TournamentModel) ⇐ <code>Model</code>
    * [new TournamentModel(numberOfTeams, teamsPerMatch, numberOfRounds)](#new_TournamentModel_new)
    * [._numberOfMatches()](#TournamentModel+_numberOfMatches) ⇒ <code>number</code>
    * [.getNumberOfMatches()](#TournamentModel+getNumberOfMatches) ⇒ <code>number</code>
    * [.setTeam(team)](#TournamentModel+setTeam) ⇒ <code>void</code>
    * [.setMatchScore(round, match, score)](#TournamentModel+setMatchScore) ⇒ <code>void</code>
    * [.setRoundMatchUps(round, teams)](#TournamentModel+setRoundMatchUps) ⇒ <code>void</code>
    * [.getRoundScores(round)](#TournamentModel+getRoundScores) ⇒ <code>Array.&lt;Object&gt;</code>
    * [._initRoundMatchUps()](#TournamentModel+_initRoundMatchUps) ⇒ <code>Array.&lt;Object&gt;</code>
    * [.getNumberOfTeams()](#TournamentModel+getNumberOfTeams) ⇒ <code>number</code>
    * [.getTeamsPerMatch()](#TournamentModel+getTeamsPerMatch) ⇒ <code>number</code>
    * [.getNumberOfRounds()](#TournamentModel+getNumberOfRounds) ⇒ <code>number</code>
    * [.setTournamentId(tournamentId)](#TournamentModel+setTournamentId) ⇒ <code>void</code>
    * [.getTournamentId()](#TournamentModel+getTournamentId) ⇒ <code>number</code> \| <code>void</code>
    * [.setWinner(winner)](#TournamentModel+setWinner) ⇒ <code>void</code>
    * [.getTeam(teamId)](#TournamentModel+getTeam) ⇒ <code>Object</code>
    * [.getRound(round)](#TournamentModel+getRound) ⇒ <code>Array.&lt;Object&gt;</code>

<a name="new_TournamentModel_new"></a>

### new TournamentModel(numberOfTeams, teamsPerMatch, numberOfRounds)
Creates an instance of TournamentModel.


| Param | Type | Description |
| --- | --- | --- |
| numberOfTeams | <code>number</code> | Number of teams playing in the tournament. |
| teamsPerMatch | <code>number</code> | Number of teams that play per match. |
| numberOfRounds | <code>any</code> | Number of rounds that will be played. |

<a name="TournamentModel+_numberOfMatches"></a>

### tournamentModel._numberOfMatches() ⇒ <code>number</code>
Calculates the number of matches that will be played based on the
number of teams and teams per match.

Simply keeps on dividing the number of teams by the teams per match
until the last round.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>number</code> - Number of matches that will be played.
<a name="TournamentModel+getNumberOfMatches"></a>

### tournamentModel.getNumberOfMatches() ⇒ <code>number</code>
Getter for the number of matches that will be played.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>number</code> - Number of matches that will be played.
<a name="TournamentModel+setTeam"></a>

### tournamentModel.setTeam(team) ⇒ <code>void</code>
Stores a team with their ID, name, and score, indexed by their team ID.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>

| Param | Type | Description |
| --- | --- | --- |
| team | <code>Object</code> | Team to store |

**Example** *(Example team object.)*
```js
{
 teamId: 1,
 name: 'Malicious Tall Jan',
 score: 69
}
```
<a name="TournamentModel+setMatchScore"></a>

### tournamentModel.setMatchScore(round, match, score) ⇒ <code>void</code>
Sets the match score for a given round/match and publishes an
event that a match was completed, passing the scored matchup
to any listeners.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>

| Param | Type | Description |
| --- | --- | --- |
| round | <code>number</code> | The round number. |
| match | <code>number</code> | The match number. |
| score | <code>number</code> | The score of the round/match. |

**Example** *(Round object before/after setting the score.)*
```js
// Before
{
 teamIds: [1, 2]
}
// After
{
 teamIds: [1, 2],
 score: 69
}
```
<a name="TournamentModel+setRoundMatchUps"></a>

### tournamentModel.setRoundMatchUps(round, teams) ⇒ <code>void</code>
Sets the matchups for a particular round.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>

| Param | Type | Description |
| --- | --- | --- |
| round | <code>number</code> | The round number. |
| teams | <code>Array.&lt;number&gt;</code> | List of team IDs. |

<a name="TournamentModel+getRoundScores"></a>

### tournamentModel.getRoundScores(round) ⇒ <code>Array.&lt;Object&gt;</code>
Gets the team scores and match score for a paticular round.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>Array.&lt;Object&gt;</code> - List of round scores including the round and match number for reference.

| Param | Type | Description |
| --- | --- | --- |
| round | <code>number</code> | The round number. |

**Example** *(Example round score object that will be returned.)*
```js
{
 round: 1,
 match: 1,
 matchScore: 69,
 teamScores: {
   0: 19, // key is the teamId
   1: 42
 }
}
```
<a name="TournamentModel+_initRoundMatchUps"></a>

### tournamentModel._initRoundMatchUps() ⇒ <code>Array.&lt;Object&gt;</code>
Initializes tournament matches for each round with empty placeholdlers.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>Array.&lt;Object&gt;</code> - List of empty match objects indexed by round.
<a name="TournamentModel+getNumberOfTeams"></a>

### tournamentModel.getNumberOfTeams() ⇒ <code>number</code>
Getter for the number of teams.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>number</code> - The number of teams.
<a name="TournamentModel+getTeamsPerMatch"></a>

### tournamentModel.getTeamsPerMatch() ⇒ <code>number</code>
Getter for the teams per match.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>number</code> - The number of teams per match.
<a name="TournamentModel+getNumberOfRounds"></a>

### tournamentModel.getNumberOfRounds() ⇒ <code>number</code>
Getter for the number of rounds.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>number</code> - The number of rounds.
<a name="TournamentModel+setTournamentId"></a>

### tournamentModel.setTournamentId(tournamentId) ⇒ <code>void</code>
Setter to set the tournament ID.

Publishes a NEW_TOURNAMENT event to all listeners.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>

| Param | Type | Description |
| --- | --- | --- |
| tournamentId | <code>number</code> | Tournament ID as returned by the server. |

<a name="TournamentModel+getTournamentId"></a>

### tournamentModel.getTournamentId() ⇒ <code>number</code> \| <code>void</code>
Getter for the tournament ID.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>number</code> - The current tournament ID.<code>void</code>
<a name="TournamentModel+setWinner"></a>

### tournamentModel.setWinner(winner) ⇒ <code>void</code>
Sets the final winner of the tournament.

Publishes a TOURNAMENT_COMPLETED event to all listeners.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>

| Param | Type | Description |
| --- | --- | --- |
| winner | <code>Object</code> | The winning team. |

<a name="TournamentModel+getTeam"></a>

### tournamentModel.getTeam(teamId) ⇒ <code>Object</code>
Getter for getting a team by ID.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>Object</code> - team

| Param | Type | Description |
| --- | --- | --- |
| teamId | <code>number</code> | The team ID. |

**Example** *(Example team object.)*
```js
{
 teamId: 1,
 name: 'Malicious Tall Jan',
 score: 69
};
```
<a name="TournamentModel+getRound"></a>

### tournamentModel.getRound(round) ⇒ <code>Array.&lt;Object&gt;</code>
Getter for getting a round by the round number.

**Kind**: instance method of <code>[TournamentModel](#TournamentModel)</code>
**Returns**: <code>Array.&lt;Object&gt;</code> - Round matches (a list of teamIds)

| Param | Type | Description |
| --- | --- | --- |
| round | <code>number</code> | The round number. |

**Example** *(Example round object.)*
```js
{
 [
   { teamIds: [1, 2] },
   { teamIds: [3, 4] }
 ]
}
```

<a name="TournamentView"></a>

## TournamentView ⇐ <code>View</code>
Tournament view that creates manipulates and manipulates DOM on tournament events.

**Kind**: global class
**Extends**: <code>View</code>

* [TournamentView](#TournamentView) ⇐ <code>View</code>
    * [new TournamentView(model)](#new_TournamentView_new)
    * _instance_
        * [.notify(notifier, event, [...args])](#TournamentView+notify) ⇒ <code>void</code>
        * [._log(message)](#TournamentView+_log) ⇒ <code>void</code>
        * [._completeMatch()](#TournamentView+_completeMatch) ⇒ <code>void</code>
        * [._initMatches(numberOfMatches)](#TournamentView+_initMatches) ⇒ <code>void</code>
        * [._setWinner(winner)](#TournamentView+_setWinner) ⇒ <code>void</code>
        * [._clearWinner()](#TournamentView+_clearWinner) ⇒ <code>void</code>
        * [._clearMatches()](#TournamentView+_clearMatches) ⇒ <code>void</code>
        * [._clearLog()](#TournamentView+_clearLog) ⇒ <code>void</code>
        * [._showSpinner()](#TournamentView+_showSpinner) ⇒ <code>void</code>
        * [._hideSpinner()](#TournamentView+_hideSpinner) ⇒ <code>void</code>
    * _static_
        * [.clearAll()](#TournamentView.clearAll) ⇒ <code>void</code>

<a name="new_TournamentView_new"></a>

### new TournamentView(model)
Creates an instance of TournamentView and clears and prepares the current DOM.


| Param | Type | Description |
| --- | --- | --- |
| model | <code>Object</code> | The [TournamentModel](TournamentModel) to attach. |

<a name="TournamentView+notify"></a>

### tournamentView.notify(notifier, event, [...args]) ⇒ <code>void</code>
Event handler for responding to events fired from the [TournamentModel](TournamentModel).

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>

| Param | Type | Description |
| --- | --- | --- |
| notifier | <code>Object</code> | Notifying class that calls this method. |
| event | <code>string</code> | Event name (defined in TOURNAMENT constants). |
| [...args] | <code>Array.&lt;any&gt;</code> | Additional parameters passed from the notifier. |

<a name="TournamentView+_log"></a>

### tournamentView._log(message) ⇒ <code>void</code>
Writes a message to the #log DOM element.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Message to log. |

<a name="TournamentView+_completeMatch"></a>

### tournamentView._completeMatch() ⇒ <code>void</code>
Replaces a pending match symbol with a completed match symbol.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>
<a name="TournamentView+_initMatches"></a>

### tournamentView._initMatches(numberOfMatches) ⇒ <code>void</code>
Creates an array of pending match symbols and appends it to the DOM.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>

| Param | Type | Description |
| --- | --- | --- |
| numberOfMatches | <code>number</code> | The number of matches. |

<a name="TournamentView+_setWinner"></a>

### tournamentView._setWinner(winner) ⇒ <code>void</code>
Sets the winner of the tournament in the DOM.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>

| Param | Type | Description |
| --- | --- | --- |
| winner | <code>string</code> | Name of the winner. |

<a name="TournamentView+_clearWinner"></a>

### tournamentView._clearWinner() ⇒ <code>void</code>
Clears the winner name and hides surrounding decoration.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>
<a name="TournamentView+_clearMatches"></a>

### tournamentView._clearMatches() ⇒ <code>void</code>
Clears the match symbols from the DOM.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>
<a name="TournamentView+_clearLog"></a>

### tournamentView._clearLog() ⇒ <code>void</code>
Clears the log messages from the DOM.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>
<a name="TournamentView+_showSpinner"></a>

### tournamentView._showSpinner() ⇒ <code>void</code>
Unhides the loading spinner.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>
<a name="TournamentView+_hideSpinner"></a>

### tournamentView._hideSpinner() ⇒ <code>void</code>
Hides the loading spinner.

**Kind**: instance method of <code>[TournamentView](#TournamentView)</code>
<a name="TournamentView.clearAll"></a>

### TournamentView.clearAll() ⇒ <code>void</code>
Clears all the DOM elements that might have been set in a prior run.

Note: kind of fuckin' hacky considering the this._clear*(...) methods
but ¯\_(ツ)_/¯ since it has to be called from outside the instance.

**Kind**: static method of <code>[TournamentView](#TournamentView)</code>

<a name="HTTPRequest"></a>

## HTTPRequest
**Kind**: global class

* [HTTPRequest](#HTTPRequest)
    * [new HTTPRequest()](#new_HTTPRequest_new)
    * [.get(url, [parameters])](#HTTPRequest.get) ⇒ <code>Object</code>
    * [.post(url, [data])](#HTTPRequest.post) ⇒ <code>Object</code>
    * [._queryString(parameters)](#HTTPRequest._queryString) ⇒ <code>string</code>

<a name="new_HTTPRequest_new"></a>

### new HTTPRequest()
Wrapper for the web API [fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) method.

<a name="HTTPRequest.get"></a>

### HTTPRequest.get(url, [parameters]) ⇒ <code>Object</code>
Performs a GET request.

**Kind**: static method of <code>[HTTPRequest](#HTTPRequest)</code>
**Returns**: <code>Object</code> - JSON object of the response.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | URL to perform request on. |
| [parameters] | <code>any</code> | <code>{}</code> | Query parameters. |

<a name="HTTPRequest.post"></a>

### HTTPRequest.post(url, [data]) ⇒ <code>Object</code>
Performs a POST request.

**Kind**: static method of <code>[HTTPRequest](#HTTPRequest)</code>
**Returns**: <code>Object</code> - JSON object of the response.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>string</code> |  | URL to perform request on. |
| [data] | <code>any</code> | <code>{}</code> | Request body data. |

<a name="HTTPRequest._queryString"></a>

### HTTPRequest._queryString(parameters) ⇒ <code>string</code>
Coverts an array of parameters to a query string.

**Kind**: static method of <code>[HTTPRequest](#HTTPRequest)</code>
**Returns**: <code>string</code> - Converted parameters as a query string.

| Param | Type | Description |
| --- | --- | --- |
| parameters | <code>Object</code> | Parameters to convert. |

**Example**
```js
{ tournamentId: 1, teamIds: [1, 2], matchScore: 69 }
 => 'tournamentId=1&teamIds=1&teamIds=1&matchScore=69'
```


<a name="Model"></a>

## Model
Base model class.

**Kind**: global class

* [Model](#Model)
    * [new Model()](#new_Model_new)
    * [.publish(event, [...args])](#Model+publish) ⇒ <code>void</code>
    * [.get(property)](#Model+get) ⇒ <code>any</code>
    * [.set(property, value)](#Model+set) ⇒ <code>any</code>
    * [.addListener(listener)](#Model+addListener) ⇒ <code>void</code>
    * [.deleteListener(listener)](#Model+deleteListener) ⇒ <code>void</code>
    * [.notifyAll(message, [...args])](#Model+notifyAll) ⇒ <code>void</code>

<a name="new_Model_new"></a>

### new Model()
Creates and instance of Model with an empty Set of listeners.

<a name="Model+publish"></a>

### model.publish(event, [...args]) ⇒ <code>void</code>
Publishes an event to all listeners.

**Kind**: instance method of <code>[Model](#Model)</code>

| Param | Type | Description |
| --- | --- | --- |
| event | <code>string</code> | Event to publish. |
| [...args] | <code>Array.&lt;any&gt;</code> | Additional parameters to pass to listeners. |

**Example**
```js
tournament.model.publish('MATCH_COMPLETED', matchUp)
```
<a name="Model+get"></a>

### model.get(property) ⇒ <code>any</code>
Getter method for model properties.

**Kind**: instance method of <code>[Model](#Model)</code>
**Returns**: <code>any</code> - Property stored by @see {set}.

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | Property to get. |

<a name="Model+set"></a>

### model.set(property, value) ⇒ <code>any</code>
Setter method for model properties.

**Kind**: instance method of <code>[Model](#Model)</code>
**Returns**: <code>any</code> - Value that was set.

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | Property name to set. |
| value | <code>any</code> | Value associated to property. |

<a name="Model+addListener"></a>

### model.addListener(listener) ⇒ <code>void</code>
Adds a listener to the set of listeners.

**Kind**: instance method of <code>[Model](#Model)</code>

| Param | Type | Description |
| --- | --- | --- |
| listener | <code>Object</code> | The listening class. |

<a name="Model+deleteListener"></a>

### model.deleteListener(listener) ⇒ <code>void</code>
Deletes a listener from the set of listeners.

**Kind**: instance method of <code>[Model](#Model)</code>

| Param | Type | Description |
| --- | --- | --- |
| listener | <code>Object</code> | The listening class. |

<a name="Model+notifyAll"></a>

### model.notifyAll(message, [...args]) ⇒ <code>void</code>
Notifies all listeners in the set of listeners.

**Kind**: instance method of <code>[Model](#Model)</code>

| Param | Type | Description |
| --- | --- | --- |
| message | <code>string</code> | Message to send. |
| [...args] | <code>any</code> | Additional parameters to pass to listeners. |


<a name="View"></a>

## View
Base view class.

**Kind**: global class
<a name="new_View_new"></a>

### new View(model)
Creates an instance of View with an attached Model.


| Param | Type | Description |
| --- | --- | --- |
| model | <code>Object</code> | The [Model](Model) to attach. |

