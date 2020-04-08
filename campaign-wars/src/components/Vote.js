import React from 'react';
import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

import colors from '../styles/colors';

const Vote = styled(({ voted, characterId, handleVote, ...props }) =>
  <FontAwesome onClick={handleVote.bind(this, { characterId })} {...props} />
)`
  color: ${props => !props.voted ? `${colors.noVoteColor}` :
    (props.voted && props.name === 'thumbs-up') ? `${colors.upVoteColor}` :
    (props.voted && props.name === 'thumbs-down') ? `${colors.downVoteColor}` : ''
  };
  cursor: pointer;
  padding: 5px;
`;

export default Vote;
