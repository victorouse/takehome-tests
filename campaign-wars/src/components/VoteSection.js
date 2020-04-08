import React from 'react';

import Vote from './Vote';

const VoteSection = ({ characterId, upVoted, downVoted, handleUpVote, handleDownVote }) => (
  <div>
    <Vote characterId={characterId} voted={upVoted} handleVote={handleUpVote} name="thumbs-up" />
    <Vote characterId={characterId} voted={downVoted} handleVote={handleDownVote} name="thumbs-down" />
  </div>
);

export default VoteSection;
