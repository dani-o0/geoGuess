import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { firestore } from '../components/FirebaseConfig'; // Importar Firestore
import { collection, getDocs } from 'firebase/firestore'; // Funciones de Firestore

import Button from '../components/Button';
import GeoGuessrMap from '../components/Map';

const Guess = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [score, setScore] = useState(0);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [correctCoords, setCorrectCoords] = useState(null);

    // Reiniciar las coordenadas seleccionadas cuando cambie la pregunta
    useEffect(() => {
        if (route.params?.questionIndex !== undefined) {
            setCurrentQuestionIndex(route.params.questionIndex);
            setSelectedCoords(null);
        }
    }, [route.params?.questionIndex]);

    // Cargar preguntas desde Firestore y desordenarlas
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'questions'));
                const questionsData = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        title: data.title,
                        lat: data.location.latitude,
                        lon: data.location.longitude,
                    };
                });

                // Desordenar las preguntas aleatoriamente (Fisher-Yates)
                for (let i = questionsData.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [questionsData[i], questionsData[j]] = [questionsData[j], questionsData[i]];
                }

                setQuestions(questionsData);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar las preguntas:", error);
            }
        };

        fetchQuestions();
    }, []); // Esto se ejecutará solo al cargar la primera vez

    // Reiniciar el juego y desordenar las preguntas cada vez que se inicie una nueva partida
    useEffect(() => {
        if (route.params?.resetGame) {
            setScore(0);
            setCurrentQuestionIndex(0);
            setSelectedCoords(null);
            setCorrectCoords(null);

            // Desordenar las preguntas nuevamente al comenzar una nueva partida
            const fetchQuestions = async () => {
                try {
                    const querySnapshot = await getDocs(collection(firestore, 'questions'));
                    const questionsData = querySnapshot.docs.map(doc => {
                        const data = doc.data();
                        return {
                            id: doc.id,
                            title: data.title,
                            lat: data.location.latitude,
                            lon: data.location.longitude,
                        };
                    });

                    // Desordenar las preguntas
                    for (let i = questionsData.length - 1; i > 0; i--) {
                        const j = Math.floor(Math.random() * (i + 1));
                        [questionsData[i], questionsData[j]] = [questionsData[j], questionsData[i]];
                    }

                    setQuestions(questionsData);
                    setLoading(false);
                } catch (error) {
                    console.error("Error al cargar las preguntas:", error);
                }
            };

            fetchQuestions();
        }
    }, [route.params?.resetGame]); // Ejecutamos cuando el juego se reinicia

    // Calcular distancia en km entre dos puntos usando fórmula de Haversine
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Retorna la distancia en km
    };

    // Calcular la puntuación exponencial en función de la distancia
    const calculateScore = (distance) => {
        const maxScore = 1000; // Puntuación máxima
        const decayFactor = 2000; // Factor de decaimiento que controla la rapidez con la que baja el puntaje

        // Calcular la puntuación usando la fórmula exponencial
        return Math.max(maxScore * Math.exp(-distance / decayFactor), 0);
    };

    const handleAnswer = () => {
        if (!selectedCoords) {
            alert("Por favor, selecciona una ubicación en el mapa.");
            return;
        }
    
        // Extrae las coordenadas seleccionadas
        const { longitude: userLon, latitude: userLat } = selectedCoords;
        const currentQuestion = questions[currentQuestionIndex];
    
        // Calcular la distancia
        const distance = calculateDistance(currentQuestion.lat, currentQuestion.lon, userLat, userLon);
        
        // Calcular la puntuación basada en la distancia
        const points = calculateScore(distance);

        // Actualizar el puntaje acumulado
        const newScore = score + points;

        // Navegar a la pantalla de resultados y pasar los datos necesarios
        navigation.navigate('Result', {
            distance,
            points,
            score: newScore,
            currentQuestionIndex,
            hasMoreQuestions: currentQuestionIndex < questions.length - 1,
            correctCoords: { latitude: currentQuestion.lat, longitude: currentQuestion.lon }, // Enviar en formato adecuado
            selectedCoords: { latitude: userLat, longitude: userLon } // Enviar en formato adecuado
        });
        
        setScore(newScore);
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <View style={styles.mainView}>
            <View style={styles.topView}>
                <View style={styles.centerView}>
                    <Text style={styles.guessText}>GUESS: {currentQuestionIndex + 1}/{questions.length}</Text>
                    <Text style={styles.questionText}>{currentQuestion.title}</Text>
                </View>
                <GeoGuessrMap 
                    onLocationSelect={setSelectedCoords}
                    selectedCoords={selectedCoords}
                />
            </View>
            <View style={styles.bottomView}>
                <Button title="GUESS" onPress={handleAnswer} width="50%" height="40%"/>
            </View>
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
    guessText: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    questionText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: 'bold',
        paddingBottom: 10,
    },
    bottomView: {
        height: '15%',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Guess;
