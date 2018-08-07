import React, { Component } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import MapLevel2 from '../components/mapLevel2'
import CircleSquare from '../components/CircleSquare'
const { width, height } = Dimensions.get('window')

export default class Level2 extends Component {
  state = {
    isMove: true,
    x: 0,
    y: 0,
    marginLeft: 0,
    marginTop: 0,
    top: 0,
    left: 0,
    locationBoxX: 0,
    locationBoxY: 0,
    locationCircleX: 0,
    locationCircleY: 0,
    radian: 0
  }
  radianChange = radian => {
    this.setState({ radian })
  }
  onPress = e => {
    const { locationX, locationY } = e.nativeEvent
    if (locationX >= 0 && locationX <= 180 && locationY >= 0 && locationY <= 180) {
      this.setState({
        x: locationX,
        y: locationY,
        isMove: true
      })
    }
  }
  onMove = e => {
    const { locationX, locationY } = e.nativeEvent
    const { x, y, top, left } = this.state
    if (locationX >= 0 && locationX <= 180 && locationY >= 0 && locationY <= 180) {
      const marginLeft = locationX - x + left
      const marginTop = locationY - y + top
      if (marginLeft >= -160 && marginLeft <= 95) {
        this.setState({ marginLeft })
        this.refs.blueBox.setNativeProps({ marginLeft: marginLeft })
      }
      if (marginTop >= -20 && marginTop <= 235) {
        this.setState({ marginTop })
        this.refs.blueBox.setNativeProps({ marginTop: marginTop })
      }
    }
  }
  onRelease = e => {
    this.setState({
      top: this.state.marginTop,
      left: this.state.marginLeft
    })
  }

  onCirclesMove = (circleX, circleY) => {
    const { locationBoxX, locationBoxY, locationCircleX, locationCircleY, marginTop, marginLeft } = this.state
    this.setState({ locationCircleX: circleX, locationCircleY: circleY }, () => {
      for (let i = 0; i < 9; i++) {
        const locationCircleXx = locationCircleX + i * 20
        const locationCircleYy = locationCircleX / Math.tan(this.state.radian)
        if ((locationBoxX >= locationCircleXx - 20 && locationBoxX <= locationCircleXx + 20) &&
          (locationBoxY >= locationCircleYy - 20 && locationBoxY <= locationCircleYy + 20)) {
          this.setState({
            marginLeft: -1600,
            marginTop: -2000,
            top: 0,
            left: 0,
            x: locationBoxX,
            y: locationBoxY,
          })
          this.refs.blueBox.setNativeProps({ marginLeft: 0 })
          this.refs.blueBox.setNativeProps({ marginTop: 0 })
        }
      }

    })
  }

  shouldComponentUpdate() {
    return false
  }

  renderCircle = () => {
    let circles = []
    for (let i = 0; i < 2; i++) {
      circles.push(i)
    }
    return circles.map((item, index) => <CircleSquare
      key={item}
      index={index}
      scircleSquare={styles.scircleSquare}
      onCircleMove={(circleX, circleY) => this.onCirclesMove(circleX, circleY)}
      radianChange={radian => this.radianChange(radian)}
    />)
  }

  onBoxMove = e => {
    const { x, y } = e.nativeEvent.layout
    console.log(x, y)
    this.setState({
      locationBoxY: y,
      locationBoxX: x
    })
  }

  render() {
    return (
      <View style={styles.root}>
        <MapLevel2 style={styles.map2Style}
          onCircleMove={(circleX, circleY) => this.onCirclesMove(circleX, circleY)}
        />
        <View style={[styles.goal, { top: height / 2 - 60 - 105, left: width / 2 - 30 }]} />
        <View style={[styles.goal, { top: height / 2 - 30, left: width / 2 - 105 - 60 }]} />
        <View
          onLayout={this.onBoxMove}
          style={styles.blueBox}
          ref='blueBox' />
        {this.renderCircle()}
        <View
          style={styles.touchContainer}
          onStartShouldSetResponder={e => true}
          onMoveShouldSetResponder={this.state.isMove}
          onResponderGrant={this.onPress}
          onResponderMove={this.onMove}
          onResponderRelease={this.onRelease} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  scircleSquare: {
    position: 'absolute',
    top: height / 2 - 100,
    left: width / 2 - 10
  },
  goal: {
    width: 60,
    height: 60,
    backgroundColor: 'cyan',
    position: 'absolute',
    zIndex: 1
  },
  touchContainer: {
    backgroundColor: 'green',
    left: width / 2 - 100,
    position: 'absolute',
    width: 180,
    height: 180,
    top: height - 205,
    left: width - 180,
    borderRadius: 100,
    zIndex: 2
  },
  blueBox: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    position: 'absolute',
    zIndex: 2,
    top: height / 2 - 40 - 105,
    left: width / 2 - 30 + 20
  },
  root: {
    position: 'relative',
    flex: 1
  },
  map2Style: {
    position: 'absolute',
    top: height / 2 - 105,
    left: width / 2 - 105
  }
})
