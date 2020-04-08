import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import {
  Card,
  CardImg,
  CardHeader,
  CardFooter,
  ListGroup,
  ListGroupItem
} from 'reactstrap';

import LoadingSpinner from '../common/LoadingSpinner';
import VoteSection from './VoteSection';
import CharacterPopularity from './CharacterPopularity';

const CharacterCardContainer = styled(Card)`
  margin-bottom: 30px;
`;

const CharacterHeader = styled(CardHeader)`
  color: black;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const CharacterLink = styled(Link)`
  &:hover {
    text-decoration: none;
  }
`;

const CharacterImgFaded = styled(CardImg)`
  opacity: 0.35;
`;

const CharacterDetail = styled(ListGroupItem)`
  color: black;
  display: flex;
  justify-content: space-between;
 `;

const CharacterCardFooter = styled(CardFooter)`
  display: flex;
  justify-content: space-between;
`;

const CharacterCard = ({ character, votes, detailed, handleUpVote, handleDownVote }) => (
  <CharacterCardContainer>
    <CharacterHeader tag="h5">
      <CharacterLink to={`/character/${character.id}`}>{character.name}</CharacterLink>
    </CharacterHeader>
    <CharacterImgFaded top src="https://placehold.it/400x200?text=Implement%2C+you+must." alt={character.name} />
    { detailed &&
    <ListGroup>
        <CharacterDetail><strong>World</strong>{character.homeworld ? character.homeworld : <LoadingSpinner />}</CharacterDetail>
        <CharacterDetail><strong>Gender</strong>{character.gender}</CharacterDetail>
        <CharacterDetail><strong>Height</strong>{character.height}</CharacterDetail>
        <CharacterDetail><strong>Mass</strong>{character.mass}</CharacterDetail>
        <CharacterDetail><strong>Eye color</strong>{character.eye_color}</CharacterDetail>
        <CharacterDetail><strong>Hair color</strong>{character.hair_color}</CharacterDetail>
    </ListGroup>
    }
    <CharacterCardFooter>
      <CharacterPopularity characterId={character.id} votes={votes} />
      <VoteSection upVoted={false} downVoted={false} characterId={character.id}
        handleUpVote={handleUpVote} handleDownVote={handleDownVote} />
    </CharacterCardFooter>
  </CharacterCardContainer>
);

export default CharacterCard;
