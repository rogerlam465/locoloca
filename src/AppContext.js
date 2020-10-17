import React, { createContext, useEffect, useState } from 'react';
import withFirebaseAuth from "react-with-firebase-auth";
import * as firebase from "firebase";
import "firebase/auth";

export const AppContext = createContext(null);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

const AppProvider = ({ children, signInWithGoogle }) => {
  return (
    <AppContext.Provider value={{ signInWithGoogle }}>
      {children}
    </AppContext.Provider>
  )
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(AppProvider);