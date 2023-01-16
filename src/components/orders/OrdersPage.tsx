import React from 'react';
import userData from '../../models/user-data';
import OrdersHeader from './OrdersHeader';
import OrdersTab from './OrdersTab';

const OrdersPage: React.FC<{ logoutUser: () => void; userInfo: userData }> = (
  props
) => {
  return (
    <>
      <OrdersHeader logoutUser={props.logoutUser} userInfo={props.userInfo} />
      <OrdersTab />
    </>
  );
};

export default OrdersPage;
