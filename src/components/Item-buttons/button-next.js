import React from 'react';
import PropTypes from 'prop-types';
import classes from './Item-buttons.module.scss';

export default function AddTicketsButton({ showNextTicket }) {
  return (
    <button type="button" className={classes['Show-more-button']} onClick={showNextTicket}>
      Показать еще 5 билетов
    </button>
  );
}

AddTicketsButton.propTypes = {
  showNextTicket: PropTypes.func,
};
