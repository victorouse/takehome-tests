import React from 'react';

import { Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';
import styled from 'styled-components';

import logo from '../images/logo.png';

const Title = styled.h1`
  padding: 30px;
  text-transform: uppercase;
`;

const Header = ({ title }) => (
  <Container>
    <Row className="justify-content-center">
      <Link to={"/"}>
        <img src={logo} alt="" />
      </Link>
    </Row>
    <Row className="justify-content-center">
      <Title>{title}</Title>
    </Row>
  </Container>
);

export default Header;
