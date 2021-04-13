import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googlProvider } from "./firebase";
// import firebase from 'firebase/app'
const UserContext = createContext();

export const GetContext = () => {
    return useContext(UserContext) || {};
}

export const ContextProvider = ({ children }) => {
    const [checkoutJuiceId, setCheckoutJuiceId] = useState('')
    const [loggedInUser, setLoggedInUser] = useState({});
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    const logOut = () => {
        return auth.signOut();
    }

    const googleSignIn = () => {
        // const provider = new firebase.auth.GoogleAuthProvider();
        return auth.signInWithPopup(googlProvider)
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
        signup,
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