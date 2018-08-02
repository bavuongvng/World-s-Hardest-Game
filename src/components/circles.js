import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

export default class Circles extends Component {
  state = {}

  renderCircles = () => {
    let circles = []
    for (let i = 0; i < 4; i++) {
      circles.push(i)
    }
    return circles.map((item, index) => <View
      key={Math.random()}
      style={[styles.circle, { ...this.props.style }]}
    />)
  }

  render() {
    return (
      <View
        style={[styles.root,{...this.props.style}]}
      >
        {this.renderCircles()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
  },
  circle: {
    height: 16,
    width: 16,
    backgroundColor: 'red',
    borderRadius: 8,
    marginTop: 2,
  }
})
