describe('Requests', function() {
  it('should convert a flat object to a query string', function() {
    const qs = HTTPRequest._queryString({
      someKey: 'someValue',
      otherKey: 'otherValue'
    });

    expect(qs).to.equal('someKey=someValue&otherKey=otherValue');
  });

  it('should convert arrays to a repeated key/value pairs', function() {
    const teamScores = {
      teamScores: [1, 2, 3, 4]
    };
    const qs = HTTPRequest._queryString(teamScores);
    expect(qs).to.equal('teamScores=1&teamScores=2&teamScores=3&teamScores=4');
  });

  it('should convert flat objects and arrays', function() {
    const winnerRequest = {
      tournamentId: 0,
      matchScore: 0,
      teamScores: [1, 2, 3, 4]
    };
    const qs = HTTPRequest._queryString(winnerRequest);
    expect(qs).to.equal('tournamentId=0&matchScore=0&teamScores=1&teamScores=2&teamScores=3&teamScores=4');
  });

  it('should return nothing if parameters are empty', function() {
    const qs = HTTPRequest._queryString({});
    expect(qs).to.equal('');
  });
});
