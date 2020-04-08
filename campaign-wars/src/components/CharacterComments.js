import React from 'react';
import styled from 'styled-components';

import {
  ListGroup,
  ListGroupItem
} from 'reactstrap';

const EmptyState = styled.p`
  width: 100%;
  padding-top: 20px;
  text-align: center;
  color: lightgrey;
`;

import Comment from './Comment';

const CharacterComments = ({ comments }) => (
  <ListGroup>
    {comments ? comments.map((comment) => (
      <ListGroupItem key={comment.id}>
        <Comment key={comment.id} userName="Anonymous" comment={comment.text} />
      </ListGroupItem>
      )) : <EmptyState>There are currently no comments.</EmptyState>
    }
  </ListGroup>
);

export default CharacterComments;
