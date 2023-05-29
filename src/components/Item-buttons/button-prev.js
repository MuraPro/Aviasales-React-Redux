import React from 'react';
import PropTypes from 'prop-types';
import classes from './Item-buttons.module.scss';

export default function PrevTicketsButton({ showPreviousTicket }) {
  return (
    <button type="button" className={classes['Show-more-button']} onClick={showPreviousTicket}>
      Показать предыдущие 5 билетов
    </button>
  );
}

PrevTicketsButton.propTypes = {
  showPreviousTicket: PropTypes.func,
};
