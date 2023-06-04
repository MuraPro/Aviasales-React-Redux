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
        tickets: [],
        loading: true,
        hasError: false,
        limit: 5,
        offset: 0,
        filters: 'cheap',
        usedCheckbox: 'all',
        flagAll: true,
        flagWithoutStops: true,
        flagOneStop: true,
        flagTwoStops: true,
        flagThreeStops: true,
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

    onUsedCheckboxNameChange = (value) => {
      this.setState({ usedCheckbox: value });
    };

    filerChange = (items, checkboxName) => {
      switch (checkboxName) {
        case 'flagWithoutStops':
          return items;
        case 'flagOneStop':
          return items;

        case 'flagTwoStops':
          return items;

        case 'flagThreeStops':
          return items;
        default:
          return items;
      }
    };

    allTicketsCheckbox = () => {
      this.setState((state) => {
        return {
          flagAll: !state.flagAll,
        };
      });
    };

    withoutStopsCheckbox = (name) => {
      this.onUsedCheckboxNameChange(name);

      this.setState((state) => {
        return {
          flagWithoutStops: !state.flagWithoutStops,
        };
      });
    };

    oneStopsCheckbox = (name) => {
      this.onUsedCheckboxNameChange(name);

      this.setState((state) => {
        return {
          flagOneStop: !state.flagOneStop,
        };
      });
    };

    twoStopsCheckbox = (name) => {
      this.onUsedCheckboxNameChange(name);

      this.setState((state) => {
        return {
          flagTwoStops: !state.flagTwoStops,
        };
      });
    };

    threeStopsCheckbox = (name) => {
      this.onUsedCheckboxNameChange(name);

      this.setState((state) => {
        return {
          flagThreeStops: !state.flagThreeStops,
        };
      });
    };

    componentDidMount() {
      this.onItemLoaded();
    }

    render() {
      const {
        usedCheckbox,
        tickets,
        filters,
        loading,
        hasError,
        limit,
        offset,
        flagAll,
        flagWithoutStops,
        flagOneStop,
        flagTwoStops,
        flagThreeStops,
      } = this.state;

      const visibalItems = this.filerChange(tickets, usedCheckbox);
      console.log(
        'flagAll',
        flagAll,
        'flagWithoutStops',
        flagWithoutStops,
        'flagOneStop',
        flagOneStop,
        'flagTwoStops',
        flagTwoStops,
        'flagThreeStops',
        flagThreeStops,
      );

      const filterItems = this.sortTickets(tickets, filters);

      const items = filterItems.slice(offset, limit);

      const data = {
        items: items,
        filters: filters,
        loading: loading,
        hasError: hasError,
        flagAll: flagAll,
        flagWithoutStops: flagWithoutStops,
        flagOneStop: flagOneStop,
        flagTwoStops: flagTwoStops,
        flagThreeStops: flagThreeStops,
        showNextTicket: this.showNextTicket,
        onFilterChange: this.onFilterChange,
        allTicketsCheckbox: this.allTicketsCheckbox,
        withoutStopsCheckbox: this.withoutStopsCheckbox,
        oneStopsCheckbox: this.oneStopsCheckbox,
        twoStopsCheckbox: this.twoStopsCheckbox,
        threeStopsCheckbox: this.threeStopsCheckbox,
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
