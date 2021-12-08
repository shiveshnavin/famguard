import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, FlatList, TouchableOpacity, Dimensions, View } from "react-native";
import api from '../utils/api'
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../colors'
const Separator = () => <View style={styles.separator} />;

var colorslist = [];
Colors.colors.forEach(element => {
    colorslist.push(element)
});
var colorMap = {}
function randomColor(id) {
    if (colorMap[id])
        return colorMap[id]
    if (colorslist.length == 0) {
        Colors.colors.forEach(element => {
            colorslist.push(element)
        });
    }
    colorMap[id] = colorslist.pop();
    return colorMap[id];
}
const FamPage = (props) => {
    let [user, setuser] = useState(props.user);
    let [selected, setselected] = useState(false);
    if (!props.user || !props.user.id)
        return (<Text />)
    const [sms, setsms] = useState([]);
    api.getsms(props.famid, props.user.id, msms => setsms(msms))
    api.getMember(props.famid, props.user.id, msms => setuser(msms))

    return (
        <SafeAreaView style={{
            padding: 30,
            justifyContent: "center",
            width: "100%",
            alignItems: 'center',
            margin: 3
        }} >
            <Button
                style={{
                    paddingRight: 50,
                    paddingLeft: 50,
                    margin: 13,
                }}
                title={user.name}
                color="red"
                onPress={() => {

                    props.onclose()

                }}  >
            </Button>
            <Text style={{ fontSize: 15 }} >{user.status}</Text>

            {
                (user.status && user.status.indexOf("call") > -1)
                &&
                <Button
                    style={{
                        paddingRight: 50,
                        paddingLeft: 50,
                        margin: 13,
                    }}
                    title="End Call"
                    color="red"
                    onPress={() => {

                        api.endCall(props.famid, user.id)

                    }}  >
                </Button>
            }

            <Separator />
            <SafeAreaView
                style={{
                    width: "100%",
                    marginTop: 10,
                    justifyContent: "center",
                    alignItems: 'center'
                }}>

                <FlatList
                    style={{
                        padding: 10,
                        width: "100%",
                    }}
                    data={sms}
                    renderItem={({ item }) => {

                        return (
                            <View
                                style={{
                                    width: "100%",
                                    direction: 'column',
                                    padding: 10,
                                    flex: 1,
                                    margin: 3,
                                    borderRadius: 10,
                                    backgroundColor: randomColor(item.id)
                                }}
                            >
                                <Text style={{ fontSize: 25, color: '#000' }}>{item.sender}</Text>
                                <Text style={{ color: '#1a1a1c' }} >{item.message}</Text>
                            </View>

                        )
                    }
                    }
                />
            </SafeAreaView>
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
    separator: {
        marginVertical: 8,
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
});

export default FamPage;