import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components'
import R from 'ramda'

const Button = styled(TouchableOpacity)`
  display: flex;
  flex-grow: 1;
  align-items: center;
  padding: 10px;

  background-color: white;
  border-color: #d9d9d9;

  border-bottom-left-radius: ${({ first }) => (first ? 5 : 0)};
  border-top-left-radius: ${({ first }) => (first ? 5 : 0)};

  border-bottom-right-radius: ${({ last }) => (last ? 5 : 0)};
  border-top-right-radius: ${({ last }) => (last ? 5 : 0)};

  ${({ active }) =>
    active &&
    css`
      background-color: #1890ff;
    `};
`

const ButtonText = styled(Text)`
  color: black;
  font-weight: 400;

  ${({ active }) =>
    active &&
    css`
      color: white;
    `};
`

const Wrapper = styled(View)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props)
    const { activeIndex } = props
    const defaultIndex = R.defaultTo(-1)

    this.state = {
      activeIndex: defaultIndex(activeIndex),
    }
  }

  handlePress = (index, { onPress, ...buttonProps }) => {
    const { onChange } = this.props

    this.setState({
      activeIndex: index,
    })

    if (onPress) {
      onPress(buttonProps, index)
    }

    onChange(buttonProps, index)
  }

  render() {
    const { buttons, style } = this.props
    const { activeIndex } = this.state

    return (
      <Wrapper style={style}>
        {buttons.map((button, i) => (
          <Button
            key={`btn-${i}`} // eslint-disable-line react/no-array-index-key
            onPress={() => this.handlePress(i, button)}
            active={activeIndex === i}
            first={i === 0}
            last={i === buttons.length - 1}
          >
            <ButtonText active={activeIndex === i}>{button.title}</ButtonText>
          </Button>
        ))}
      </Wrapper>
    )
  }
}

export default ButtonGroup
