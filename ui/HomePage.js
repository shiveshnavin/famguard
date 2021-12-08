import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList } from "react-native";
import api from '../utils/api'
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const HomePage = (props) => {
  let user = props.user;
  const [memebers, setmembers] = useState([]);
  api.getMembers("swatiniwas").then(mems => setmembers(mems))

  return (
    <SafeAreaView style={styles.container} >
      <Text style={{ fontSize: 20 }} >Welcome {user.displayName} !</Text>
      <Text style={{ fontSize: 10 }} >There are {memebers.length} members in your family.</Text>
      <SafeAreaView>

        <FlatList
          contentContainerStyle={styles.list}
          data={memebers}
          renderItem={({ item }) => {

            return (
              <Button
                size="60"
                title={item.name}
                type="clear"
                style={{ flex: 1, flexDirection: "column" }}
                onPress={function () { firebase.logout() }}
                icon={
                  <Ionicons
                    name="md-checkmark-circle"
                    size={32}
                    color="red"
                  />
                }
              />
            )
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  item: {
    backgroundColor: 'red',
    margin: 31,
    width: 100
  }
});

export default HomePage;