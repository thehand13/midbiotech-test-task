import React from 'react';
import classes from './LoginForm.module.css';

const LoginForm = () => {
  const onSubmitLoginHandler = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <form className={classes['login-form']} onSubmit={onSubmitLoginHandler}>
      <input placeholder="Email" />
      <input placeholder="Пароль" />
      <button className={classes.enter}>ВОЙТИ</button>
      <button className={classes.forget} type="button">
        Забыли пароль?
      </button>
    </form>
  );
};

export default LoginForm;
