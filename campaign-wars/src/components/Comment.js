import React from 'react';
import styled from 'styled-components';

import { Media } from 'reactstrap';

const Avatar = styled(Media)`
  padding-right: 20px;
`;

const CommentContainer = styled(Media)`
  padding: 20px 10px 10px 10px;
`;

const Comment = ({ userName, comment }) => (
  <CommentContainer>
    <Media left>
      <Avatar object src="https://placehold.it/64x64" alt="Comment" />
    </Media>
    <Media body>
      <Media heading>
        {userName}
      </Media>
      <p className="text-justify">
        {comment}
      </p>
    </Media>
  </CommentContainer>
);

export default Comment;
