import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const userCollectionRef = collection(db, "users");
class UserDataService {
    addUser = (newUser) => {
        return addDoc(userCollectionRef, newUser);
    }

    updateUser = (id, updatedUser) => {
        const userDoc = doc(db, "users", id);
        return updateDoc(userDoc, updatedUser);
    }

    deleteUser = (id) => {
        const userDoc = doc (db, "users", id);
        return deleteDoc(userDoc);
    }

    getAllUsers = () => {
        return getDocs(userCollectionRef);
    }

    getUser = (id) => {
        const userDoc = doc(db, "users", id);
        return getDoc(userDoc)
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new UserDataService();