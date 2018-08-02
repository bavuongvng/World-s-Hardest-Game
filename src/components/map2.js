import {
  View,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import React, { Component } from 'react'

import Circles from './circles'

export default class Map2 extends Component {
  state = {
    growAnimation: new Animated.Value(0)
  }

  componentDidMount() {
    this.spin()
  }

  spin = () => {
    this.state.growAnimation.setValue(0)
    Animated.timing(this.state.growAnimation, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear
    }).start(animation => this.spin())
  }

  render() {

    const squareAnimation = {
      transform: [{
        rotate: this.state.growAnimation.interpolate({
          inputRange: [0,1],
          outputRange: ['0deg','360deg']
        })
      }]
    }

    return (
      <Animated.View style={[styles.root,{...squareAnimation}]} >
        <Circles style={{ flexDirection: 'row' }} />
        <View style={styles.container} >
          <Circles />
          <Circles />
        </View>
        <Circles style={{ flexDirection: 'row' }} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    width:144
  },
  container: {
    height: 144,
    justifyContent: 'space-between'
  }
})
