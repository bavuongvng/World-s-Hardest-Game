import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';

export default class Circle extends Component {
  constructor(props) {
    super(props)
    this.state = {
      marginLeft: this.props.status ? new Animated.Value(0) : new Animated.Value(160)
    }
  }

  componentDidMount() {
    this.onMove()
  }

  onMove = () => {
    const anim1 = Animated.timing(this.state.marginLeft, {
      toValue: 160,
      duration: 2000,
      easing: Easing.linear()
    })
    const anim2 = Animated.timing(this.state.marginLeft, {
      toValue: 0,
      duration: 2000,
      easing: Easing.linear()
    })

    this.props.status ? Animated.sequence([anim1, anim2]).start(() => this.onMove()) : Animated.sequence([anim2, anim1]).start(() => this.onMove())
  }

  render() {
    const { marginLeft } = this.state
    return (
      <Animated.View
        onLayout={this.props.onLayout}
        style={{
          height: 16,
          width: 16,
          backgroundColor: 'red',
          borderRadius: 8,
          marginLeft,
          ...this.props.style,
        }}
      >
      </Animated.View>
    );
  }
}
