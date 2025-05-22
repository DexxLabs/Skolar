import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {color, height, padding} from '../../data/variables';
import CircularProgress from 'react-native-circular-progress-indicator';
import fonts from '../../data/fonts';

const Card = () => {
  return (
    <View
      style={{
        height: height / 5,
        borderColor: color.secondary,
        borderWidth: 2,
        borderRadius: 16,
        marginTop: padding * 2,
        flexDirection: 'row',
      }}>
      {/* percentage total */}
      <View style={{flex: 1, margin: padding}}>
        <Text
          style={[
            styles.desc,
            {
              fontFamily: fonts.m,
              fontSize: 22,
              marginLeft: 0,
              
            },
          ]}>
          Dashboard
        </Text>

        <View style={{flex:1,justifyContent:'space-evenly'}}>


        <View style={{flexDirection: 'row'}}>

          <Text style={styles.desc}>Total Attendance :</Text>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.desc}>60</Text>
        <Text style={[styles.desc,{color:color.primary}]}>/100</Text>
        </View>
        
        </View>


        <View>
        <Text style={styles.desc}>Green List :</Text>
        </View>


        <View>
        <Text style={styles.desc}>Red List :</Text>
        </View>

        
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress
          value={60}
          radius={70}
          duration={1500}
          progressValueColor="white"
          progressValueFontSize={18}
          progressValueStyle={{fontFamily: fonts.m}}
          valueSuffix={'%'}
          inActiveStrokeColor={color.primary}
          inActiveStrokeOpacity={0.1}
          maxValue={100}
          activeStrokeColor={color.primary}
          inActiveStrokeWidth={7}
          activeStrokeWidth={7}
        />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  desc: {
    color: color.text,
    fontFamily: fonts.s,
    
  },
});
