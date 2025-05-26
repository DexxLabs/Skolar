import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color, height, padding} from '../../data/variables';
import CircularProgress from 'react-native-circular-progress-indicator';
import fonts from '../../data/fonts';
import * as Animatable from 'react-native-animatable';


const GradeCard = ({name, regno,branch,cgpa}) => {
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
        height: height / 5,
        borderColor: color.secondary,
        borderWidth: 2,
        borderRadius: 16,
        marginTop: padding * 2,
        flexDirection: 'row',
      }}>
      {/* Info section */}
      <View style={{flex: 1, margin: padding}}>
        <Text style={[styles.desc, {fontFamily: fonts.m, fontSize: 22}]}>Dashboard</Text>

        <View style={{flex: 1, justifyContent: 'space-evenly'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.desc}>Name : </Text>
            <Text style={[styles.desc, {fontFamily:fonts.m,color: color.primary}]}>{name}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.desc}>Registration No : </Text>
            <Text style={[styles.desc, {color: color.primary}]}>{regno}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.desc}>Branch : </Text>
            <Text style={[styles.desc, {color: color.primary}]}>{branch}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={styles.desc}>CGPA : </Text>
            <Text style={styles.desc}>{cgpa}</Text>
            <Text style={[styles.desc, {color: color.primary}]}>/10</Text>
          </View>
        </View>
      </View>

      {/* Circular Progress */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {showProgress && (
          <CircularProgress
            value={cgpa}
            radius={height/12}
            duration={1500}
            progressValueColor="white"
            progressValueFontSize={18}
            progressValueStyle={{fontFamily: fonts.m}}
            inActiveStrokeColor={color.primary}
            inActiveStrokeOpacity={0.1}
            maxValue={10}
            activeStrokeColor={color.primary}
            inActiveStrokeWidth={7}
            activeStrokeWidth={7}
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

export default GradeCard;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
  },
});
