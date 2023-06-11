/* eslint-disable */
import React from 'react';
import ErrorBoundry from '../Error-boundry/error-boundry';
import { withData } from '../Hoc';
import Row from '../Row';
import Filter from '../Item-filter/Item-filter';
import ItemList from '../Item-list';

function App() {
  return (
    <ErrorBoundry>
      <Row sidebar={<Filter />} content={<ItemList />} />
    </ErrorBoundry>
  );
}

export default withData(App);
