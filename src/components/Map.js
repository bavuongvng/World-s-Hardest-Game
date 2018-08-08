import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native';
export default class Map extends Component {

  renderSquares = (number) => {
    let squares = []
    for (let i = 0; i < number; i++) {
      squares.push(i)
    }
    return squares.map((square, index) => <View
      key={Math.random() + 'vng'}
      style={[styles.square, { backgroundColor: index % 2 === 0 ? 'gray' : 'white' }]}
    />)
  }
  shouldComponentUpdate() { return false }

  render() {
    return (
      <View style={[styles.root, {...this.props.style}]} >
        { this.renderSquares(49) }
      </View >
    )
  }
}

const styles = StyleSheet.create({
  root: {
    width: 210,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  square: {
    width: 30,
    height: 30
  }
})
