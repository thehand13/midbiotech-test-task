import React, { useState, useEffect } from 'react';

import './App.css';
import LoginForm from './components/login/LoginForm';
import OrdersPage from './components/orders/OrdersPage';
import userData from './models/user-data';

const nullUserInfo: userData = {
  email: null,
  password: null,
  name: null,
};

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(nullUserInfo);

  const loginUser = (loggedUserInfo: userData) => {
    setUserInfo(loggedUserInfo);
    setIsLoggedIn(true);
  };
  const logoutUser = () => {
    setUserInfo(nullUserInfo);
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
