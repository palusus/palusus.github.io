import React, { useContext } from "react";

export const Auth0Context = React.createContext({ loading: true });
export const useAuth0 = () => useContext(Auth0Context);
export const Auth0Provider = ({ children }) => children;
