/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchId, fetchTickets } from '../../Redux/slices/tickets/ticketSlice';
import { deleteCookie } from '../../utils';
import ErrorBoundry from '../Error-boundry/error-boundry';

function withData(View) {
  return function () {
    const tickets = useSelector((state) => state.tickets.tickets);
    const fetchStatus500 = useSelector((state) => state.tickets.fetchStatus500);
    const stopFetch = useSelector((state) => state.tickets.stopFetch);
    const searchId = useSelector((state) => state.tickets.searchId);

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
        <View />
      </ErrorBoundry>
    );
  };
}

export default withData;
