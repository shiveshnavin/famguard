import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions, ScrollView } from "react-native";
import api from '../utils/api'
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import FamPage from './FamPage'
import Colors from '../colors'

var colorMap = {}
function randomColor(id) {
  if (colorMap[id])
    return colorMap[id]
  colorMap[id] = Colors.colors.pop();
  return colorMap[id];
}
const HomePage = (props) => {
  let user = props.user;
  const [memebers, setmembers] = useState([]);
  const [selectedfam, setselectedfam] = useState({});
  let famid = "swatiniwas";
  api.getMembers(famid, mems => setmembers(mems))

  return (
    <SafeAreaView style={styles.container} >

      {
        selectedfam && selectedfam.id != undefined ? (<FamPage user={selectedfam} famid={famid} onclose={function () {
          setselectedfam({})
        }} />) : (
          <SafeAreaView

            style={{
              marginTop: 10,
              justifyContent: "center",
              width: "100%",
              alignItems: 'center',
              direction: "column"
            }}>
            <Text style={{ fontSize: 20 }} >Welcome {user.displayName} !</Text>
            <Text style={{ fontSize: 10 }} >There are {memebers.length} members in your family.</Text>

            <FlatList
              width="100%"
              numColumns={2}
              data={memebers}
              renderItem={({ item }) => {

                return (
                  <TouchableOpacity
                    style={{
                      padding: 40,
                      justifyContent: "center",
                      alignItems: 'center',
                      flex: 1,
                      margin: 3,
                      borderRadius: 10,
                      backgroundColor: '#fafafa'
                    }}
                    onPress={function () { setselectedfam(item) }}
                  >
                    <Ionicons name="person-circle-outline" size={48} color={randomColor(item.id)} />
                    <Text style={{ color: randomColor(item.id) }}>{item.name}</Text>
                  </TouchableOpacity>

                )
              }
              }
            />

          </SafeAreaView>
        )
      }
    </SafeAreaView >
  );
};

const size = Dimensions.get('window').width / 3;

const styles = StyleSheet.create({
  itemContainer: {
    width: size,
    height: size,
  },
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
  },

  GridViewBlockStyle: {

    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00BCD4'

  }
  ,

  GridViewInsideTextItemStyle: {

    color: '#fff',
    padding: 10,
    fontSize: 18,
    justifyContent: 'center',

  },
});

export default HomePage;