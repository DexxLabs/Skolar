import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color, height, padding, width} from '../data/variables';
import fonts from '../data/fonts';
import {useNavigation} from '@react-navigation/native';

const LetsGo = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 12,
      }}>
      <View style={{flex: 9}}></View>
      <View style={{flex: 1.5, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: color.primary,
            height: height / 15,
            width: width - padding * 2,
            borderRadius: height / 100,
          }}
          onPress={() => navigation.navigate('Login')}>
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              flex: 1,
              color: color.text,
              fontSize: 16,
              fontFamily: fonts.md,
            }}>
            ENTER
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LetsGo;

const styles = StyleSheet.create({});
