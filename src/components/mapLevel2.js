import React, { Component } from 'react'
import { View, Text, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')

export default class MapLevel2 extends Component {

  renderSquare = () => {
    let squares = []
    for (let i = 0; i < 49; i++) {
      squares.push(i)
    }
    return squares.map((square, index) =>
      <View
        key={Math.random()}
        style={[styles.squareStyle, {
          backgroundColor: index % 2 === 0 ? 'white' : 'gray'
        }]}
      />)
  }
  shouldComponentUpdate() {
    return false
  }
  render() {
    return (
      <View style={[styles.root, { ...this.props.style }]}>
        {this.renderSquare()}
      </View >
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 210,
  },
  squareStyle: {
    width: 30,
    height: 30,
  },
})
