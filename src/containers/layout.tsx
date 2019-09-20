import { PropsWithChildren, ReactNode } from "react";
import Layout from "../components/layout";
import firebase from "../services/firebase";
import { useAuth } from "./auth";

const ConnectedLayout = ({
  renderChildren,
}: {
  renderChildren: (props: ReturnType<typeof useAuth>) => ReactNode,
}) => {
  const {
    handleSignIn,
    isLoggedIn,
    authStatus,
    handleSignOut,
    ...rest
  } = useAuth(firebase);
  return (
    <Layout isLoggedIn={isLoggedIn} onLogout={handleSignOut}>
      {renderChildren({
        handleSignIn,
        isLoggedIn,
        authStatus,
        handleSignOut,
        ...rest,
      })}
    </Layout>
  );
};

export default ConnectedLayout;
