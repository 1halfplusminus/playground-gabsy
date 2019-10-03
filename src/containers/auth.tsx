import { createContext, useEffect, useState } from "react";
import { Firebase } from "../services/firebase";

export type AuthStatus = "logged" | "not_logged" | "unknown";
export interface User {
  email: string;
  name: string;
}
export interface AuthProps {
  uid: string;
  isAnonymous?: boolean | undefined;
  authStatus: AuthStatus;
  isLoggedIn: boolean;
  user?: User;
}

const initialState: AuthProps = {
  uid: "",
  isAnonymous: undefined,
  authStatus: "unknown",
  isLoggedIn: false,
};

export const useAuth = (provider: Firebase) => {
  const { auth } = provider;
  const FireBaseProviver = createContext(provider);
  const [{ uid, authStatus, isLoggedIn, user }, setState] = useState(
    initialState,
  );
  const signIn = (firebaseUser: firebase.User) => {
    const { uid: firebaseUid, isAnonymous } = firebaseUser;
    setState({
      uid: firebaseUid,
      isAnonymous,
      authStatus: "logged",
      user: {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
      },
      isLoggedIn: true,
    });
  };
  const signOut = () => {
    setState({
      ...initialState,
      authStatus: "not_logged",
    });
  };
  const handleSignIn: (
    provider: "google" | "anomymous",
  ) => Promise<string> = async (authProvider) => {
    switch (authProvider) {
      case "google":
        try {
          return auth().signInWithPopup(new auth.GoogleAuthProvider());
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          // TODO: notify the user of the error
          return error;
        }
      case "anomymous":
        try {
          return auth().signInAnonymously();
        } catch (error) {
          console.error(error);
          return error;
        }
      default:
        const reason = "Invalid provider passed to signIn method";
        console.error(reason);
        return Promise.reject(reason);
    }
  };
  const handleSignOut = async () => {
    return auth().signOut();
  };

  useEffect(() => {
    const stopAuthListener = auth().onAuthStateChanged((firebaseUser) => {
      console.log(firebaseUser, "checkuser");
      if (firebaseUser) {
        signIn(firebaseUser);
      } else {
        signOut();
      }
    });
    return () => {
      stopAuthListener();
    };
  }, []);

  return {
    handleSignIn,
    handleSignOut,
    uid,
    FireBaseProviver,
    authStatus,
    isLoggedIn,
    user,
  };
};
