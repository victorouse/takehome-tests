import React from 'react'
import styled from 'styled-components'
import { Text, TouchableOpacity } from 'react-native'

const ButtonWrapper = styled(TouchableOpacity)`
  padding: 20px;
  background-color: #1890ff;
  border-radius: 5;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ButtonText = styled(Text)`
  font-weight: bold;
  color: ${({ disabled }) =>
    disabled ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.60)'};
`

const Button = ({ title, disabled, ...props }) => (
  <ButtonWrapper {...props}>
    <ButtonText disabled={disabled}>{title}</ButtonText>
  </ButtonWrapper>
)

export default Button
