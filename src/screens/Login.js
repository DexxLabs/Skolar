import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../data/variables';
import fonts from '../data/fonts';
import Snackbar from 'react-native-snackbar';
import {useAuthStore} from '../data/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //login function
  const login = async () => {
    if (email === '' || password === '') {
      return Snackbar.show({
        text: 'Field cannot be empty',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: fonts.md,
        backgroundColor: color.secondary,
      });
    }
  
    try {
      const response = await fetch('http://192.168.65.100:3001/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const login = useAuthStore.getState().login;
        await login(data.token); // store token in global state or secure storage
        Snackbar.show({
          text: 'Logged In Successfully',
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: fonts.md,
          backgroundColor: color.secondary,
        });
      } else {
        Snackbar.show({
          text: data.error || 'Invalid credentials',
          duration: Snackbar.LENGTH_SHORT,
          fontFamily: fonts.md,
          backgroundColor: color.secondary,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      Snackbar.show({
        text: 'Something went wrong',
        duration: Snackbar.LENGTH_SHORT,
        fontFamily: fonts.md,
        backgroundColor: color.secondary,
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={text => setEmail(text)}
          selectionColor={color.primary}
          style={styles.input}
          keyboardType="email-address"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={text => setPassword(text)}
          selectionColor={color.primary}
          style={styles.input}
          secureTextEntry
        />
        {/* login button */}
        <TouchableOpacity onPress={() => login()} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
          <Text
            style={{marginHorizontal: 10, color: '#888', fontFamily: fonts.md}}>
            OR
          </Text>
          <View style={{flex: 1, height: 1, backgroundColor: '#ccc'}} />
        </View>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../assets/svg/google.png')}
            style={styles.googleIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.background,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '85%',
    padding: 20,
    borderColor: color.secondary,
    borderWidth: 2,
    borderRadius: 12,
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
});
