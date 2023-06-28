import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Row from '../Row';
import Filter from '../Item-filter/Item-filter';
import ItemList from '../Item-list';
import { fetchSearchId, fetchTickets } from '../../Redux/slices/tickets/ticketSlice';
import { deleteCookie } from '../../utils';
import * as data from '../../Redux/slices/selectors';
import ErrorBoundry from '../Error-boundry/error-boundry';

function App() {
  const tickets = useSelector(data.tickets);
  const fetchStatus500 = useSelector(data.fetchStatus500);
  const stopFetch = useSelector(data.stopFetch);
  const searchId = useSelector(data.searchId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSearchId());
    return deleteCookie('searchId');
  }, [dispatch]);

  useEffect(() => {
    if (!stopFetch && searchId) dispatch(fetchTickets());
  }, [dispatch, tickets, fetchStatus500, stopFetch, searchId]);

  return (
    <ErrorBoundry>
      <Row sidebar={<Filter />} content={<ItemList />} />
    </ErrorBoundry>
  );
}

export default App;
