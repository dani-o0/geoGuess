import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import play from './pages/Play';
import guess from './pages/Guess';
import result from './pages/Result';
import gameover from './pages/GameOver';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Play">
        <Stack.Screen name="Play" component={play} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="Guess" component={guess} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="Result" component={result} options={{ headerShown: false ,  animation: 'none'}}/>
        <Stack.Screen name="GameOver" component={gameover} options={{ headerShown: false ,  animation: 'none'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;