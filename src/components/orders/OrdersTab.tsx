import React, { useState, useEffect } from 'react';

import orderData from '../../models/order-data';
import sortData from '../../models/sort-data';
import classes from './OrdersTab.module.css';

const sortValues: sortData[] = [
  { id: 0, value: 'number', text: 'По номеру заказа' },
  { id: 1, value: 'email', text: 'По email заказчика' },
  { id: 2, value: 'totalPrice', text: 'По цене заказа' },
  { id: 3, value: 'date', text: 'По дате заказа' },
];

const initialOrderList: orderData[] = [];

const OrdersTab: React.FC = () => {
  const [orderList, setOrderList] = useState(initialOrderList);
  const [orderListIsEmpty, setOrderListIsEmpty] = useState(true);
  const [orderListWasChanged, setOrderListWasChanged] = useState(0);
  const [viewCouner, setViewCounter] = useState(1);
  const [viewedList, setViewedList] = useState(initialOrderList);
  const [showMoreButton, setShowMoreButton] = useState(true);

  useEffect(() => {
    (async () => {
      const fetchOrders = await fetch(
        'https://midbiotech-test-task-ca390-default-rtdb.europe-west1.firebasedatabase.app/orders.json'
      );
      if (fetchOrders.ok) {
        const responseData = await fetchOrders.json();
        const newOrderList: orderData[] = responseData.map(
          (responseItem: orderData) => {
            return {
              id: responseItem.id,
              email: responseItem.email,
              amount: responseItem.amount,
              date: new Date(responseItem.date),
            };
          }
        );
        setOrderList(newOrderList);
        setOrderListWasChanged((prev) => prev + 1);
        if (responseData.length) {
          setOrderListIsEmpty(false);
        }
      }
    })();
  }, []);

  useEffect(() => {
    const numberOfViewedItems = viewCouner * 5;
    const newViewedListArray = [];

    if (orderList.length >= numberOfViewedItems) {
      for (let i = 0; i < numberOfViewedItems; i++) {
        newViewedListArray.push(orderList[i]);
      }
      setViewedList(newViewedListArray);
      if (orderList.length === numberOfViewedItems) {
        setShowMoreButton(false);
      }
    }
  }, [viewCouner, orderListWasChanged]);

  const onMoreClickHandler = () => {
    setViewCounter((prev) => prev + 1);
  };

  const onChangeSelectHandler = (event: any) => {
    let newOrderList = orderList.map((responseItem: orderData) => {
      return {
        id: responseItem.id,
        email: responseItem.email,
        amount: responseItem.amount,
        date: responseItem.date,
      };
    });
    if (event.target.value === 'number') {
      newOrderList = newOrderList.sort(
        (first: orderData, second: orderData) => {
          return first.id - second.id;
        }
      );
    } else if (event.target.value === 'email') {
      newOrderList = newOrderList.sort(
        (first: orderData, second: orderData) => {
          if (first.email > second.email) {
            return 1;
          } else if (first.email < second.email) {
            return -1;
          } else {
            return 0;
          }
        }
      );
    } else if (event.target.value === 'totalPrice') {
      newOrderList = newOrderList.sort(
        (first: orderData, second: orderData) => {
          return first.amount - second.amount;
        }
      );
    } else if (event.target.value === 'date') {
      newOrderList = newOrderList.sort(
        (first: orderData, second: orderData) => {
          return first.date.getTime() - second.date.getTime();
        }
      );
    }
    setOrderList(newOrderList);
    setOrderListWasChanged((prev) => prev + 1);
  };

  return (
    <section className={classes['orders-tab']}>
      <header className={classes['tab-header']}>
        <h1 className={classes['list-name']}>Заказы</h1>
        <select
          className={classes['sort-select']}
          name="select sort method"
          onChange={onChangeSelectHandler}
        >
          {sortValues.map((option) => (
            <option
              className={classes['sort-option']}
              key={option.id}
              value={option.value}
            >
              {option.text}
            </option>
          ))}
        </select>
      </header>
      <div></div>
      {orderListIsEmpty && (
        <h1 className={classes['no-orders']}>Заказов нет</h1>
      )}
      {!orderListIsEmpty && (
        <ul className={classes['orders-list']}>
          <li className={classes['header-item']}>
            <div className={classes['list-item-id']}>Номер заказа</div>
            <div className={classes['list-item-email']}>Email</div>
            <div className={classes['list-item-amount']}>Сумма</div>
            <div className={classes['list-item-date']}>Дата</div>
          </li>
          {viewedList.map((listItem) => (
            <li className={classes['list-item']} key={listItem.id}>
              <div className={classes['list-item-id']}>{listItem.id}</div>
              <div className={classes['list-item-email']}>{listItem.email}</div>
              <div className={classes['list-item-amount']}>
                {listItem.amount}
              </div>
              <div className={classes['list-item-date']}>
                {listItem.date.getDate()}.{listItem.date.getMonth() + 1}.
                {listItem.date.getFullYear()}
              </div>
            </li>
          ))}
        </ul>
      )}
      {!orderListIsEmpty && showMoreButton && (
        <div className={classes['more-button-container']}>
          <button
            onClick={onMoreClickHandler}
            className={classes['more-button']}
          >
            Показать ещё...
          </button>
        </div>
      )}
    </section>
  );
};

export default OrdersTab;
