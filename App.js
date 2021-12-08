import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from './utils/firebase';
import LoginPage from './ui/LoginPage'
import HomePage from './ui/HomePage'
import { Button, Icon } from 'react-native-elements';




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
        padding: "2vh",
        paddingRight: "5vh",
        flexDirection: "row"
      }]} >

        <Button
          size="6vh"
          type="clear"
          style={{ flex: 1 }}
          icon={
            <Icon
              size="6vh"
              name='apps' />
          }
        />


        <View style={{ justifyContent: "center", flex: 5 }} >
          <Text style={styles.text}> FamGuard </Text>
        </View>


        <Button
          size="6vh"
          type="clear"
          style={{ flex: 1 }}
          onPress={function () { firebase.logout() }}
          icon={
            <Icon
              name="logout"
              size="5vh"
              color="red"
            />
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
  text: { fontFamily: "Helvetica", fontSize: 10, padding: "1vh", justifyContent: "center", textAlign: 'center' },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
