import React, { Component } from 'react'
import { View, Animated, Easing } from 'react-native';

export default class OneCircle extends Component {
  state = {
    spin: new Animated.Value(0)
  }
  componentDidMount() {
    this.spin()
  }
  spin = () => {
    this.state.spin.setValue(0)
    const nim1 = Animated.timing(this.state.spin, {
      duration: 1000,
      toValue: 1,
      easing: Easing.linear
    })
    this.state.spin.addListener(e => {
      this.refs.myCircle.setNativeProps({
        marginLeft: 100 * Math.sin(e.value * 2 * Math.PI),
        marginTop: 100 * Math.cos(e.value * 2 * Math.PI)
      })
    })
    Animated.sequence([nim1]).start(() => this.spin())
  }
  render() {

    return (
        <Animated.View ref='myCircle'
          style={{
            backgroundColor: 'green',
            position: 'absolute',
            ...this.props.styleRoot
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'blue',
              ...this.props.styleCircle
            }}
          />
        </Animated.View>
    )
  }
}
