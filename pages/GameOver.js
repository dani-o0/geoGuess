import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../components/Button';

const GameOver = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { finalScore } = route.params;  // Recibir el puntaje final

    // Eliminar los decimales de la puntuación utilizando Math.floor()
    const finalScoreWithoutDecimals = Math.floor(finalScore);

    const handlePlayAgain = () => {
        navigation.navigate('Guess', {
            resetGame: true // Agregar parámetro para reiniciar el juego
        });
    };

    return (
        <View style={styles.mainView}>
            <Text style={styles.gameOverText}>GAME OVER</Text>
            <Text style={styles.yourScoreText}>YOUR SCORE</Text>
            <Text style={styles.scoreText}>{finalScoreWithoutDecimals}</Text>
            <Button title="PLAY AGAIN" onPress={handlePlayAgain} width="60%" height="6%" />
            <Button title="GO BACK MENU" onPress={() => navigation.navigate('Play')} width="60%" height="6%" />
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1F1F1F',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gameOverText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    yourScoreText: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    scoreText: {
        color: '#FFFFFF',
        fontSize: 30,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
});

export default GameOver;
