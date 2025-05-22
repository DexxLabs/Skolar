import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { color } from '../../data/variables'

const Palette = () => {
  return (
    <View style={{flex:1,backgroundColor:color.background}}>
      <View style={{height:50,width:50,backgroundColor:color.primary,borderRadius:10,marginTop:5}}/>
      <View style={{height:50,width:50,backgroundColor:color.secondary,borderRadius:10,marginTop:5}}/>
      <View style={{height:50,width:50,backgroundColor:color.text,borderRadius:10,marginTop:5}}/>
    </View>
  )
}

export default Palette

const styles = StyleSheet.create({})