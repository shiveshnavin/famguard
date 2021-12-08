import React, { useContext } from 'react';
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, doc, onSnapshot, getDocs, query, where, updateDoc, orderBy } from "firebase/firestore";


const db = getFirestore();


export default {
    db: db,
    getMembers: async function (familyid, cb) {
        const q = query(collection(db, `famguard/${familyid}/members`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let mems = []
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                mems.push(doc.data())
            });
            if (cb)
                cb(mems)
        });

    },
    getMember: async function (familyid, memid, cb) {
        const q = query(doc(db, `famguard/${familyid}/members/${memid}`));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            if (cb)
                cb(querySnapshot.data())
        });

    },
    getsms: async function (familyid, memid, cb) {
        let ref = collection(db, `famguard/${familyid}/famsms`);
        const q = query(ref, where("memid", "==", memid), orderBy("timeStamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let sms = []
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                sms.push(doc.data())
            });
            if (cb)
                cb(sms)
        });
    },
    endCall: async function (familyid, memid) {
        let ref = doc(db, `famguard/${familyid}/members/${memid}`);
        await updateDoc(ref, {
            "order": "endcall"
        });
    }
};