import React from 'react';
import PropTypes from 'prop-types';
import { withData } from '../Hoc';
import { AddTicketsButton, SortButtons } from '../Item-buttons';
import ItemCard from '../Item-list-card/Item-list-card';
import classes from './Item-list.module.scss';

function ItemList({ items, showNextTicket, onFilterChange, filters }) {
  const tickets = items.map((ticket) => <ItemCard key={ticket.id} ticket={ticket} />);
  const sortTicketsButtons = <SortButtons onFilterChange={onFilterChange} filters={filters} />;
  const addTicketsButton = <AddTicketsButton showNextTicket={showNextTicket} />;

  return (
    <div className={classes.Tickets}>
      {sortTicketsButtons}
      {tickets}
      {addTicketsButton}
    </div>
  );
}

ItemList.propTypes = {
  items: PropTypes.array,
  showButton: PropTypes.bool,
  showNextTicket: PropTypes.func,
  onFilterChange: PropTypes.func,
  filters: PropTypes.string,
};

export default withData(ItemList);
