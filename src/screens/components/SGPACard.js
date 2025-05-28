import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, height, padding} from '../../data/variables';
import CircularProgress from 'react-native-circular-progress-indicator';
import fonts from '../../data/fonts';
import * as Animatable from 'react-native-animatable';


const SGPACard = ({semester,cgpa,sgpa}) => {
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowProgress(true);
    }, 100); // wait for layout pass

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animatable.View animation='fadeIn' duration={500}
      style={{
        
        borderColor: color.secondary,
        borderWidth: 2,
        borderRadius: 16,
        marginTop:padding,
        flexDirection: 'row',
      }}>
      {/* Info section */}
      <View style={{flex: 1, margin: padding,gap:7}}>
        <Text style={[styles.desc, {fontFamily: fonts.m, fontSize: 22}]}>{semester}</Text>

        <View style={{flex: 1,gap:7}}>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.desc}>SGPA : </Text>
            <Text style={styles.desc}>{sgpa}</Text>
            <Text style={[styles.desc, {color: color.primary}]}>/10</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.desc}>CGPA (At this point) : </Text>
            <Text style={styles.desc}>{cgpa}</Text>
            <Text style={[styles.desc, {color: color.primary}]}>/10</Text>
          </View>

          
        </View>
      </View>

      {/* Circular Progress */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {showProgress && (
          <CircularProgress
            value={9.5}
            radius={height/20}
            duration={1500}
            progressValueColor="white"
            progressValueFontSize={18}
            progressValueStyle={{fontFamily: fonts.m}}
            inActiveStrokeColor={color.primary}
            inActiveStrokeOpacity={0.1}
            maxValue={10}
            activeStrokeColor={color.primary}
            inActiveStrokeWidth={4}
            activeStrokeWidth={4}
            progressFormatter={(value) => {
              'worklet';
                
              return value.toFixed(2); // 2 decimal places
            }}
          />
        )}
      </View>
    </Animatable.View>
  );
};

export default SGPACard;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
  },
});
