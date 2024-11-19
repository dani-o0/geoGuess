import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ title, onPress, width, height }) => {
  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[styles.button, { width, height }]} // Usa la altura si se pasa como prop
    >
      <LinearGradient
        colors={['#FFA500', '#FF4500']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    overflow: 'hidden',
    margin: 10,
  },
  gradient: {
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default Button;
