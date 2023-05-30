import React from 'react';
import PropTypes from 'prop-types';
import { withValidation, withAviasalesService } from '../Hoc';
import { AddTicketsButton, SortButtons } from '../Item-buttons';
import ItemCard from '../Item-list-card/Item-list-card';
import classes from './Item-list.module.scss';

function ItemList(props) {
  const tickets = props.items.map((ticket) => <ItemCard key={ticket.id} ticket={ticket} />);
  const sortTicketsButtons = <SortButtons {...props} />;
  const addTicketsButton = <AddTicketsButton {...props} />;

  return (
    <div className={classes.Tickets}>
      {sortTicketsButtons}
      {tickets}
      {addTicketsButton}
    </div>
  );
}

function mapMethodsToProps(data) {
  return {
    items: data.items,
    filters: data.filters,
    loading: data.loading,
    hasError: data.hasError,
    onFilterChange: data.onFilterChange,
    showNextTicket: data.showNextTicket,
  };
}

ItemList.propTypes = {
  items: PropTypes.array,
  showNextTicket: PropTypes.func,
  onFilterChange: PropTypes.func,
  filters: PropTypes.string,
};

export default withAviasalesService(mapMethodsToProps)(withValidation(ItemList));
