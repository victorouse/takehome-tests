import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import Header from '../common/Header';
import SearchFilter from '../components/SearchFilter';
import CharacterGrid from '../components/CharacterGrid';

const CharacterSearchPage = ({ characters, votes, onInputChange, handleUpVote, handleDownVote }) => (
  <div>
    <Header title="Campaign Wars"/>
    <Container>
      <Row className="justify-content-center">
        <Col xs={12}>
          <SearchFilter onInputChange={onInputChange} />
        </Col>
      </Row>
      <Row>
        <CharacterGrid characters={characters} votes={votes}
          handleUpVote={handleUpVote} handleDownVote={handleDownVote} />
      </Row>
    </Container>
  </div>
);

export default CharacterSearchPage;
