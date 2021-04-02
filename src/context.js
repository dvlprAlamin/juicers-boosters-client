import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import firebase from 'firebase/app'
const UserContext = createContext();

export const GetContext = () => {
    return useContext(UserContext) || {};
}

export const ContextProvider = ({ children }) => {
    const [checkoutJuiceId, setCheckoutJuiceId] = useState('')
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logOut = () => {
        return auth.signOut();
    }

    const googleSignIn = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(provider)
    }
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setLoggedInUser(user)
            setLoading(false)
        })
        return unsubscribe;
    }, []);

    const value = {
        checkoutJuiceId,
        setCheckoutJuiceId,
        loggedInUser,
        setLoggedInUser,
        login,
        googleSignIn,
        logOut
    }
    return (
        <UserContext.Provider value={value}>
            {!loading && children}
        </UserContext.Provider>
    )
}