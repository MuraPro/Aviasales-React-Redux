/* eslint-disable */
import React from 'react';
import withData from '../Hoc/with-data';
import Row from '../Row';
import Filter from '../Item-filter/Item-filter';
import ItemList from '../Item-list';

function App({ items }) {
  return <Row sidebar={<Filter />} content={<ItemList />} />;
}

export default withData(App);
