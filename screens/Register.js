import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';

const screenheight = Dimensions.get("window").height;

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const openLoginScreen = () => {
    navigation.navigate('Login');
  };

  const register = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        navigation.navigate("Chats");
      })
      .catch((error) => {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          setError('The email address is already in use by another account.');
        } else if (error.code === 'auth/invalid-email') {
          setError('The email address is not valid.');
        } else if (error.code === 'auth/weak-password') {
          setError('The password is too weak.');
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
          <Text style={styles.title}>Create an account</Text>
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
          <Input
            placeholder='Confirm Password'
            leftIcon={<Icon name='lock' size={18} color='grey' />}
            rightIcon={
              <Icon
                name={showPassword ? 'eye-slash' : 'eye'}
                size={18}
                color='grey'
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            secureTextEntry={!showPassword}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          {loading ? (
            <>
              <ActivityIndicator size="large" color="#FAAB78" />
              <Text style={styles.loadingText}>Creating account...</Text>
            </>
          ) : (
            <>
              <TouchableOpacity style={styles.button} onPress={register}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={openLoginScreen}>
                <Text style={styles.signInText}>Already a user? Sign in</Text>
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
  errorText: {
    color: 'red',
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
  signInText:{
    fontWeight: 'bold',
    color: '#064663',
    fontSize: 15,
    marginTop: 10,
  }
})