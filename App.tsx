import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';


import Navbar from './mainPages/Navbar'
export default function App() {
  return (
    <NavigationContainer>
      <Navbar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
