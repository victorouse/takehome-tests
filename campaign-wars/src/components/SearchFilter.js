import React from 'react';
import styled from 'styled-components';

import { Input, InputGroup, InputGroupAddon } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

const WhiteBorderInputGroup = styled(InputGroup)`
  .input-group-addon,
  .form-control {
    border: 1px solid white;
  }
`;

const SearchFilter = ({ onInputChange }) => (
  <WhiteBorderInputGroup size="lg">
    <InputGroupAddon>
      <FontAwesome name="search" />
    </InputGroupAddon>
    <Input onChange={onInputChange} placeholder="Search for a character (e.g. Han Solo)" />
  </WhiteBorderInputGroup>
);

export default SearchFilter;
