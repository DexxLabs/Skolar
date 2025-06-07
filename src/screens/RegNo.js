import {
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useState } from 'react';
  import {color, height, padding, user, width} from '../data/variables';
  import fonts from '../data/fonts';
  import {useAuthStore} from '../data/authStore';
import { CommonActions, useNavigation } from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RegNo = () => {
  const [regno,setRegNoInput]=useState('')
  const navigation= useNavigation()
  const setRegno = useAuthStore.getState().setRegno
  const insets = useSafeAreaInsets()
  

  //fetch function for searching the registration no
    const fetch = async ()=> {
        if (regno=='12'){    //--- to be replaced with real database query
            await setRegno(regno);
            Snackbar.show({
                text: 'Registration Number Verified Successfully',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: fonts.md,
                backgroundColor: color.secondary,
              });
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'TabNavigator' }],
                })
              );
        }
        else{
            Snackbar.show({
                text: 'Invalid Registration Number',
                duration: Snackbar.LENGTH_SHORT,
                fontFamily: fonts.md,
                backgroundColor: color.secondary,
              });
        }
    }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: color.background,
        paddingTop: insets.top+padding/2,
        paddingHorizontal: padding,
      }}>
        <View style={{flex: 1,alignItems:'center'}}>
          <View >
            <Text style={styles.headerText2}>Skolar</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={styles.box}>
            <Text style={styles.label}>Enter Your Registration Number</Text>
            <TextInput
              selectionColor={color.primary}
              style={styles.input}
              keyboardType="decimal-pad"
              maxLength={10}
              value={regno}
              onChangeText={(text)=>setRegNoInput(text)}
            />
  
            <TouchableOpacity onPress={() => fetch()} style={styles.loginButton}>
              <Text style={styles.loginButtonText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View style={{flex: 1}}></View>
      </View>
    );
  };

export default RegNo;

const styles = StyleSheet.create({
    box: {
        width: '100%',
        padding: padding,
        borderColor: color.secondary,
        borderWidth: 2,
        borderRadius: 12,
        transform: [{translateY: -StatusBar.currentHeight}]
      },
      label: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 5,
        marginTop: 15,
        color: color.text,
        fontFamily: fonts.md,
      },
      input: {
        color:'#fff',
        borderRadius: 8,
        borderColor: color.secondary,
        borderWidth: 2,
        padding: 10,
        fontSize: 16,
        fontFamily: fonts.md,
      },
      loginButton: {
        backgroundColor: color.primary,
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 25,
        alignItems: 'center',
      },
      loginButtonText: {
        color: color.text,
        fontWeight: '600',
        fontSize: 16,
        fontFamily: fonts.md,
      },
      googleButton: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: 50,
        padding: 12,
        elevation: 3,
      },
      googleIcon: {
        width: 24,
        height: 24,
      },
      headerText:{
        color: color.text,
        fontFamily: fonts.m,
        fontSize:16
      },
      headerText2:{
        color: color.primary,
        fontFamily: 'futura medium bt',
        fontSize:25,
      },
})