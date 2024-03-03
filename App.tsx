import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./src/screens/LoginScreen.tsx";
import MainScreen from "./src/screens/MainScreen.tsx";
import QrWidgetPreview from "./src/screens/QrWidgetPreview.tsx";


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ headerShown: false }} // 헤더 숨기기
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Qr" component={QrWidgetPreview} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
// });

export default App;
