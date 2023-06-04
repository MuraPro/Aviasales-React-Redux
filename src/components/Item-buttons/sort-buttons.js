/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import classes from './Item-buttons.module.scss';

export default function SortButtons({ filters, onFilterChange }) {
  const buttons = [
    { name: 'cheap', label: 'Для Комилюши :)' },
    { name: 'speed', label: 'Самые быстрые' },
    { name: 'optimal', label: 'Оптимальные' },
  ];

  const tabs = buttons.map(({ name, label }) => {
    return (
      <button
        key={name}
        type="button"
        className={classnames(classes.Button, name === filters && classes.ButtonActive)}
        onClick={() => onFilterChange(name)}>
        {label}
      </button>
    );
  });

  return <div className={classes.Wrapper}>{tabs}</div>;
}

SortButtons.defaultprops = {
  filters: '',
  onFilterChange: () => {},
};

SortButtons.propTypes = {
  filters: PropTypes.string,
  onFilterChange: PropTypes.func,
};
