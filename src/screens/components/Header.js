import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, user } from '../../data/variables'
import fonts from '../../data/fonts'

const Header = () => {
  return (
    <View style={styles.headerWrapper}>
    <View >
        <Text style={styles.headerText}>Hello</Text>
        <Text style={styles.headerText2}>{user}</Text>
    </View>
    <View>
      <Image source={{uri:'https://i.pinimg.com/736x/ac/6b/13/ac6b1392be57602c482e0317acaa3f4a.jpg'}} style={styles.imageHandler}/>
    </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText:{
        color: color.text,
        fontFamily: fonts.m,
        fontSize:16
      },
      headerText2:{
        color: color.primary,
        fontFamily: fonts.m,
        fontSize:30,
        marginTop: -7
      },
      imageHandler:{
        height:38,
        width:38,
        borderRadius:40
      }
})