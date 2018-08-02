import React, { Component } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window')
console.log(width/2,height/2)

import Map2 from '../components/map2'

class Level2 extends Component {
  state = {
    x: 0,
    y: 0,
    marginTop: 0,
    marginLeft: 0,
    top: 0,
    left: 0
  }
  renderSquare = () => {
    let squares = []
    for (let i = 0; i < 25; i++) {
      squares.push(i)
    }
    return squares.map((square, index) => <View
      key={index}
      style={[styles.square, {
        backgroundColor: index % 2 === 0 ? 'gray' : 'white'
      }]}
    />)
  }
  onPress = e => {
    const { locationX, locationY } = e.nativeEvent
    if (locationX >= 0 && locationX <= 180 && locationY >= 0 && locationY <= 180) {
      this.setState({
        x: locationX,
        y: locationY
      })
    }
  }
  onMove = e => {
    const { x, y, top, left } = this.state
    const { locationX, locationY } = e.nativeEvent
    if (locationX >= 0 && locationX <= 180 && locationY >= 0 && locationY <= 180) {
      let marginLeft = locationX - x + left
      let marginTop = locationY - y + top
      this.setState({ marginTop, marginLeft })
    }

  }
  onRelease = e => {
    const { marginLeft, marginTop } = this.state
    this.setState({
      top: marginTop,
      left: marginLeft
    })
  }
  render() {
    const { marginLeft, marginTop } = this.state
    return (
      <View style={styles.root}>
        <View style={[styles.box, { marginTop, marginLeft }]} />
        <View style={styles.goal} >
        </View>
        <View style={styles.container}>
          {this.renderSquare()}
          <View style={{ position: 'absolute' }} ><Map2 /></View>
        </View>
        <View style={styles.goal} ></View>
        <View
          style={styles.touchContainer}
          onStartShouldSetResponder={e => true}
          onMoveShouldSetResponder={e => true}
          onResponderGrant={this.onPress}
          onResponderMove={this.onMove}
          onResponderRelease={this.onRelease} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  touchContainer: {
    backgroundColor: 'green',
    left: width / 2 - 100,
    position: 'absolute',
    width: 180,
    height: 180,
    top: height - 205,
    left: width - 180,
    borderRadius: 100
  },
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'violet',
  },
  container: {
    backgroundColor: 'green',
    width: 150,
    height: 150,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 1
  },
  square: {
    width: 30,
    height: 30
  },
  goal: {
    width: 40,
    height: 40,
    backgroundColor: 'cyan',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    position: 'absolute',
    height: 20,
    width: 20,
    backgroundColor: 'blue',
    top: height / 2 - 115,
    left: width / 2 - 10,
    zIndex: 2
  }
})

export default Level2
