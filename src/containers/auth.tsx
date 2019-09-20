import { createContext, useEffect, useState } from "react";
import { Firebase } from "../services/firebase";

export type AuthStatus = "logged" | "not_logged" | "unknown";

export interface AuthProps {
  uid: string;
  isAnonymous?: boolean | undefined;
  authStatus: AuthStatus;
  isLoggedIn: boolean;
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
  const [{ uid, authStatus, isLoggedIn }, setState] = useState(initialState);
  const signIn = (user: firebase.User) => {
    const { uid, isAnonymous } = user;
    setState({ uid, isAnonymous, authStatus: "logged", isLoggedIn: true });
  };
  const signOut = () => {
    setState({
      ...initialState,
      authStatus: "not_logged",
    });
  };
  const handleSignIn: (
    provider: "google" | "anomymous",
  ) => Promise<string> = async (provider) => {
    switch (provider) {
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
        } catch (error_1) {
          console.error(error_1);
          return error_1;
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
    const stopAuthListener = auth().onAuthStateChanged((user) => {
      console.log(user, "checkuser");
      if (user) {
        signIn(user);
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
  };
};
