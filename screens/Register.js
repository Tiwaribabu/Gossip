import React, { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: name,
        })
          .then(() => {
            alert('Registration Successful');
            navigation.navigate('Chats');
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/Flash.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <Input
          placeholder='Enter your name'
          label='Name'
          value={name}
          onChangeText={(text) => setName(text)}
          inputContainerStyle={styles.inputContainerStyle}
          labelStyle={styles.labelStyle}
        />
        <Input
          placeholder='Enter your email'
          label='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputContainerStyle={styles.inputContainerStyle}
          labelStyle={styles.labelStyle}
          autoCapitalize='none'
          autoCompleteType='email'
          keyboardType='email-address'
        />
        <Input
          placeholder='Enter your password'
          label='Password'
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputContainerStyle={styles.inputContainerStyle}
          labelStyle={styles.labelStyle}
          secureTextEntry
          autoCapitalize='none'
          autoCompleteType='password'
        />
        <Button
          title='Sign Up'
          onPress={register}
          buttonStyle={styles.buttonStyle}
          titleStyle={styles.buttonTitleStyle}
        />
        <Button
          title='Already have an account? Sign In'
          onPress={() => navigation.navigate('Login')}
          type='clear'
          titleStyle={styles.signInButtonTitle}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  inputContainerStyle: {
    borderBottomColor: '#fff',
    marginBottom: 10,
  },
  labelStyle: {
    color: '#fff',
  },
  buttonStyle: {
    backgroundColor: '#ffa500',
    marginTop: 10,
    width: '100%',
  },
  buttonTitleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', // Add this line to center the text within the button
  },
  signInButtonTitle: {
    color: '#fff',
    textDecorationLine: 'underline',
  },
});

export default Register;
