import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color, height, padding, width} from '../data/color';
import fonts from '../data/fonts';
import { useAuthStore } from '../data/authStore';

const Home = () => {
  const logout = async () => {
    const logout = useAuthStore.getState().logout;
    await logout();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 12,
      }}>
      <Text style={{color: '#fff'}}>Hello There</Text>
      <TouchableOpacity
        style={{
          backgroundColor: color.primary,
          height: height / 30,
          width: width / 2 - padding * 2,
          borderRadius: height / 100,
        }}
        onPress={() => logout()}>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            flex: 1,
            color: color.text,
            fontSize: 16,
            fontFamily: fonts.md,
          }}>
          LOGOUT
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
