import React from 'react'
import { Animated, Easing } from 'react-native'
import LottieView from 'lottie-react-native'

const splashLoader = require('../assets/splashLoader.json')

class SplashScreen extends React.Component {
  state = {
    textY: new Animated.Value(-50),
    textOpacity: new Animated.Value(0),
  }

  componentDidMount() {
    const { textY, textOpacity } = this.state

    Animated.parallel([
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1400,
      }),
      Animated.timing(textY, {
        toValue: 15,
        easing: Easing.elastic(1),
        duration: 700,
      }),
    ]).start()
  }

  render() {
    const { textOpacity, textY } = this.state

    return (
      <React.Fragment>
        <LottieView
          source={splashLoader}
          style={{ width: 100, paddingBottom: -20 }}
          autoPlay
          loop
        />
        <Animated.Text
          style={{
            opacity: textOpacity,
            transform: [{ translateY: textY }],
            fontFamily: 'logoFont',
            fontSize: 24,
            paddingTop: 1,
          }}
        >
          Cogni
        </Animated.Text>
      </React.Fragment>
    )
  }
}

export default SplashScreen
