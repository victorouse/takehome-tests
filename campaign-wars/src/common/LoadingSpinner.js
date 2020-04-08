import React from 'react';

import FontAwesome from 'react-fontawesome';
import styled from 'styled-components';

const Spinner = styled(({ centered, ...rest }) => <FontAwesome {...rest} />)`
  margin: ${props => props.centered ? '0 auto' : '0'}
`;

const LoadingSpinner = ({ centered }) => {
  return (
    <Spinner spin centered={centered} name="spinner" />
  );
};

export default LoadingSpinner;
