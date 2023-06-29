import React from 'react';
import classnames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { onTicketsGroupChange } from '../../Redux/slices/tickets/ticketSlice';
import * as data from '../../Redux/slices/selectors';
import classes from './Item-buttons.module.scss';

function SortButtons() {
  const dispatch = useDispatch();
  const filters = useSelector(data.filters);
  const buttons = useSelector(data.buttons);

  const tabs = buttons.map(({ name, label }) => (
    <button
      key={name}
      type="button"
      className={classnames(classes.Button, name === filters && classes.ButtonActive)}
      onClick={() => dispatch(onTicketsGroupChange(name))}>
      {label}
    </button>
  ));
  return <div className={classes.Wrapper}>{tabs}</div>;
}

export default SortButtons;
