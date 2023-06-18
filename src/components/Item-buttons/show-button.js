import React from 'react';
import { useDispatch } from 'react-redux';
import { showNextTicket } from '../../Redux/slices/tickets/ticketSlice';
import classes from './Item-buttons.module.scss';

function ShowTicketsButton() {
  const dispatch = useDispatch();
  return (
    <button
      type="button"
      className={classes['Show-more-button']}
      onClick={() => dispatch(showNextTicket())}>
      Показать еще 5 билетов
    </button>
  );
}

export default ShowTicketsButton;
