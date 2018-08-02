import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import Circle from '../components/circle'

const { width, height } = Dimensions.get("window")

export default class Level1 extends Component {
  state = {
    x: 100,
    y: 100,
    marginLeft: 0,
    marginTop: 0,
    top: 0,
    left: 0
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
    const { locationX, locationY } = e.nativeEvent
    const { x, y, top, left } = this.state
    if (locationX >= 0 && locationX <= 180 && locationY >= 0 && locationY <= 180) {
      const marginLeft = locationX - x + left
      const marginTop = locationY - y + top
      this.setState({ marginTop })
      if (marginLeft >= 0 && marginLeft + 20 <= width) {
        this.setState({ marginLeft })
      }
    }
  }
  onRelease = e => {
    this.setState({
      top: this.state.marginTop,
      left: this.state.marginLeft
    })
  }

  renderMap = () => {
    const map = []
    for (let i = 0; i < 45; i++) {
      map.push(i)
    }
    return map.map((item, index) => <View
      key={index}
      style={{
        width: 20,
        height: 20,
        backgroundColor: item % 2 ? "gray" : 'white',
        position: 'relative'
      }}
    >
    </View>)
  }

  renderCircle = () => {
    const circles = []
    for (let i = 0; i < 5; i++) {
      circles.push(i * 20)
    }
    return circles.map((circle, index) => <Circle
      key={index}
      status={index % 2 === 0}
      style={{
        position: 'absolute',
        top: circle,
        left: 0
      }}
    />)
  }

  render() {

    const { marginLeft, marginTop } = this.state

    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={[styles.goal, { marginTop: 60 }]} />
          <View style={styles.containerContent}>
            {this.renderMap()}
            {this.renderCircle()}
          </View>
          <View style={[styles.goal]} />
        </View>
        <View
          // onLayout={e => console.log(e.nativeEvent.layout.x,e.nativeEvent.layout.y)}
          style={[styles.box, { marginLeft, marginTop }]} />
        <View
          style={styles.touchContainer}
          onStartShouldSetResponder={e => true}
          onMoveShouldSetResponder={e => true}
          onResponderGrant={this.onPress}
          onResponderMove={this.onMove}
          onResponderRelease={this.onRelease} />
      </View>
    );
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
    backgroundColor: 'violet',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',

  },
  container: {
    flexDirection: 'row',
  },
  containerContent: {
    flexDirection: 'row',
    width: 180,
    flexWrap: 'wrap'
  },
  goal: {
    backgroundColor: "seagreen",
    width: 40,
    height: 40,
  },
  box: {
    width: 15,
    height: 15,
    backgroundColor: 'blue',
    position: 'absolute',
    top: height / 2 + 10,
    left: width / 2 - 115,
  }
})
