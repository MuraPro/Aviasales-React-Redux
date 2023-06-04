import React from 'react';
import PropTypes from 'prop-types';
import { withValidation, withAviasalesService } from '../Hoc';
import { AddTicketsButton, SortButtons } from '../Item-buttons';
import ItemCard from '../Item-list-card/Item-list-card';
import classes from './Item-list.module.scss';

function ItemList(props) {
  const tickets = props.items.map((ticket) => <ItemCard key={ticket.id} ticket={ticket} />);
  const sortTicketsButtons = <SortButtons {...props} />;

  const addTicketsButton =
    tickets.length > 0 ? (
      <AddTicketsButton {...props} />
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

function mapMethodsToProps(data) {
  return {
    items: data.items,
    flagAll: data.flagAll,
    filters: data.filters,
    loading: data.loading,
    hasError: data.hasError,
    onFilterChange: data.onFilterChange,
    showNextTicket: data.showNextTicket,
  };
}

ItemList.defaultProp = {
  filters: '',
};

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  filters: PropTypes.string,
  flagAll: PropTypes.bool,
  visibale: PropTypes.bool,
  showNextTicket: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

export default withAviasalesService(mapMethodsToProps)(withValidation(ItemList));
