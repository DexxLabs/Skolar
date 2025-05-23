import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import fonts from '../../data/fonts';
import {color, height, padding} from '../../data/variables';
import * as Animatable from 'react-native-animatable';


const MiniCard = ({subject, attendance, total, isBunkable, amount, value}) => {
  const [showProgress, setShowProgress] = useState(false);
  const zone = value>75.00
  const getRandomValue = () => {
    return Math.floor(Math.random() * (1800 - 1300 + 1)) + 1000;
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowProgress(true);
    }, 100); // Delay to ensure layout is done

    return () => clearTimeout(timeout);
  }, []);
    //function to calculate percentage
    return (
      <Animatable.View animation='fadeIn' duration={500}
        style={{
          height: height / 7,
          borderColor: color.secondary,
          borderWidth: 2,
          borderRadius: 16,
          marginTop: padding,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, margin: padding}}>
          <Text style={[styles.desc, {fontFamily: fonts.m, fontSize: 20}]}>{subject}</Text>
  
          <View style={{flex: 1, justifyContent: 'space-evenly'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.desc}>Total Attendance :</Text>
              <Text style={styles.desc}>{attendance}</Text>
              <Text style={[styles.desc, {color: color.primary}]}>/{total}</Text>
            </View>
  
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.desc}>{isBunkable ? 'Bunkable : ' : 'Need to Attend : '}</Text>
              <Text style={[styles.desc, {color: isBunkable ? color.primary : color.warn}]}>{amount}</Text>
              <Text style={styles.desc}> Classes</Text>
            </View>
          </View>
        </View>
  
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {showProgress && (
            <CircularProgress
              value={value}
              radius={50}
              duration={getRandomValue()}
              progressValueColor="white"
              progressValueFontSize={15}
              progressValueStyle={{fontFamily: fonts.m}}
              valueSuffix={'%'}
              inActiveStrokeColor={zone?color.primary:color.warn}
              inActiveStrokeOpacity={0.1}
              maxValue={100}
              activeStrokeColor={zone?color.primary:color.warn}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              
            />
          )}
        </View>
      </Animatable.View>
    );
  };


export default MiniCard;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
    
  },
});
