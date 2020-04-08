import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadCharactersAction } from '../actions/characterActions';
import { upVoteAction, downVoteAction } from '../actions/voteActions';

import CharacterSearchPage from '../components/CharacterSearchPage';

class CharacterSearchContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      currentlyDisplayed: this.props.characters
    };

    this.onInputChange = this.onInputChange.bind(this);
  }

  componentDidMount() {
    this.props.loadCharacters();
  }

  componentWillReceiveProps(nextProps) {
    if (Object.keys(nextProps.characters).length) {
      this.setState({
        currentlyDisplayed: nextProps.characters
      });
    }
  }

  onInputChange(event) {
    const { characters } = this.props;

    const filtered = Object.keys(characters).filter(id => {
      return characters[id].name.toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    const newlyDisplayed = { ...filtered.map(id => characters[id]) };

    this.setState({
      searchTerm: event.target.value,
      currentlyDisplayed: newlyDisplayed
    });
  }

  render() {
    const { currentlyDisplayed } = this.state;
    const { votes, upVoteCharacter, downVoteCharacter } = this.props;

    return (
      <div>
        <CharacterSearchPage characters={currentlyDisplayed} votes={votes} onInputChange={this.onInputChange}
          handleUpVote={upVoteCharacter} handleDownVote={downVoteCharacter} />
      </div>
    );
  }
}

const mapStateToProps = ({ characters, votes }) => ({
  characters: characters.characters,
  votes: votes.votes
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    loadCharacters: loadCharactersAction,
    upVoteCharacter: upVoteAction,
    downVoteCharacter: downVoteAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CharacterSearchContainer);
