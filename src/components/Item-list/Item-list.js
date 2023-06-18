/* eslint-disable */
import React from 'react';
import { useSelector } from 'react-redux';
import { sortTickets, filterTickets, transformTickets } from '../../utils';
import ItemCard from '../Item-list-card/Item-list-card';
import { SortButtons, ShowTicketsButton } from '../Item-buttons';
import ErrorIndicator from '../Error-indicator';
import WarningMsg from '../item-alert';
import uniqueKey from '../../utils/uniqueKey';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './Item-list.module.scss';

function ItemList() {
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const limit = useSelector((state) => state.tickets.limit);
  const tickets = useSelector((state) => state.tickets.tickets);
  const filters = useSelector((state) => state.tickets.filters);
  const usedcheckbox = useSelector((state) => state.checkboxs.usedcheckbox);

  //! Фильтрация и сортировка билетов: =>>>
  const transformTicket = tickets.map((ticket) => transformTickets(ticket));
  const filteredTickets = filterTickets(transformTicket, usedcheckbox);
  const sortedTickets = sortTickets(filteredTickets, filters);

  //! Условия отображения елементов компанента ItemList: =>>>
  const sortTicketsButtons = <SortButtons />;
  const content = error ? (
    <ErrorIndicator />
  ) : (
    sortedTickets.slice(0, limit).map((ticket) => <ItemCard key={uniqueKey()} ticket={ticket} />)
  );

  const showTicketButton = transformTicket.length > limit &&
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
