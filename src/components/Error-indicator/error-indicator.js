import React from 'react';
import icon from './icon-error.png';
import classes from './Error-indicator.module.scss';

function ErrorIndicator() {
  return (
    <div className={classes['error-indicator']}>
      <img src={icon} alt="error icon" />
      <span className={classes.boom}>Внимание!</span>
      <span>Непредвиденная ошибка. попробуйте обновить страницу!</span>
    </div>
  );
}

export default ErrorIndicator;
