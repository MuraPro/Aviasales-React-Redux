/* eslint-disable */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withAviasalesService } from '../Hoc';
import classes from './Item-filter.module.scss';

function Filter({
  flagAll,
  flagWithoutStops,
  flagOneStop,
  flagTwoStops,
  flagThreeStops,

  allTicketsCheckbox,
  withoutStopsCheckbox,
  oneStopsCheckbox,
  twoStopsCheckbox,
  threeStopsCheckbox,
}) {
  function heandlerAllCheckbox(e) {
    allTicketsCheckbox();
  }
  function handlerWithoutStopsCheckbox(e) {
    withoutStopsCheckbox(e.target.name);
  }
  function handlerOneStopsCheckbox(e) {
    oneStopsCheckbox(e.target.name);
  }
  function handlerTwoStopsCheckbox(e) {
    twoStopsCheckbox(e.target.name);
  }
  function handlerThreeStopsCheckbox(e) {
    threeStopsCheckbox(e.target.name);
  }

  return (
    <div className={classes.Filter}>
      <div className={classes.Title}>Количество пересадок</div>
      <form action="">
        <ul className={classes.List}>
          <li>
            <label htmlFor="all" className={classes.Item}>
              <input
                type="checkbox"
                name="flagAll"
                id="all"
                checked={flagAll}
                onChange={heandlerAllCheckbox}
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
                tabIndex={1}
              />
              <span className={classes.CustomCheckbox} />
              Все
            </label>
          </li>
          <li>
            <label htmlFor="without-stops" className={classes.Item}>
              <input
                type="checkbox"
                name="flagWithoutStops"
                id="without-stops"
                checked={flagAll && flagWithoutStops}
                onChange={handlerWithoutStopsCheckbox}
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />
              Без пересадок
            </label>
          </li>
          <li>
            <label htmlFor="one-stop" className={classes.Item}>
              <input
                type="checkbox"
                name="flagOneStop"
                id="one-stop"
                checked={flagAll && flagOneStop}
                onChange={handlerOneStopsCheckbox}
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />1 пересадка
            </label>
          </li>
          <li>
            <label htmlFor="two-stops" className={classes.Item}>
              <input
                type="checkbox"
                name="flagTwoStops"
                id="two-stops"
                checked={flagAll && flagTwoStops}
                onChange={handlerTwoStopsCheckbox}
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />2 пересадки
            </label>
          </li>
          <li>
            <label htmlFor="three-stops" className={classes.Item}>
              <input
                type="checkbox"
                name="flagThreeStops"
                id="three-stops"
                checked={flagAll && flagThreeStops}
                onChange={handlerThreeStopsCheckbox}
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />3 пересадки
            </label>
          </li>
        </ul>
      </form>
    </div>
  );
}

function mapMethodsToProps(data) {
  return {
    items: data.items,
    flagAll: data.flagAll,
    flagWithoutStops: data.flagWithoutStops,
    flagOneStop: data.flagOneStop,
    flagTwoStops: data.flagTwoStops,
    flagThreeStops: data.flagThreeStops,
    allTicketsCheckbox: data.allTicketsCheckbox,
    changeFilter: data.changeFilter,
    onUsedCheckboxFlagChange: data.onUsedCheckboxFlagChange,
    onUsedCheckboxNameChange: data.onUsedCheckboxNameChange,
    markAllCheckboxs: data.markAllCheckboxs,
    withoutStopsCheckbox: data.withoutStopsCheckbox,
    oneStopsCheckbox: data.oneStopsCheckbox,
    twoStopsCheckbox: data.twoStopsCheckbox,
    threeStopsCheckbox: data.threeStopsCheckbox,
  };
}

Filter.propTypes = {
  items: PropTypes.array,
  flagAll: PropTypes.bool,
  flagWithoutStops: PropTypes.bool,
  flagOneStop: PropTypes.bool,
  flagTwoStops: PropTypes.bool,
  flagThreeStops: PropTypes.bool,
  allTicketsCheckbox: PropTypes.func,
  withoutStopsCheckbox: PropTypes.func,
  oneStopsCheckbox: PropTypes.func,
  twoStopsCheckbox: PropTypes.func,
  threeStopsCheckbox: PropTypes.func,
};

export default withAviasalesService(mapMethodsToProps)(Filter);
