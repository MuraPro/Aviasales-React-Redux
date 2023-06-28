import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { filterTickets } from '../../utils';
import { SortButtons, ShowTicketsButton } from '../Item-buttons';
import ErrorIndicator from '../Error-indicator';
import WarningMsg from '../item-alert';
import * as data from '../../Redux/slices/selectors';
import ItemCard from '../Item-list-card/Item-list-card';
import classes from './Item-list.module.scss';

function ItemList() {
  const tickets = useSelector(data.tickets);
  const usedcheckbox = useSelector(data.usedcheckbox);
  const loading = useSelector(data.loading);
  const error = useSelector(data.error);
  const limit = useSelector(data.limit);
  const offset = useSelector(data.offset);

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
