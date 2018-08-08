import React, { Component } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import Circle from '../components/circle'

const { width, height } = Dimensions.get("window")

export default class Level1 extends Component {
  static navigationOptions = navigation => {
    return {
      header: null
    }
  }
  state = {
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
    isMove: true,
    reset: false
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
      if ((marginLeft <= 15 && marginTop <= -15) || (marginLeft >= 190 && marginTop >= -40)) {
        // ko lm j ca
      } else {
        if (marginTop <= 15 && marginTop >= -70) {
          this.setState({ marginTop })
          this.refs.blueBox.setNativeProps({ marginTop: marginTop })
        }
        if (marginLeft >= -15 && marginLeft <= 230) {
          this.setState({ marginLeft })
          this.refs.blueBox.setNativeProps({ marginLeft: marginLeft })
        }
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
      onLayout={this.onCirclesMove}
      key={index}
      status={index % 2 === 0}
      style={{
        position: 'absolute',
        top: circle + height / 2 - 60,
        left: width / 2 - 90
      }}
    />)
  }
  onBoxMove = e => {
    const { marginLeft, marginTop } = this.state
    const { x, y } = e.nativeEvent.layout
    this.setState({ locationBoxX: x, locationBoxY: y })
    if (marginLeft >= 205 && marginTop <= -40) {
      return alert('You win')
    }
  }
  onCirclesMove = e => {
    const { locationBoxX, locationBoxY, locationCircleX, locationCircleY } = this.state
    const { x, y } = e.nativeEvent.layout
    this.setState({ locationCircleX: x, locationCircleY: y }, () => {
      if ((locationBoxX >= locationCircleX - 15 && locationBoxX <= locationCircleX + 15) &&
        (locationBoxY >= locationCircleY - 15 && locationBoxY <= locationCircleY + 15)) {
        this.setState({
          marginLeft: 0,
          marginTop: 0,
          top: 0,
          left: 0,
          x: locationBoxX,
          y: locationBoxY,
        })
        this.refs.blueBox.setNativeProps({ marginLeft: 0 })
        this.refs.blueBox.setNativeProps({ marginTop: 0 })

      }
    })
  }
  shouldComponentUpdate(nextProp, nextState) {
    return false
  }

  render() {
    const { marginLeft, marginTop } = this.state

    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={[styles.goal, { marginTop: 60 }]} />
          <View style={styles.containerContent}>
            {this.renderMap()}
          </View>
          <View style={[styles.goal]} />
        </View>
        <View
          ref={'blueBox'}
          onLayout={this.onBoxMove}
          style={[styles.box,
            // { marginLeft, marginTop }
          ]} />
        {this.renderCircle()}

        <View
          style={styles.touchContainer}
          onStartShouldSetResponder={e => true}
          onMoveShouldSetResponder={this.state.isMove}
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
