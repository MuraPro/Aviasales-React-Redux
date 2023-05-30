/* eslint-disable */
import React, { Component } from 'react';
import ErrorBoundry from '../Error-boundry/error-boundry';
import AviasalesService from '../../services';
import { AviasalesServiceProvider } from '../Aviasales-service-context';

const withData = (View) => {
  return class extends Component {
    aviasalesService = new AviasalesService();

    constructor() {
      super();
      this.state = {
        tickets: [{}],
        loading: true,
        hasError: false,
        limit: 5,
        offset: 0,
        filters: 'cheap',
      };
    }

    showNextTicket = () => {
      this.setState({
        limit: this.state.limit + 5,
      });
    };

    resetCountTicket = () => {
      this.setState({
        limit: 5,
      });
    };

    onError = () => {
      this.setState({
        hasError: true,
        loading: false,
      });
    };

    onItemLoaded = () => {
      this.aviasalesService
        .getTickets()
        .then((data) =>
          this.setState({
            tickets: data,
            loading: false,
          }),
        )
        .catch(this.onError);
    };

    sortTickets = (tickets, filters) =>
      tickets.sort((a, b) => {
        if (filters === 'cheap') return a.price - b.price;
        if (filters === 'speed') {
          return a.forwardDuration + a.backwardDuration - (b.forwardDuration + b.backwardDuration);
        }
        if (filters === 'optimal') {
          return (
            a.price -
            b.price +
            (a.forwardDuration + a.backwardDuration) -
            (b.forwardDuration + b.backwardDuration)
          );
        }
        return tickets;
      });

    onFilterChange = (value) => {
      this.setState({
        filters: value,
        limit: 5,
      });
    };

    componentDidMount() {
      this.onItemLoaded();
    }

    render() {
      const { tickets, filters, loading, hasError, limit, offset } = this.state;
      const filterItems = this.sortTickets(tickets, filters);
      const items = filterItems.slice(offset, limit);

      const data = {
        items: items,
        filters: filters,
        loading: loading,
        hasError: hasError,
        showNextTicket: this.showNextTicket,
        onFilterChange: this.onFilterChange,
      };

      return (
        <ErrorBoundry>
          <AviasalesServiceProvider value={data}>
            <View />
          </AviasalesServiceProvider>
        </ErrorBoundry>
      );
    }
  };
};

export default withData;
