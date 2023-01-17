import React, { useState, useEffect } from 'react';
import userData from '../../models/user-data';

import classes from './LoginForm.module.css';

const LoginForm: React.FC<{ loginUser: (loggedUserInfo: userData) => void }> = (
  props
) => {
  const [emailState, setEmailState] = useState('');
  const [passwordState, setPasswordState] = useState('');

  const [loginWarning, setLoginWarning] = useState(false);
  const [lowerStringState, setLowerStringState] = useState('Забыли пароль?');

  useEffect(() => {
    if (loginWarning) {
      const timerId = setTimeout(() => {
        setLowerStringState('Забыли пароль?');
        setLoginWarning(false);
      }, 2000);
      return () => {
        clearInterval(timerId);
      };
    }
  }, [loginWarning]);

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
      try {
        const fetchUsers = await fetch(
          'https://midbiotech-test-task-ca390-default-rtdb.europe-west1.firebasedatabase.app/users.json'
        );
        if (fetchUsers.ok) {
          const fetchedUsers = await fetchUsers.json();
          let successfulLogin = false;
          fetchedUsers.forEach((fetchedUser: userData) => {
            if (
              fetchedUser.email === emailState &&
              fetchedUser.password === passwordState
            ) {
              props.loginUser(fetchedUser);
              successfulLogin = true;
            }
          });
          if (!successfulLogin) {
            setLowerStringState(`Неверный логин и/или пароль`);
            setLoginWarning(true);
          }
        }
      } catch (error) {
        setLowerStringState('Плохое подключение к интернету');
        setLoginWarning(true);
      }
    })();
  };
  return (
    <>
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

        <button
          className={!loginWarning ? classes.forget : classes.warning}
          type="button"
        >
          {lowerStringState}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
