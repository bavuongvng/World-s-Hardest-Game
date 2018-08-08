import React, { Component } from 'react'
import { createStackNavigator } from 'react-navigation'

import Home from './Home'
import Level1 from './level1'
import Level2 from './Level2'

const routeConfigs = {
  Home: {
    screen: Home
  },
  Level1: {
    screen: Level1
  },
  Level2: {
    screen: Level2
  },
}

const options = {

}

const stack = createStackNavigator(routeConfigs, options)

export default stack
