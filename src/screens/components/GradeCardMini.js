import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import fonts from '../../data/fonts';
import {color, height, padding} from '../../data/variables';
import * as Animatable from 'react-native-animatable';



const GradeCardMini = ({subject, grade, value}) => {
  const [showProgress, setShowProgress] = useState(false);
  const [isBack, setisBack]=useState(false)
  useEffect(() => {
    if (grade === 'Ab' || grade === 'F') {
      setisBack(true);
    }
  }, [grade]);
  const getRandomValue = () => {
    return Math.floor(Math.random() * (1800 - 1300 + 1)) + 500;
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowProgress(true);
    }, 100); // Delay to ensure layout is done

    return () => clearTimeout(timeout);
  }, []);

    return (
      <Animatable.View animation='fadeIn' duration={500}
        style={{
          height: height / 10,
          borderColor: color.secondary,
          borderWidth: 2,
          borderRadius: 16,
          marginTop: padding,
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, margin: padding,justifyContent:'center'}}>

          <Text style={[styles.desc, {fontFamily: fonts.m, fontSize: 16,flexWrap:'wrap'}]}>{subject}</Text>
  
        </View>
  
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {showProgress && (
            <CircularProgress
              value={value}
              radius={height/25}
              duration={getRandomValue()}
              progressValueColor="white"
              progressValueFontSize={15}
              progressValueStyle={{fontFamily: fonts.m}}
              inActiveStrokeColor={isBack?color.warn:color.primary}
              inActiveStrokeOpacity={0.1}
              maxValue={100}
              activeStrokeColor={isBack?color.warn:color.primary}
              inActiveStrokeWidth={5}
              activeStrokeWidth={5}
              progressFormatter={(v) => {
                'worklet';
                if (v >= 90) return 'O';
                if (v >= 80) return 'A+';
                if (v >= 70) return 'A';
                if (v >= 60) return 'B+';
                if (v >= 50) return 'B';
                if (v >= 40) return 'C';
                if (v >= 35) return 'P';
                if (v === 0) {return 'Ab';};
                return 'F';
              }}
            />
          )}
        </View>
      </Animatable.View>
    );
  };


export default GradeCardMini;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
    
  },
});
