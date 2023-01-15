import React, { useState, useEffect } from 'react';

import './App.css';
import LoginForm from './components/LoginForm';
import OrdersPage from './components/OrdersPage';
import { userData } from './models/user-data';

const users: userData[] = [];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {}, []);
  return (
    <div className="App">
      {!isLoggedIn && <LoginForm />}
      {isLoggedIn && <OrdersPage />}
    </div>
  );
}

export default App;
