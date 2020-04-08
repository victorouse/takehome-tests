import React from 'react';
import styled from 'styled-components';
import colors from '../styles/colors';

const UpVoteText = styled.span`
  color: ${colors.upVoteColor}
`;

const DownVoteText = styled.span`
  color: ${colors.downVoteColor}
`;

const VoteSeperator = styled.span`
  color: black;
`;

const CharacterPopularity = ({ characterId, votes }) => (
  <div>
    <UpVoteText>
    {
      votes.hasOwnProperty(characterId) && votes[characterId].upVotes ?
      votes[characterId].upVotes : 0
    }
    </UpVoteText>
    <VoteSeperator> / </VoteSeperator>
    <DownVoteText>
    {
      votes.hasOwnProperty(characterId) && votes[characterId].downVotes ?
      votes[characterId].downVotes : 0
    }
    </DownVoteText>
  </div>
);

export default CharacterPopularity;
