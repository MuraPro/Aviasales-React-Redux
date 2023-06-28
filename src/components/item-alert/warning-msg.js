import React from 'react';
import classes from './WarningMsg.module.scss';

const WarningMsg = () => (
  <div className={classes.warning_msg}>Не найдено рейсов, удовлетворяющих заданным условиям.</div>
);

export default WarningMsg;
