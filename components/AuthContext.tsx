// import { createContext, ReactNode, Context } from 'react';
// import { useState } from 'react';

// // Define the type for your context value. For now, you might set it to `unknown` or `any`
// // if you haven't defined the exact shape yet.
// interface AuthContextType {
//   // Define the properties and methods you want in the context
//   isAuthenticated: boolean;
//   user: string | null;
//   login: (user: string) => void;
//   logout: () => void;
// }

// // Create a default context value
// const defaultAuthContextValue: AuthContextType = {
//   isAuthenticated: false,
//   user: null,
//   login: () => {},
//   logout: () => {},
// };

// // Create the context with a default value
// export const AuthContext: Context<AuthContextType> = createContext<AuthContextType>(defaultAuthContextValue);

// // You might also export a provider component to wrap your app
// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   // Define the context value
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
//   const [user, setUser] = useState<string | null>(null);

//   const login = (userName: string) => {
//     setIsAuthenticated(true);
//     setUser(userName);
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   const value = {
//     isAuthenticated,
//     user,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  // Add other authentication-related properties if needed
}

interface AuthContextType {
  auth: AuthState;
  // Optionally, add methods to modify auth state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Example state; replace with your actual authentication logic
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });

  return (
    <AuthContext.Provider value={{ auth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
