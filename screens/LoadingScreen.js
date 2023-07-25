import { StyleSheet, Text, View,LogBox } from 'react-native'
import React from 'react'
import {auth} from '../firebase';


import{ useEffect, useState } from 'react'
import { onAuthStateChanged } from "firebase/auth";


export default function LoadingScreen ({navigation}) {
 

 

  useEffect(() => {
   
  onAuthStateChanged(auth,(user) => {
          
      if (user) {
        
      navigation.navigate('Chats')
       
        // ...
      }
      else{
       navigation.navigate('Login')
      } 
    });
      
   
      
   
  }, [])
    


}



const styles = StyleSheet.create({})