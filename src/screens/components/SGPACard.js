import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {color, height, padding} from '../../data/variables';
import CircularProgress from 'react-native-circular-progress-indicator';
import fonts from '../../data/fonts';
import * as Animatable from 'react-native-animatable';
import Snackbar from 'react-native-snackbar';


const SGPACard = ({ semester, cgpa, sgpa }) => {
  const [showProgress, setShowProgress] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    setShowProgress(false); // reset progress
    const timeout = setTimeout(() => {
      setShowProgress(true);
    }, 100);
    animRef.current?.fadeIn(100);
    
    return () => clearTimeout(timeout);
  }, [semester, cgpa, sgpa]); // watch for prop changes
  return (
    <Animatable.View
      ref={animRef}
      style={{
        borderColor: color.secondary,
        borderWidth: 2,
        borderRadius: 16,
        marginTop: padding,
        flexDirection: 'row',
      }}
    >
      {/* Info section */}
      <View style={{ flex: 1, margin: padding, gap: 7 }}>
        <Text style={[styles.desc, { fontFamily: fonts.m, fontSize: 18 }]}>{semester}</Text>

        <View style={{ flex: 1, gap: 7 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.desc}>SGPA : </Text>
            <Text style={styles.desc}>{sgpa}</Text>
            <Text style={[styles.desc, { color: color.primary }]}>/10</Text>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.desc}>CGPA (At that point) : </Text>
            <Text style={styles.desc}>{cgpa}</Text>
            <Text style={[styles.desc, { color: color.primary }]}>/10</Text>
          </View>
        </View>
      </View>

      {/* Circular Progress */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {showProgress && (
          <CircularProgress
            value={parseFloat(sgpa)} // Optional: make value dynamic
            radius={height / 20}
            duration={1500}
            progressValueColor="white"
            progressValueFontSize={18}
            progressValueStyle={{ fontFamily: fonts.m }}
            inActiveStrokeColor={color.primary}
            inActiveStrokeOpacity={0.1}
            maxValue={10}
            activeStrokeColor={color.primary}
            inActiveStrokeWidth={5}
            activeStrokeWidth={5}
            progressFormatter={(value) => {
              'worklet';
              return value.toFixed(2);
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
