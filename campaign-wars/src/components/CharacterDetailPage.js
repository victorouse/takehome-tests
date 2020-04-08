import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Header from '../common/Header';
import LoadingSpinnerContainer from '../common/LoadingSpinnerContainer';
import CharacterCard from '../components/CharacterCard';
import CharacterCommentsCard from '../components/CharacterCommentsCard';

const CharacterDetailPage = (
  { character, votes, handleUpVote, handleDownVote,
    comments, error, onCommentChange, onCommentSubmit }) => (
  <div>
    {character ?
      <div>
        <Header title={character.name} />
        <Container>
          <Row>
            <Col xs={12} xl={6}>
              <CharacterCard detailed character={character} votes={votes}
                handleUpVote={handleUpVote} handleDownVote={handleDownVote} />
            </Col>
            <Col xs={12} xl={6}>
              <CharacterCommentsCard characterId={character.id} comments={comments}
                onCommentChange={onCommentChange} onCommentSubmit={onCommentSubmit} />
            </Col>
          </Row>
        </Container>
      </div>
      : Object.keys(error).length ? <Header title={error} />
      : <LoadingSpinnerContainer />
    }
  </div>
);

export default CharacterDetailPage;
