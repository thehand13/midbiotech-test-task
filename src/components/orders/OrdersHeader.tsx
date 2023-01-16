import React from 'react';
import userData from '../../models/user-data';
import classes from './OrdersHeader.module.css';

const OrdersHeader: React.FC<{ logoutUser: () => void; userInfo: userData }> = (
  props
) => {
  const onClickLogoutHandler = () => {
    props.logoutUser();
  };

  return (
    <header className={classes.header}>
      <div className={classes['user-card']}>
        <div className={classes['user-icon']}></div>
        <div className={classes['user-info']}>
          <h2 className={classes['user-name']}>{props.userInfo.name}</h2>
          <p className={classes['user-email']}>{props.userInfo.email}</p>
        </div>
      </div>
      <button onClick={onClickLogoutHandler} className={classes.exit}>
        Выход
      </button>
    </header>
  );
};

export default OrdersHeader;
