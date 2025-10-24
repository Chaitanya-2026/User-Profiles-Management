import React, { useState, useEffect } from "react";
import Auth from "./components/Auth";
import UserList from "./components/UserList";
import { getAuthUser } from "./utils/localStorage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (getAuthUser()) setIsAuthenticated(true);
  }, []);

  return isAuthenticated ? (
    <UserList />
  ) : (
    <Auth onAuthSuccess={() => setIsAuthenticated(true)} />
  );
}

export default App;
