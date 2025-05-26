import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, profile, user } from '../../data/variables'
import fonts from '../../data/fonts'
import { useNavigation } from '@react-navigation/native'

const Header = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.headerWrapper}>
    <View >
        <Text style={styles.headerText}>Hello</Text>
        <Text style={styles.headerText2}>{user}</Text>
    </View>
    <Pressable onPress={()=>navigation.navigate("Profile")}>
      <Image source={{uri:profile}} style={styles.imageHandler}/>
    </Pressable>
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