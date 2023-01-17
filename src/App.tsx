import React, { useState, useEffect } from 'react';

import './App.css';
import LoginForm from './components/login/LoginForm';
import OrdersPage from './components/orders/OrdersPage';
import userData from './models/user-data';

const noUserInfo: userData = {
  email: null,
  password: null,
  name: null,
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(noUserInfo);

  useEffect(() => {
    const savedLoginInfo = localStorage.getItem('userInfo');
    if (savedLoginInfo) {
      try {
        setUserInfo(JSON.parse(savedLoginInfo));
        setIsLoggedIn(true);
      } catch (error) {
        localStorage.removeItem('userInfo');
      }
    }
  }, []);

  const loginUser = (loggedUserInfo: userData) => {
    localStorage.setItem('userInfo', JSON.stringify(loggedUserInfo));
    setUserInfo(loggedUserInfo);
    setIsLoggedIn(true);
  };
  const logoutUser = () => {
    localStorage.removeItem('userInfo');
    setUserInfo(noUserInfo);
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn && <LoginForm loginUser={loginUser} />}
      {isLoggedIn && <OrdersPage logoutUser={logoutUser} userInfo={userInfo} />}
    </div>
  );
};

export default App;
