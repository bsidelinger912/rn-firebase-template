import React, {createContext, PropsWithChildren, useContext} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export interface AuthContext {
  user: FirebaseAuthTypes.User;
}

export interface Props {
  user: FirebaseAuthTypes.User;
}

const Context = createContext<Partial<AuthContext>>({});

export const useAuth = () => useContext<AuthContext>(Context as any); // TODO: make this better

const AuthProvider: React.FC<PropsWithChildren<Props>> = ({children, user}) => {
  return <Context.Provider value={{user}}>{children}</Context.Provider>;
};

export default AuthProvider;
