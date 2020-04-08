import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

import { loadCharacterAction, loadCharacterHomeworldAction } from '../actions/characterActions';
import { upVoteAction, downVoteAction } from '../actions/voteActions';
import { addCommentAction } from '../actions/commentActions';

import CharacterDetailPage from '../components/CharacterDetailPage';

class CharacterDetailContainer extends Component {
  constructor(props) {
    super(props);

    this.onCommentSubmit = this.onCommentSubmit.bind(this);
    this.onCommentChange = this.onCommentChange.bind(this);

    this.state = {
      comment: ''
    };
  }

  componentDidMount() {
    const { match: { params }, characters } = this.props;

    if (Object.keys(characters).length === 0) {
      this.props.loadCharacter(params.id);
    } else {
      if (!characters[params.id].homeworld) {
        this.props.loadCharacterHomeworld(params.id, characters[params.id].homeworld_url);
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params }, characters } = nextProps;

    if (Object.keys(characters).length) {
      if (!characters[params.id].homeworld) {
        this.props.loadCharacterHomeworld(params.id, characters[params.id].homeworld_url);
      }
    }
  }

  onCommentSubmit(event) {
    event.preventDefault();
    const { match: { params } } = this.props;

    this.props.addComment({
      characterId: params.id,
      text: this.state.comment
    });
  }

  onCommentChange(event) {
    this.setState({
      comment: event.target.value
    });
  }

  render() {
    const { match: { params }, characters, votes, comments, error, upVoteCharacter, downVoteCharacter} = this.props;
    const character = characters[params.id] ? characters[params.id] : false;
    const characterComments = comments[params.id] ? comments[params.id] : false;

    return (
      <div>
        <CharacterDetailPage character={character} votes={votes} comments={characterComments} error={error}
          handleUpVote={upVoteCharacter} handleDownVote={downVoteCharacter}
          onCommentChange={this.onCommentChange} onCommentSubmit={this.onCommentSubmit} />
      </div>
    );
  }
}

const mapStateToProps = ({ characters, votes, comments }) => ({
  characters: characters.characters,
  votes: votes.votes,
  comments: comments.comments,
  error: characters.error
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    loadCharacter: loadCharacterAction,
    loadCharacterHomeworld: loadCharacterHomeworldAction,
    upVoteCharacter: upVoteAction,
    downVoteCharacter: downVoteAction,
    addComment: addCommentAction
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(CharacterDetailContainer);
