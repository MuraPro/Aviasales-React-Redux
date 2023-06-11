/* eslint-disable */
import React from 'react';
import { AviasalesServiceConsumer } from '../Aviasales-service-context';

const withAviasalesService = (mapMethodsToProps) => (Wrapped) => {
  return (props) => {
    return (
      <AviasalesServiceConsumer>
        {(data) => {
          const allData = mapMethodsToProps(data);
          return <Wrapped {...props} {...allData} />;
        }}
      </AviasalesServiceConsumer>
    );
  };
};

export default withAviasalesService;
