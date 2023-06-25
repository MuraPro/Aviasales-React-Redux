/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import ItemCard from '../Item-list-card/Item-list-card';
import { filterTickets } from '../../utils';
import { SortButtons, ShowTicketsButton } from '../Item-buttons';
import ErrorIndicator from '../Error-indicator';
import WarningMsg from '../item-alert';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './Item-list.module.scss';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';

function ItemList() {
  const usedcheckbox = useSelector((state) => state.checkboxs.usedcheckbox);
  const { loading, error, limit, offset, tickets } = useSelector((state) => state.tickets);

  //! Фильтрация билетов =>>>
  const visibleTickets = filterTickets(tickets, usedcheckbox);

  //! Условия отображения елементов компанента ItemList: =>>>
  const sortTicketsButtons = <SortButtons />;
  const content = error ? (
    <ErrorIndicator />
  ) : (
    visibleTickets
      .map((ticket) => <ItemCard key={ticket.id} ticket={ticket} />)
      .slice(offset, limit)
  );

  const showTicketButton = tickets.length > limit &&
    !error &&
    !Object.values(usedcheckbox).every((i) => i === false) && <ShowTicketsButton />;

  const warningMsg = Object.values(usedcheckbox).every((i) => i === false)
    ? !error && <WarningMsg />
    : null;

  const antIcon = <LoadingOutlined className={classes.Loading} spin />;
  const spinner = loading
    ? !error && (
        <div className={classes.Container}>
          <Spin indicator={antIcon} />
        </div>
      )
    : null;

  return (
    <div className={classes.Tickets}>
      {sortTicketsButtons}
      {spinner}
      {content}
      {warningMsg}
      {showTicketButton}
    </div>
  );
}

export default ItemList;
