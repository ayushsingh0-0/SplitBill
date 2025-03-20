import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function SplashScreen() {
  // const navigation = useNavigation();

  // useEffect(() => {
  //   setTimeout(() => {
  //     navigation.navigate('Login');
  //   });
  // }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Splash Screen</Text>
    </View>
  );
}
