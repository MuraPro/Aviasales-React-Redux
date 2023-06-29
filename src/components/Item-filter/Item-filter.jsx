import React from 'react';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { allHandler } from '../../Redux/slices/checkboxs/checkboxsSlice';
import * as data from '../../Redux/slices/selectors';
import classes from './Item-filter.module.scss';

function Filter() {
  const dispatch = useDispatch();
  const usedcheckbox = useSelector(data.usedcheckbox);

  const onChange = (e) => {
    dispatch(allHandler(e.target.name));
  };

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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
