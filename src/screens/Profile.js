import {
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {color, height, padding, profile, user, width} from '../data/variables';
import fonts from '../data/fonts';
import {useNavigation} from '@react-navigation/native';
import { useAuthStore } from '../data/authStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LetsGo = () => {
  const navigation = useNavigation();
  const userData = useAuthStore(state => state.userData);
  
  const logout = async () => {
    const logout = useAuthStore.getState().logout;
    await logout();
  };
    const insets = useSafeAreaInsets()
  
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: color.background,
          paddingTop: insets.top+padding/2,
          paddingHorizontal: padding,
        }}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 15}}>
          <Image
            source={require('../assets/svg/back.png')}
            style={{height: 20, width: 20, tintColor: 'white'}}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginTop: 0}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: padding,
              borderColor: color.secondary,
              borderWidth: 2,
              borderRadius: 16,
              justifyContent: 'center',
            }}>
            <Image
              source={{
                uri: userData?.profilePic || 'https://i.pinimg.com/736x/ac/6b/13/ac6b1392be57602c482e0317acaa3f4a.jpg'
              }}
              style={styles.imageHandler}
            />
            <Text style={styles.headerText2}>{userData?.givenName || 'Guest'}</Text>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: padding,
              }}>
              <TouchableOpacity
                style={{
                  borderColor: color.secondary,
                  borderWidth: 2,
                  height: height / 20,
                  width: width / 3,
                  borderRadius: height / 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => logout()}>
                <Text
                  style={{
                    color: color.text,
                    fontSize: 16,
                    fontFamily: fonts.m,
                  }}>
                  LOGOUT
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* bottom section */}
          <View
            style={{
              
              marginTop: padding,
              borderColor: color.secondary,
              borderWidth: 2,
              borderRadius: 16,
              marginBottom:padding*2
            }}>
            <View style={{margin: padding}}>
              <Text
                style={{color: color.text, fontFamily: fonts.s, fontSize: 20}}>
                The Dev
              </Text>
              {/* Instagram */}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.instagram.com/ranb__r/')
                }
                style={{
                  flexDirection: 'row',
                  marginTop: padding,
                  alignItems: 'flex-end',
                }}>
                <View>
                  <Image
                    source={require('../assets/svg/instagram.png')}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 7,
                      height: 15,
                      width: 15,
                      tintColor: 'white',
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: color.text,
                      fontFamily: fonts.m,
                      fontSize: 14,
                    }}>
                    @ranb__r
                  </Text>
                </View>
              </TouchableOpacity>



                {/*Github */}
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://github.com/DexxLabs')
                }
                style={{
                  flexDirection: 'row',
                  marginTop: padding,
                  alignItems: 'flex-end',
                }}>
                <View>
                  <Image
                    source={require('../assets/svg/github.png')}
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 7,
                      height: 15,
                      width: 15,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      color: color.text,
                      fontFamily: fonts.m,
                      fontSize: 14,
                    }}>
                    DexxLabs
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/*button*/}
    </View>
  );
};

export default LetsGo;

const styles = StyleSheet.create({
  imageHandler: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  headerText2: {
    color: color.text,
    fontFamily: fonts.s,
    fontSize: 30,
    marginTop: padding / 2,
  },
});
