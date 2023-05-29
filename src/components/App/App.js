/* eslint-disable */
import React, { Component } from 'react';
import Logo from '../../images/Logo.png';
import Filter from '../Item-filter/Item-filter';
import ItemList from '../Item-list';
import AviasalesService from '../../services';

class App extends Component {
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
    const { tickets, filters, loading, hasError, limit, offset, showButton } = this.state;

    console.log(tickets);
    const filterItems = this.sortTickets(tickets, filters);
    const items = filterItems.slice(offset, limit);

    return (
      <div className="App">
        <div className="Page-wrapper">
          <main>
            <div className="Logo-wrapper">
              <img src={Logo} alt="123" className="Logo" />
            </div>
            <div className="Content-wrapper">
              <Filter />
              <ItemList
                items={items}
                loading={loading}
                hasError={hasError}
                filters={filters}
                showNextTicket={this.showNextTicket}
                onFilterChange={this.onFilterChange}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
