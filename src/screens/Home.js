import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color, height, padding, width} from '../data/variables';
import fonts from '../data/fonts';
import {useAuthStore} from '../data/authStore';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Home = () => {
  const logout = async () => {
    const logout = useAuthStore.getState().logout;
    await logout();
  };
const no = useAuthStore(state=>state.regno)

return(
  <View
          style={{
            flex: 1,
            backgroundColor: color.background,
            paddingTop: StatusBar.currentHeight + padding,
            paddingHorizontal: padding,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text style={{color:'white'}}>There : {no}</Text>
          </View>
)
};

export default Home;

const styles = StyleSheet.create({
  
});
