import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color, profile, user } from '../../data/variables'
import fonts from '../../data/fonts'
import { useNavigation } from '@react-navigation/native'
import { useAuthStore } from '../../data/authStore'


const Header = () => {
  const navigation = useNavigation()
  const userData = useAuthStore(state => state.userData);
  return (
    <View style={styles.headerWrapper}>
    <View >
        <Text style={styles.headerText}>Hello</Text>
        <Text style={styles.headerText2}>{userData?.givenName || 'Guest'}</Text>
    </View>
    <Pressable onPress={()=>navigation.navigate("Profile")}>
      <Image source={{uri:userData?.profilePic || 'https://i.pinimg.com/736x/ac/6b/13/ac6b1392be57602c482e0317acaa3f4a.jpg'}} style={styles.imageHandler}/>
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
        fontSize:16,
        marginLeft:2
      },
      headerText2:{
        color: color.primary,
        fontFamily: fonts.m,
        fontSize:25,
        marginTop: -7,
      },
      imageHandler:{
        height:38,
        width:38,
        borderRadius:40
      }
})