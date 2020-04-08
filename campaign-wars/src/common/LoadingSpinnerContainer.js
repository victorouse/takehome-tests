import React from 'react';

import { Container, Row, Col } from 'reactstrap';

import LoadingSpinner from './LoadingSpinner';

const LoadingSpinnerContainer = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} className="d-flex align-items-center">
          <LoadingSpinner centered />
        </Col>
      </Row>
    </Container>
  );
};

export default LoadingSpinnerContainer;
