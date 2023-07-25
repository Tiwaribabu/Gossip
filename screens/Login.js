import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

const screenheight = Dimensions.get("window").height;

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const openForgotPasswordScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Welcome');
        navigation.navigate("Chats");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/Flash.jpg')} style={styles.background}>
        <Animatable.View animation="slideInUp" style={styles.container}>
          <Text style={styles.title}>Welcome to Chat App</Text>
          <Text style={styles.subTitle}>Connect with friends globally</Text>
          <Input
            placeholder='Enter your email'
            leftIcon={<Icon name='envelope' size={18} color='grey' />}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize='none'
            autoCompleteType='email'
            keyboardType='email-address'
          />
          <Input
            placeholder='Enter your password'
            leftIcon={<Icon name='lock' size={18} color='grey' />}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openForgotPasswordScreen}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openRegisterScreen}>
            <Text style={styles.signUpText}>Not a user? Sign up</Text>
          </TouchableOpacity>
        </Animatable.View>
      </ImageBackground>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: screenheight,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderTopEndRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#064663',
    marginBottom: 10,
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#064663',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    width: '60%',
    height: 40,
    backgroundColor: '#FAAB78',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#064663',
    fontSize: 20,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    color: '#064663',
    fontSize: 15,
    marginTop: 10,
  },
  signUpText: {
    fontWeight: 'bold',
    color: '#064663',
    fontSize: 15,
    marginTop: 10,
  },
});
