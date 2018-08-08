import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const { width, height } = Dimensions.get('window')

import Map from '../components/Map'

const pi = Math.PI

export default class Level2 extends Component {
  static navigationOptions = navigation => {
    return {
      header: null
    }
  }
  state = {
    x: 0,
    y: 0,
    top: 0,
    left: 0,
    marginTop: 0,
    marginLeft: 0,
    spin: new Animated.Value(0),
    blueBoxLocationX: 0,
    blueBoxLocationY: 0,
    circleLocationX: 0,
    circleLocationY: 0,
    circleLocationx: 0,
    circleLocationy: 0,
    radian: 0,
    move: true,
    coi1x: 0,
    coi2x: 0,
    coi3x: 0,
    coi1y: 0,
    coi2y: 0,
    coi3y: 0,
    show1: true,
    show2: true,
    show3: true,
  }

  onPress = e => {
    const { locationX, locationY } = e.nativeEvent
    if (locationX >= 0 && locationX <= 160 && locationY >= 0 && locationY <= 160) {
      this.setState({ x: locationX, y: locationY, move: true })
    }
  }
  onMove = e => {
    const { locationX, locationY } = e.nativeEvent
    if (locationX >= 0 && locationX <= 160 && locationY >= 0 && locationY <= 160 && this.state.move) {
      const { top, left, x, y, } = this.state
      const marginLeft = locationX - x + left
      const marginTop = locationY - y + top
      if (marginLeft >= -155 && marginLeft <= 95 && marginTop >= -20 && marginTop <= 230) {
        if (
          (marginLeft <= -20 && marginTop <= 20) ||
          (marginLeft >= 20 && marginTop <= 40) ||
          (marginLeft <= -95 && marginTop <= 115) ||
          (marginLeft <= -95 && marginTop >= 155)
        ) {

        } else {
          this.setState({ marginTop, marginLeft })
          this.refs.blueBox.setNativeProps({ marginLeft, marginTop })
        }
      }
    }
  }
  onRelease = e => {
    const { marginTop, marginLeft } = this.state
    this.setState({ top: marginTop, left: marginLeft })
  }

