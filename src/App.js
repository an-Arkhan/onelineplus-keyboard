import React, { useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import './styles/App.css';
import { AuthContext } from "./contexts/AuthContext";

export const App = () => {
  const [auth, setAuth] = useState(null);

  const authContextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  const paths = [
    {
      path: "/",
      element: (
        <Dashboard />
      ),
    }
  ];

  return (
    <AuthContext.Provider value={authContextValue}>
      <Routes>
        {paths.map((item, index) => (
        <Route key={index} {...item} />
        ))}
      </Routes>
    </AuthContext.Provider>
  );
};

export default App;
