import React from 'react';
import icon from './icon-error.png';
import classes from './Error-indicator.module.scss';

function ErrorIndicator() {
  return (
    <div className={classes.Indicator}>
      <img src={icon} alt={classes.Icon} />
      <span className={classes.Boom}>Внимание!</span>
      <span>Непредвиденная ошибка. попробуйте обновить страницу!</span>
    </div>
  );
}

export default ErrorIndicator;
