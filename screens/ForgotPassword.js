import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions, Text, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const screenheight = Dimensions.get("window").height;

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const resetPassword = () => {
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        setResetSent(true);
        setMessage('An email with instructions to reset your password has been sent to: ' + email);
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.message);
      });
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <ImageBackground source={require('../assets/Flash.jpg')} style={styles.background}>
        <View style={styles.container}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
          <Text style={styles.title}>Forgot Password</Text>
          {!resetSent ? (
            <>
              <Text style={styles.subTitle}>Enter your email to reset your password.</Text>
              <Input
                placeholder='Enter your email'
                leftIcon={<Icon name='envelope' size={18} color='grey' />}
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize='none'
                autoCompleteType='email'
                keyboardType='email-address'
              />
              <TouchableOpacity style={styles.button} onPress={resetPassword}>
                <Text style={styles.buttonText}>Reset Password</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.resetText}>Password Reset Email Sent!</Text>
              <Text style={styles.resetInfoText}>{message}</Text>
              <TouchableOpacity style={styles.loginButton} onPress={goToLogin}>
                <Text style={styles.loginButtonText}>Back to Login</Text>
              </TouchableOpacity>
            </>
          )}
          {message && !resetSent ? <Text style={styles.messageText}>{message}</Text> : null}
          {loading ? (
            <>
              <ActivityIndicator size="large" color="#FAAB78" />
              <Text style={styles.loadingText}>Sending password reset email...</Text>
            </>
          ) : null}
        </View>
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
  resetText: {
    fontSize: 24,
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
  resetInfoText: {
    fontSize: 16,
    color: '#064663',
    fontSize: 15,
    marginTop: 10,
  }
})
