import React, { useContext } from 'react';
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";


const db = getFirestore();



export default {
    db: db,
    getMembers: async function (familyid) {
        const querySnapshot = await getDocs(collection(db, `famguard/${familyid}/members`));
        let mems = []
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            mems.push(doc.data())
        });
        return mems
    }
};