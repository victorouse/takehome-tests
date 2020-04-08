import React from 'react';
import styled from 'styled-components';

import { Col } from 'reactstrap';

import LoadingSpinnerContainer from '../common/LoadingSpinnerContainer';
import CharacterCard from './CharacterCard';

const CharacterGridContainer = styled.div`
  padding-top: 30px;
  width: 100%;
`;

const CharacterCardCell = styled(Col)`
  display: inline-block;
`;

const CharacterGrid = ({ characters, votes, handleUpVote, handleDownVote }) => (
  <CharacterGridContainer>
    {characters && Object.keys(characters).length ?
      Object.keys(characters).map((index) => (
        <CharacterCardCell key={characters[index].id} xs={12} md={6} lg={4} xl={3}>
          <CharacterCard key={characters[index].id} character={characters[index]} votes={votes}
            handleUpVote={handleUpVote} handleDownVote={handleDownVote} />
        </CharacterCardCell>
      )) : <LoadingSpinnerContainer />
    }
  </CharacterGridContainer>
);

export default CharacterGrid;

