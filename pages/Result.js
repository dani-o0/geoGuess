import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Button from '../components/Button';
import GeoGuessrMap from '../components/Map';

const Result = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { distance, isClose, score, currentQuestionIndex, hasMoreQuestions, correctCoords, selectedCoords } = route.params;

    const [isModalVisible, setIsModalVisible] = useState(false); // Estado para controlar la visibilidad del modal

    const handleNext = () => {
        if (hasMoreQuestions) {
            navigation.navigate('Guess', { questionIndex: currentQuestionIndex + 1 });
        } else {
            navigation.navigate('GameOver', { finalScore: score });
        }
    };

    // Formatear la puntuación sin decimales
    const formattedScore = Math.floor(score);

    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <View style={styles.centerView}>
                    <Text style={styles.questionText}>Resultado</Text>
                    <Text style={styles.farText}>{distance.toFixed(2)} KM FAR</Text>
                </View>
                <GeoGuessrMap 
                    correctCoords={correctCoords} 
                    selectedCoords={selectedCoords} 
                    showCorrectCoords={true}
                    interactive={false}
                    satellite={false}
                />
            </View>

            <View style={styles.bottomView}>
                <Text style={styles.text}>PUNTUACIÓN</Text>
                <Text style={styles.scoreText}>{formattedScore}</Text>

                <Button title={hasMoreQuestions ? "SIGUIENTE" : "FINALIZAR"} onPress={handleNext} width="50%" height="20%"/>
                <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.infoButton}>
                    <Text style={styles.infoButtonText}>¿Cómo funciona la puntuación?</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsModalVisible(false)} // Al cerrar el modal
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>¿Cómo se calcula la puntuación?</Text>
                        <Text style={styles.modalText}>
                            La puntuación se calcula con una fórmula exponencial basada en la distancia entre tu ubicación seleccionada y la ubicación correcta.
                        </Text>
                        <Text style={styles.modalText}>
                            A mayor distancia, menor será la puntuación. ¡Intenta acercarte lo más posible!
                        </Text>
                        <Text style={styles.modalText}>
                            Fórmula: Puntuación = 1000 * e^(-distancia / 2000)
                        </Text>

                        <Button title="Cerrar" onPress={() => setIsModalVisible(false)} width="60%" height="10%" />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#1F1F1F',
    },
    topView: {
        flex: 1,
        flexGrow: 3,
        backgroundColor: '#1F1F1F',
    },
    centerView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomView: {
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
    },
    scoreText: {
        color: '#FFFFFF',
        fontSize: 35,
        fontWeight: 'bold',
    },
    questionText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    farText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    infoButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#333333',
        borderRadius: 5,
    },
    infoButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#1F1F1F',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default Result;
