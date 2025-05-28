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
import FloatingBlock from './components/FloatingBlock';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const LetsGo = () => {
  const navigation = useNavigation();
    const insets = useSafeAreaInsets()
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.background,
          paddingTop: insets.top+padding/2,
          paddingHorizontal: padding,
        }}>
      <View style={{flex: 9}}>
        <FloatingBlock metric={height/14} left={'3%'} bottom={'92%'}/>
        <FloatingBlock metric={height/4} left={'40%'}  bottom={'60%'}/> 
        <FloatingBlock metric={height/5} left={'3%'} bottom={'30%'}/>
        <FloatingBlock metric={height/7} left={'65%'} bottom={'7%'}/>

        <View style={{position: 'absolute',top:'10%',left:'1%'}}>
          <Text style={{fontFamily:"Futura Book font", color:color.text,fontSize:29}}>All Your STATS</Text>
          <Text style={{fontFamily:"Futura Book font", color:color.primary,fontSize:45}}>   Right Here</Text>
        </View>

        <View style={{alignItems:'flex-end'}}>
          <Text style={{fontFamily:"Vaticanus", color:color.text,fontSize:10}}>@ranb__r</Text>
        </View>
      </View>
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
