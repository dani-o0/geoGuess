import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../components/Button';

const Play = () => {
    const navigation = useNavigation();
    return (
    <View style={styles.mainView}>
        <Text style={styles.text}>GEOGUESS</Text>
        <Button title="PLAY" onPress={() => navigation.navigate('Guess')} width="50%" height="7%" />
    </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#1F1F1F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 50,
        fontWeight: 'bold',
        paddingVertical: 10,
    }
});

export default Play;