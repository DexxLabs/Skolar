import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, height, padding} from '../../data/variables';
import CircularProgress from './CircularProgress';

const Card = () => {
  return (
    <View
      style={{
        height: height / 5,
        backgroundColor: color.secondary,
        borderRadius: 16,
        marginTop: padding*2,
        flexDirection: 'row',
      }}>
        {/* percentage total */}
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <CircularProgress progress={40}/>

        </View>
        <View style={{flex:1}}></View>
      
      </View>
  );
};

export default Card;

const styles = StyleSheet.create({});
