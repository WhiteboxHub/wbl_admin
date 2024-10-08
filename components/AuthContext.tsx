// import React, { createContext, ReactNode, useContext, useState } from 'react';

// interface AuthState {
//   isAuthenticated: boolean;
//   // Add other authentication-related properties if needed
// }

// interface AuthContextType {
//   auth: AuthState;
//   // Optionally, add methods to modify auth state
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   // Example state; replace with your actual authentication logic
//   const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });

//   return (
//     <AuthContext.Provider value={{ auth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };


'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({ isAuthenticated: false });

  // Define the login and logout functions to modify the auth state
  const login = () => setAuth({ isAuthenticated: true });
  const logout = () => setAuth({ isAuthenticated: false });

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
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
