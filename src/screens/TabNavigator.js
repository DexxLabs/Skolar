import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from './Home'
import { color } from '../data/variables'
import Grade from './Grade'

const {height,width} = Dimensions.get('window')
const Tab = createBottomTabNavigator()
const CustomTabButton = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      style={[
        {
          flex:1,
          justifyContent: 'center',
          alignItems: 'center',
          width: width / 6,
          backgroundColor: 'transparent',

        },
        style, // allows passing in extra styles
      ]}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};


const TabNavigator = () => {
  return (
    
    <Tab.Navigator
    screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: color.primary,
        tabBarStyle: {
          position: 'absolute',
          height: 55,
          width: width / 3,
          bottom: '6%',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginHorizontal: width/3,
          backgroundColor: color.secondary
        }
    }}
    >
        <Tab.Screen
    name="Home"
    component={Home}
    
    options={{
      tabBarButton: (props) => <CustomTabButton {...props} />,
      headerShown: false,
      tabBarIcon: ({ focused }) => (
        <View style={[styles.image]}>
          <Image
            source={require('../assets/svg/home.png')}
            style={[
              styles.ImageHandler,
              focused ? { tintColor: color.primary } : { tintColor: '#797D81'},
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
      tabBarButton: (props) => <CustomTabButton {...props} />,
      tabBarIcon: ({ focused }) => (
        <View style={[styles.image]}>
          <Image
            source={require('../assets/svg/grade.png')}
            style={[
              styles.ImageHandler,
              focused ? { tintColor: color.primary } : { tintColor: '#797D81'},{height:21,width:21}
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
        width: 25 ,
        height: 25 ,
      },
      image: {
        justifyContent: 'center',
        alignItems: 'center',
        
      },
      selected: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: width/6,
        justifyContent:'center',
        alignItems: 'center'
      },
})