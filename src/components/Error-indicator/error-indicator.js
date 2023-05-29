import React from 'react';
import icon from './icon-error.png';
import classes from './error-indicator.module.scss';

function ErrorIndicator() {
  return (
    <div className={classes['error-indicator']}>
      <img src={icon} alt="error icon" />
      <span className={classes.boom}>Внимание!</span>
      <span>Обновите страницу пожалуйста.</span>
    </div>
  );
}

export default ErrorIndicator;
