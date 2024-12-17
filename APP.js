import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.myComponent}>
        <Text style={styles.text}>Hello, JSX!</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  myComponent: {
    padding: 20,
    backgroundColor: '#e9ecef',
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    color: '#343a40',
  },
});

export default App;