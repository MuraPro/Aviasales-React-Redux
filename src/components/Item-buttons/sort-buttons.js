/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './Item-buttons.module.scss';

export default function SortButtons({ filters, onTicketsGroupChange }) {
  const buttons = [
    { name: 'cheap', label: 'Самые дешевые' },
    { name: 'speed', label: 'Самые быстрые' },
    { name: 'optimal', label: 'Оптимальные' },
  ];

  const tabs = buttons.map(({ name, label }) => {
    return (
      <button
        key={name}
        type="button"
        className={classnames(classes.Button, name === filters && classes.ButtonActive)}
        onClick={() => onTicketsGroupChange(name)}>
        {label}
      </button>
    );
  });

  return <div className={classes.Wrapper}>{tabs}</div>;
}

SortButtons.defaultprops = {
  onTicketsGroupChange: () => {},
};

SortButtons.propTypes = {
  filters: PropTypes.string,
  onTicketsGroupChange: PropTypes.func,
};
