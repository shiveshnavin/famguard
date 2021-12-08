import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './utils/firebase';
import LoginPage from './ui/LoginPage'
import HomePage from './ui/HomePage'
import { Button, Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';




export default function App() {


  const [user, setUser] = useState(false);
  const [loggedIn, setloggedIn] = useState(true);

  function onAuthStateChanged(user) {
    if (user) {
      console.log(user.displayName)
      setUser(user);
      setloggedIn(true)
    }
    else {
      console.log('User logged out')
      setloggedIn(false)
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);



  return (
    <View style={styles.container}>
      <View style={[{
        width: "100%",
        padding: 20,
        paddingRight: 50,
        flexDirection: "row"
      }]} >

        <Button
          title="Menu"
          size="60"
          type="clear"
          style={{ flex: 1 }}
          icon={
            <Ionicons name="md-checkmark-circle" size={32} />
          }
        />


        <View style={{ justifyContent: "center", flex: 5 }} >
          <Text style={styles.text} > FamGuard </Text>
        </View>


        <Button
          size="60"
          type="clear"
          style={{ flex: 1 }}
          onPress={function () { firebase.logout() }}
          icon={
            <Ionicons name="md-checkmark-circle" size={32} color="red" />
          }
        />
      </View>
      <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View>
      <StatusBar style="auto" />
      {loggedIn ? <HomePage user={user} /> : <LoginPage firebase={firebase} />}
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontFamily: "Helvetica", fontSize: 20, padding: 10, justifyContent: "center", textAlign: 'center' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
});
