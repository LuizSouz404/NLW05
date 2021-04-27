import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';

import { Feather } from '@expo/vector-icons';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

import WateringImg from '../assets/watering.png';

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate('User');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie{'\n'}
          suas plantas de{'\n'}
          forma fácil
        </Text>

        <Image source={WateringImg} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de rengar suas plantas. Nós cuidamos de lembrar
          sempre que precisar.
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 20,
  },

  title: {
    fontSize: 32,
    textAlign: 'center',
    color: colors.heading,
    marginTop: 60,
    fontFamily: fonts.heading,
    lineHeight: 34,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 16,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  image: {
    width: Dimensions.get('window').width * 0.7,
    height: 284,
  },

  button: {
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },

  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  },
});
