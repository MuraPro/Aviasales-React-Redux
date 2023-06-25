/* eslint-disable */
import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { onTicketsGroupChange } from '../../Redux/slices/tickets/ticketSlice';
import classes from './Item-buttons.module.scss';

function SortButtons() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.tickets.filters);
  const buttons = useSelector((state) => state.tickets.buttons);

  const buttonsHandler = (name) => {
    dispatch(onTicketsGroupChange(name));
  };

  const tabs = buttons.map(({ name, label }) => {
    return (
      <button
        key={name}
        type="button"
        className={classnames(classes.Button, name === filters && classes.ButtonActive)}
        onClick={() => buttonsHandler(name)}>
        {label}
      </button>
    );
  });
  return <div className={classes.Wrapper}>{tabs}</div>;
}

export default SortButtons;
