import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import { color, height, width } from '../data/variables'
import Grade from './Grade'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator
    screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: color.primary,
        tabBarStyle: {
          position: 'absolute',
          bottom: '5%',
          width: width / 2,
          backgroundColor: color.primary,
          height: '7%',
          borderRadius: 20,
        }}
    }
    >
        <Tab.Screen
    name="Home"
    component={Home}
    options={{
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={[styles.image, focused ? styles.selected : {}]}>
          <Image
            source={require('../assets/svg/attendance.png')}
            style={[
              styles.ImageHandler,
              focused ? { tintColor: color.primary } : {},
            ]}
          />
        </View>
      ),
    }}
  />
  <Tab.Screen
    name="Grade"
    component={Grade}
    options={{
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={[styles.image, focused ? styles.selected : {}]}>
          <Image
            source={require('../assets/svg/grade.png')}
            style={[
              styles.ImageHandler,
              focused ? { tintColor: color.primary } : {},
            ]}
          />
        </View>
      ),
    }}
  />
    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    ImageHandler: {
        width: 40 ,
        height: 40 ,
      },
      image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      selected: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: width/4,
        height:height/4
      },
})