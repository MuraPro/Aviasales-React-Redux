/* eslint-disable */
import React from 'react';
import classNames from 'classnames';
import { useAviaSalesContext } from '../Hoc/with-data';

import classes from './Item-filter.module.scss';

function Filter() {
  const { usedcheckbox, allHandler } = useAviaSalesContext();

  return (
    <div className={classes.Filter}>
      <div className={classes.Title}>Количество пересадок</div>
      <form action="">
        <ul className={classes.List}>
          <li>
            <label htmlFor="all" className={classes.Item}>
              <input
                type="checkbox"
                name="all"
                id="all"
                onChange={() => allHandler('all')}
                checked={usedcheckbox.all}
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
                name="without"
                id="without-stops"
                onChange={() => allHandler('without')}
                checked={usedcheckbox.without}
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
                name="one"
                id="one-stop"
                onChange={() => allHandler('one')}
                checked={usedcheckbox.one}
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />1 пересадка
            </label>
          </li>
          <li>
            <label htmlFor="two-stops" className={classes.Item}>
              <input
                type="checkbox"
                name="two"
                id="two-stops"
                onChange={() => allHandler('two')}
                checked={usedcheckbox.two}
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />2 пересадки
            </label>
          </li>
          <li>
            <label htmlFor="three-stops" className={classes.Item}>
              <input
                type="checkbox"
                name="three"
                id="three-stops"
                onChange={() => allHandler('three')}
                checked={usedcheckbox.three}
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

export default Filter;
