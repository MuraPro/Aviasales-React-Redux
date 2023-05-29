import React from 'react';
import PropTypes from 'prop-types';
import CardView from './Card-view';
import classes from './Item-list-card.module.scss';

function ItemCard({ ticket }) {
  return (
    <div className={classes.Ticket}>
      <CardView ticket={ticket} />
    </div>
  );
}

ItemCard.propTypes = {
  ticket: PropTypes.object,
};

export default ItemCard;
