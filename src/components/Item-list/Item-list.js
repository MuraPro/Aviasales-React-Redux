/* eslint-disable */
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ItemCard from '../Item-list-card/Item-list-card';
import { sortTickets } from '../../utils';
import { SortButtons, ShowTicketsButton } from '../Item-buttons';
import ErrorIndicator from '../Error-indicator';
import WarningMsg from '../item-alert';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import classes from './Item-list.module.scss';

function ItemList() {
  const loading = useSelector((state) => state.tickets.loading);
  const error = useSelector((state) => state.tickets.error);
  const limit = useSelector((state) => state.tickets.limit);
  const offset = useSelector((state) => state.tickets.offset);
  const tickets = useSelector((state) => state.tickets.tickets);
  const filters = useSelector((state) => state.tickets.filters);
  const usedcheckbox = useSelector((state) => state.tickets.usedcheckbox);

  //! Фильтрация и сортировка билетов: =>>>
  //   const filteredTickets = useCallback(
  //     (tickArr) => {
  //       console.log('filteredTickets');
  //       return tickArr.filter((current) => {
  //         if (usedcheckbox.all) return current;
  //         if (usedcheckbox.without && current.fStops === 0 && current.bStops === 0) return true;
  //         if (usedcheckbox.one && current.fStops === 1 && current.bStops === 1) return true;
  //         if (usedcheckbox.two && current.fStops === 2 && current.bStops === 2) return true;
  //         if (usedcheckbox.three && current.fStops === 3 && current.bStops === 3) return true;
  //         return false;
  //       });
  //     },
  //     [usedcheckbox],
  //   );
  //   const sortedTickets = useCallback(
  //     (tickets, filters) => {
  //       return sortTickets(tickets, filters);
  //     },
  //     [filters],
  //   );
  //   const visibleTickets = filteredTickets(tickets);
  //   const ticketsGroup = sortedTickets(tickets, filters);

  //! Условия отображения елементов компанента ItemList: =>>>

  const sortTicketsButtons = <SortButtons />;
  const content = error ? (
    <ErrorIndicator />
  ) : (
    tickets.map((ticket) => <ItemCard key={ticket.id} ticket={ticket} />)
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
      {content.slice(offset, limit)}
      {warningMsg}
      {showTicketButton}
    </div>
  );
}

export default ItemList;
