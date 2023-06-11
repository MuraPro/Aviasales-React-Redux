import React from 'react';
import PropTypes from 'prop-types';
import { useAviaSalesContext } from '../Hoc/with-data';
import { withValidation } from '../Hoc';
import { AddTicketsButton, SortButtons } from '../Item-buttons';
import ItemCard from '../Item-list-card/Item-list-card';

import classes from './Item-list.module.scss';

function ItemList() {
  const { items, ...other } = useAviaSalesContext();

  const tickets = items.map((ticket) => <ItemCard key={ticket.id} ticket={ticket} />);
  const sortTicketsButtons = <SortButtons {...other} />;

  const addTicketsButton =
    tickets.length > 0 ? (
      <AddTicketsButton {...other} />
    ) : (
      <h2 className={classes.Empty}>Используйте фильтр для поиска подходящего билета...</h2>
    );

  return (
    <div className={classes.Tickets}>
      {sortTicketsButtons}
      {tickets}
      {addTicketsButton}
    </div>
  );
}

ItemList.defaultProp = {
  filters: '',
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default withValidation(ItemList);
