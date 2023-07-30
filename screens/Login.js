import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const openRegisterScreen = () => {
    navigation.navigate('Register');
  };

  const openForgotPasswordScreen = () => {
    navigation.navigate('ForgotPassword');
  };

  const login = () => {
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        const user = userCredential.user;
        setMessage('Welcome');
        navigation.navigate("Chats");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === 'auth/user-not-found') {
          setError('The email address you entered is not registered.');
        } else if (error.code === 'auth/wrong-password') {
          setError('The password you entered is incorrect.');
        } else {
          setError(error.message);
        }
      });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/Flash.jpg')} style={styles.background} resizeMode="cover">
        <Animatable.View animation="slideInUp" style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Welcome to Chat App</Text>
          <Text style={styles.subTitle}>Connect with friends globally</Text>
          <Input
            placeholder='Email'
            leftIcon={<Icon name='envelope' size={18} color='grey' />}
            value={email}
            onChangeText={(text) => setEmail(text)}
            autoCapitalize='none'
            autoCompleteType='email'
            keyboardType='email-address'
          />
          <Input
            placeholder='Password'
            leftIcon={<Icon name='lock' size={18} color='grey' />}
            rightIcon={
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={18}
                color='grey'
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={!showPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {message ? <Text style={styles.messageText}>{message}</Text> : null}
          {loading ? (
            <>
              <ActivityIndicator size="large" color="#FAAB78" />
              <Text style={styles.loadingText}>Logging in...</Text>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openForgotPasswordScreen}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openRegisterScreen}>
                <Text style={styles.signUpText}>Not a user? Sign up</Text>
              </TouchableOpacity>
            </>
          )}
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
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  messageText: {
    color: 'green',
    marginBottom: 10,
    textAlign: 'center',
  },
  loadingText: {
    color: '#064663',
    marginBottom: 10,
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