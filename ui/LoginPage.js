import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput } from "react-native";
import { Button, Icon } from 'react-native-elements';

const LoginPage = (props) => {
  const [email, changeEmail] = React.useState("");
  const [password, changePassword] = React.useState("");


  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={changeEmail}
        placeholder="email"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={changePassword}
        value={password}
        placeholder="password"
        secureTextEntry={true}
      />
      <Button 
        title="Login"
        onPress={() => {
        props.firebase.login(email, password);
      }} />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginPage;