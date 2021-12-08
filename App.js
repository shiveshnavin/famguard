import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
        flexDirection: "row"
      }]} >
        <TouchableOpacity onPress={function () { }}  >
          <Ionicons name="menu" size={32} color="black" />
        </TouchableOpacity>

        <View style={{ justifyContent: "center", alignContent: "center", flex: 5 }} >
          <Text style={styles.text} > FamGuard </Text>
        </View>


        <TouchableOpacity onPress={function () { firebase.logout() }}  >
          <Ionicons name="exit-outline" size={32} color="red" />
        </TouchableOpacity>
      </View>
      {/* <View style={{ width: "100%", flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
      </View> */}

      {loggedIn ? <HomePage user={user} /> : <LoginPage firebase={firebase} />}
    </View>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 20, padding: 10, justifyContent: "center", textAlign: 'center' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
});
