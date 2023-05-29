/* eslint-disable */
import React, { Component } from 'react';
import ErrorIndicator from '../Error-indicator/error-indicator';
import { Spin } from 'antd';
import classes from '../Item-list/Item-list.module.scss';

const withData = (View) => {
  return class extends Component {
    render() {
      const { items, loading, hasError } = this.props;

      const spinner = loading ? (
        <div className={classes.Spinner}>
          <Spin />
        </div>
      ) : null;

      const error = hasError ? <ErrorIndicator /> : null;

      const content = !(loading || hasError) ? <View items={items} {...this.props} /> : null;

      return (
        <div className={classes.Tickets}>
          {spinner}
          {error}
          {content}
        </div>
      );
    }
  };
};

export default withData;
