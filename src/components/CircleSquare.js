import React, { Component } from 'react'
import { View, Animated, StyleSheet, Dimensions, Easing } from 'react-native';

const { width, height } = Dimensions.get('window')

export default class CircleSquare extends Component {
  state = {
    spin: new Animated.Value(0),
    x: 0,
    y: 0,
  }
  componentDidMount() {
    this.spin()
  }

  spin = () => {
    this.state.spin.setValue(0)
    const nim1 = Animated.timing(this.state.spin, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
    })
    this.state.spin.addListener(e => {
      this.props.radianChange(e.value * 2 * Math.PI)
      let rad = this.props.index % 2 === 0 ? e.value * 2 * Math.PI : e.value * 2 * Math.PI + Math.PI / 2
      this.setState({
        x: 100 * Math.sin(rad),
        y: Math.abs(100 * Math.cos(rad))
      }, () => {
        this.props.onCircleMove(this.state.x + 331.71, 105.71 + 100 - this.state.y)
      })
    })
    Animated.sequence([nim1]).start(() => this.spin())
  }
  renderCircle = () => {
    let circles = []
    for (let i = 0; i < 9; i++) {
      circles.push(i)
    }
    return circles.map((circle, index) =>
      <View
        key={Math.random()}
        style={[styles.circleStyle]}
      />
    )
  }

  shouldComponentUpdate() {
    return false
  }
  render() {
    const square1 = {
      transform: ([
        {
          rotate: this.state.spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ])
    }
    const square2 = {
      transform: ([
        {
          rotate: this.state.spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '450deg']
          })
        }
      ])
    }
    const square = this.props.index % 2 === 0 ? square1 : square2
    return (
      < Animated.View
        onLayout={e => console.log(e.nativeEvent.layout.x, e.nativeEvent.layout.y)}
        style={[styles.rowCircle,
        {
          ...square
          , backgroundColor: 'yellow',
          ...this.props.scircleSquare
        }]}
      >
        {this.renderCircle()}
      </Animated.View >
    )
  }
}

const styles = StyleSheet.create({
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    marginBottom: 1,
    marginTop: 1
  },
  rowCircle: {
    position: 'absolute',
    top: 5,
    left: 95
  },
})