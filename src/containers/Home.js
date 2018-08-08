import React, { Component } from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import {
  Button
} from 'react-native-elements'

const { width, height } = Dimensions.get("window")

export default class Home extends Component {
  static navigationOptions = navigation => {
    return {
      header: null
    }
  }
  render() {
    return (
      <View
        style={styles.root}
      >
        <Text style={styles.textTitle} >World's hardest game</Text>
        <Button
          title='Level 1'
          containerStyle={styles.button}
          clear={true}
          onPress={() => this.props.navigation.navigate('Level1')}
        />
        <Button
          title='Level 2'
          containerStyle={styles.button}
          clear={true}
          onPress={() => this.props.navigation.navigate('Level2')}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'cyan'
  },
  textTitle:{
    color: 'red',
    fontSize: 30,
    fontWeight:'bold'
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 100,
    width: width - 200,
    marginTop: 10
  }
})