  componentDidMount() { this.spin() }
  check = rad => {
    const mang = [44, 66, 88, 90]
    mang.map(item => {
      const circleLocationX = width / 2 + item * Math.sin(rad)
      const circleLocationY = height / 2 + item * Math.cos(rad)
      const circleLocationx = width / 2 - item * Math.sin(rad)
      const circleLocationy = height / 2 - item * Math.cos(rad)
      if (
        (this.state.blueBoxLocationX >= circleLocationX - 20 &&
          this.state.blueBoxLocationX <= circleLocationX + 20 &&
          this.state.blueBoxLocationY >= circleLocationY - 20 &&
          this.state.blueBoxLocationY <= circleLocationY + 20)
        ||
        (this.state.blueBoxLocationX >= circleLocationx - 20 &&
          this.state.blueBoxLocationX <= circleLocationx + 20 &&
          this.state.blueBoxLocationY >= circleLocationy - 20 &&
          this.state.blueBoxLocationY <= circleLocationy + 20)
      ) {
        this.refs.blueBox.setNativeProps({ marginLeft: 0, marginTop: 0 })
        this.setState({
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          marginTop: 0,
          marginLeft: 0,
          blueBoxLocationX: 0,
          blueBoxLocationY: 0,
          circleLocationX: 0,
          circleLocationY: 0,
          move: false
        })
      }
    })
  }
  spin = () => {
    let rad1, rad2
    this.state.spin.setValue(0)
    Animated.timing(this.state.spin, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear
    }).start(() => this.spin())
    this.state.spin.addListener(e => {
      rad1 = 2 * pi * e.value
      rad2 = 2 * pi * e.value + pi / 2
      this.check(rad1)
      this.check(rad2)
    })
  }
  shouldComponentUpdate(prevProp, prevState) {
    const { show1, show2, show3 } = prevState
    if (this.state.show1 !== show1 || this.state.show2 !== show2 || this.state.show3 !== show3) {
      return true
    }
    return false
  }

  renderCircles = () => {
    let circles = []
    for (let i = 0; i < 9; i++) {
      circles.push(i)
    }
    return circles.map((circle, index) => <View
      key={Math.random() + 'circle'}
      style={styles.circle}
    />)
  }
  onCirclesMove = e => {
    const { x, y } = e.nativeEvent.layout
    const { blueBoxLocationX, blueBoxLocationY, marginTop, marginLeft } = this.state

    this.setState({ circleLocationX: x, circleLocationY: y }, () => {
    })
  }
  onBlueBoxMove = e => {
    const { x, y } = e.nativeEvent.layout
    const { circleLocationX, circleLocationY, marginLeft, marginTop, coi1x, coi1y, coi2x, coi2y, coi3x, coi3y, show1, show2, show3 } = this.state
    if (x <= coi1x + 15 && x >= coi1x - 15 && y <= coi1y + 15 && y >= coi1y - 15) {
      this.setState({ show1: false })
    }
    if (x <= coi2x + 15 && x >= coi2x - 15 && y <= coi2y + 15 && y >= coi2y - 15) {
      this.setState({ show2: false })
    }
    if (x <= coi3x + 15 && x >= coi3x - 15 && y <= coi3y + 15 && y >= coi3y - 15) {
      this.setState({ show3: false })
    }

    if ((marginLeft <= -95 && marginTop >= 115 && !show1 && !show2 && !show3)) {
      alert('You win')
    }
    this.setState({ blueBoxLocationX: x, blueBoxLocationY: y }, () => {
      if (x >= circleLocationX - 20 && x <= circleLocationX + 20 && y >= circleLocationY - 20 && y <= circleLocationY + 20) {
        this.refs.blueBox.setNativeProps({ marginLeft: 0, marginTop: 0 })
        this.setState({
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          marginTop: 0,
          marginLeft: 0,
          blueBoxLocationX: 0,
          blueBoxLocationY: 0,
          circleLocationX: 0,
          circleLocationY: 0,
        })
      }
    })
  }

  render() {
    const square = {
      transform: ([
        {
          rotate: this.state.spin.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        }
      ])
    }
    return (
      <View style={styles.root}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderGrant={this.onPress}
        onResponderMove={this.onMove}
        onResponderRelease={this.onRelease}
      >
        <View style={[styles.goal, { top: height / 2 - 30 - 135, left: width / 2 - 30 }]} />
        <View style={[styles.goal, { top: height / 2 - 30, left: width / 2 - 30 - 135 }]} />
        <View
          onLayout={this.onBlueBoxMove}
          style={styles.blueBox} ref='blueBox' />
        <Map style={styles.mapStyle} />
        <Animated.View
          onLayout={this.onCirclesMove}
          style={[styles.squares, { top: height / 2 - 10 - 90, left: width / 2 - 10, ...square }]} >
          {this.renderCircles()}
        </Animated.View>
        <Animated.View
          onLayout={this.onCirclesMove}
          style={[styles.squares, { backgroundColor: 'violet', flexDirection: 'row', top: height / 2 - 10, left: width / 2 - 90, ...square, }]} >
          {this.renderCircles()}
        </Animated.View>
        <View
          style={styles.touch}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderGrant={this.onPress}
          onResponderMove={this.onMove}
          onResponderRelease={this.onRelease}
        />
        <View
          onLayout={e => this.setState({ coi1x: e.nativeEvent.layout.x, coi1y: e.nativeEvent.layout.y })}
          style={[styles.coin, {
            top: this.state.show1 ? height/2-10 : -290, left: width/2+70,
          }]}
        />
        <View
          onLayout={e => this.setState({
            coi2x: e.nativeEvent.layout.x, coi2y: e.nativeEvent.layout.y
          })}
          style={[styles.coin, {
            left: this.state.show2 ? width/2+50 : -420, top: height/2+50
          }]}
        />
        <View
          onLayout={e => this.setState({
            coi3x: e.nativeEvent.layout.x, coi3y: e.nativeEvent.layout.y
          })}
          style={[styles.coin, { left: this.state.show3 ? width/2-50 : -250, top: height/2+70 }]}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'relative'
  },
  goal: {
    width: 60,
    height: 60,
    backgroundColor: 'cyan',
    position: 'absolute',
  },
  blueBox: {
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    position: 'absolute',
    top: height / 2 - 10 - 135,
    left: width / 2 - 10,
    zIndex: 2
  },
  mapStyle: {
    position: 'absolute',
    top: height / 2 - 105,
    left: width / 2 - 105
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: 1,
    marginBottom: 1
  },
  touch: {
    width: 160,
    height: 160,
    borderRadius: 90,
    backgroundColor: 'purple',
    position: 'absolute',
    top: height - 185,
    left: width - 160
  },
  squares: {
    position: 'absolute',
    backgroundColor: 'yellow',
  },
  coin: {
    zIndex: 2,
    backgroundColor: 'yellow',
    position: 'absolute',
    width: 15,
    height: 15,
    borderRadius: 10,
  }
})
