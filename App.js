import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import CreateTodo from './components/CreateTodo';
import All from './components/All';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="CreateTodo">
          <Stack.Screen name="CreateTodo" component={CreateTodo} options={{headerShown: false}}/>
          <Stack.Screen name="All" component={All} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

