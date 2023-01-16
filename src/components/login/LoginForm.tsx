import React, { useState, useEffect } from 'react';
import userData from '../../models/user-data';

import classes from './LoginForm.module.css';

const LoginForm: React.FC<{ loginUser: (loggedUserInfo: userData) => void }> = (
  props
) => {
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const onChangeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailState(event.target.value);
  };

  const onChangePasswordHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordState(event.target.value);
  };

  const onSubmitLoginHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    (async () => {
      const fetchUsers = await fetch(
        'https://morinformsystem-test-task-default-rtdb.europe-west1.firebasedatabase.app/users.json'
      );
      if (fetchUsers.ok) {
        const fetchedUsers = await fetchUsers.json();
        fetchedUsers.forEach((fetchedUser: userData) => {
          if (
            fetchedUser.email === emailState &&
            fetchedUser.password === passwordState
          ) {
            props.loginUser(fetchedUser);
          }
        });
      }
    })();
  };
  return (
    <form className={classes['login-form']} onSubmit={onSubmitLoginHandler}>
      <input
        type="email"
        required
        placeholder="Email"
        value={emailState}
        onChange={onChangeEmailHandler}
      />
      <input
        type="password"
        required
        placeholder="Пароль"
        value={passwordState}
        onChange={onChangePasswordHandler}
      />
      <button className={classes.enter}>Войти</button>
      <button className={classes.forget} type="button">
        Забыли пароль?
      </button>
    </form>
  );
};

export default LoginForm;
