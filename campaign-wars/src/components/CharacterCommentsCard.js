import React from 'react';
import styled from 'styled-components';

import {
  Card,
  CardHeader,
  CardFooter,
  Label,
  Input,
  Button
} from 'reactstrap';

import CharacterComments from './CharacterComments';

const CommentCard = styled(Card)`
  color: black;
`;
const SubmitButton = styled(Button)`
  margin: 20px 0 5px;
`;

const CommentForm = styled.form`
  padding-top: 10px;
`;

const CharacterCommentsCard = ({ characterId, comments, onCommentChange, onCommentSubmit }) => (
  <CommentCard>
    <CardHeader tag="h5" className="text-center">Comments</CardHeader>
    <CharacterComments comments={comments} />
    <CardFooter>
      <CommentForm onSubmit={onCommentSubmit}>
        <Label for="commentInput"><strong>Write a comment</strong></Label>
        <Input type="textarea" onChange={onCommentChange} name="commentInput" />
        <SubmitButton type="submit" color="primary">Submit</SubmitButton>
      </CommentForm>
    </CardFooter>
  </CommentCard>
);

export default CharacterCommentsCard;
