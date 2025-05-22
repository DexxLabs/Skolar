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
import Card from './components/Card';
import Header from './components/Header';
import Palette from './components/Palette';



const Home = () => {

  //logout function
  const logout = async () => {
    const logout = useAuthStore.getState().logout;
    await logout();
  };
  // registration no fetch -- useAuthStore -> regno (asyncStorage.getItem('regno'))
const no = useAuthStore(state=>state.regno)

return(
  <View
          style={{
            flex: 1,
            backgroundColor: color.background,
            paddingTop: StatusBar.currentHeight + padding,
            paddingHorizontal: padding,
            
          }}>

            {/* header */}
            <Header/>
            {/*maincard*/}
            <Card/>

          </View>
)
};

export default Home;

const styles = StyleSheet.create({
  
});
