import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

export default function useFirestore() {
    let getCollection = (colName) => {
        let [error, setError] = useState("");
        let [loading, setLoading] = useState(false);
        let [data, setData] = useState([]);

        useEffect(function () {
            setLoading(true);
            let ref = collection(db, colName);
            let q = query(ref, orderBy("date", "desc"));

            //Real time
            onSnapshot(q, (docs) => {
                if (docs.empty) {
                    setError("No documents found");
                    setLoading(false);
                } else {
                    let collectionDatas = [];
                    docs.forEach((doc) => {
                        let document = { id: doc.id, ...doc.data() };
                        collectionDatas.push(document);
                    });
                    setData(collectionDatas);
                    setLoading(false);
                    setError("");
                }
            });
        }, []);
        return { error, loading, data };
    };

    let getDocument = (colName, id) => {
        let [error, setError] = useState("");
        let [loading, setLoading] = useState(false);
        let [data, setData] = useState(null);

        useEffect(() => {
            setLoading(true);

            let ref = doc(db, colName, id);
            onSnapshot(ref, (doc) => {
                // console.log(doc.exists());
                if (doc.exists()) {
                    let document = { id: doc.id, ...doc.data() };
                    setData(document);
                    setLoading(false);
                    setError("");
                } else {
                    setError("No document found");
                    setLoading(false);
                }
            });
        }, [id]);

        return { error, loading, data };
    };

    let addCollection = async (colName, data) => {
        data.date = serverTimestamp();
        let ref = collection(db, colName);
        return addDoc(ref, data);
    };

    let deleteDocument = async (colName, id) => {
        let ref = doc(db, colName, id);
        return deleteDoc(ref); //backend delete
        // setBooks((prev) => prev.filter((b) => b.id !== id)); //frontend delete
    };

    let updateDocument = async (colName, id, data) => {
        data.date = serverTimestamp();
        let ref = doc(db, colName, id);
        return updateDoc(ref, data);
    };

    return { getCollection, getDocument, addCollection, deleteDocument, updateDocument };
}
