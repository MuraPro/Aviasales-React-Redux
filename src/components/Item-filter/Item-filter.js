import React from 'react';
import classNames from 'classnames';
import classes from './Item-filter.module.scss';

function Filter() {
  return (
    <div className={classes.Filter}>
      <div className={classes.Title}>Количество пересадок</div>
      <form action="">
        <ul className={classes.List}>
          <li>
            <label htmlFor="all-stops" className={classes.Item}>
              <input
                type="checkbox"
                name=""
                id="all-stops"
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
                name=""
                id="without-stops"
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
                name=""
                id="one-stop"
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />1 пересадка
            </label>
          </li>
          <li>
            <label htmlFor="two-stops" className={classes.Item}>
              <input
                type="checkbox"
                name=""
                id="two-stops"
                className={classNames(classes.RealCheckbox, 'Pseudo-hidden')}
              />
              <span className={classes.CustomCheckbox} />2 пересадки
            </label>
          </li>
          <li>
            <label htmlFor="three-stops" className={classes.Item}>
              <input
                type="checkbox"
                name=""
                id="three-stops"
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
