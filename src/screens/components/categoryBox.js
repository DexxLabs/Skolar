import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color} from '../../data/variables';
import fonts from '../../data/fonts';

const CategoryBox = ({name, focused}) => {
  return (
    <View
      style={{
        borderColor: color.secondary,
        borderWidth: focused ? 0 : 1,
        backgroundColor: focused ? color.primary : color.background,
        borderRadius: 12,
        padding: 12,
        marginRight: 6,
      }}>
      <Text style={{fontFamily: fonts.m, color: color.text}}>{name}</Text>
    </View>
  );
};

export default CategoryBox;

const styles = StyleSheet.create({});
