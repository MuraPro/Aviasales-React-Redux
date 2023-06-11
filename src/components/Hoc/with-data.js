/* eslint-disable */
import React, { useEffect, useState, useMemo, useContext, useCallback } from 'react';
import ErrorBoundry from '../Error-boundry/error-boundry';
import AviasalesService from '../../services';
const AviasalesServiceContext = React.createContext();

export function useAviaSalesContext() {
  return useContext(AviasalesServiceContext);
}

function withData(View) {
  return function () {
    const aviasalesService = new AviasalesService();

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasError, setError] = useState(false);
    const [limit, setLimit] = useState({ limit: 5, offset: 0 });
    const [filters, setFilters] = useState('cheap');
    const [usedcheckbox, setUsedcheckbox] = useState({
      all: true,
      without: true,
      one: true,
      two: true,
      three: true,
    });

    useEffect(() => {
      onItemLoaded();
    }, []);

    function onItemLoaded() {
      aviasalesService
        .getTickets()
        .then((data) => setTickets((tickets) => (tickets = data)), setLoading(false))
        .catch(onError);
    }

    function onError() {
      setError(true);
      setLoading(false);
    }

    const allHandler = (flag) => {
      let tempFilter = { ...usedcheckbox };

      tempFilter[flag] = !tempFilter[flag];

      if (flag === 'all') {
        tempFilter = Object.fromEntries(
          Object.keys(tempFilter).map((current) => {
            return [current, tempFilter[flag]];
          }),
        );
      } else {
        if (Object.keys(tempFilter).some((key) => tempFilter[key] === false)) {
          tempFilter['all'] = false;
        }
        if (
          Object.keys(tempFilter).every((key) => {
            if (key === 'all') return true;
            return tempFilter[key] === true;
          })
        ) {
          tempFilter['all'] = true;
        }
      }
      setUsedcheckbox({ ...tempFilter });
    };

    function showNextTicket() {
      setLimit((prevState) => {
        return {
          ...prevState,
          limit: prevState.limit + 5,
        };
      });
    }

    function onTicketsGroupChange(value) {
      setFilters(value);
      setLimit((prevState) => {
        return {
          ...prevState,
          limit: 5,
        };
      });
    }

    function sortTickets(items, filters) {
      return items.sort((a, b) => {
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
        return items;
      });
    }

    const filteredTickets = useCallback(
      (tickArr) => {
        return tickArr.filter((current) => {
          if (usedcheckbox.all) return current;
          if (usedcheckbox.without && current.fStops === 0 && current.bStops === 0) return true;
          if (usedcheckbox.one && current.fStops === 1 && current.bStops === 1) return true;
          if (usedcheckbox.two && current.fStops === 2 && current.bStops === 2) return true;
          if (usedcheckbox.three && current.fStops === 3 && current.bStops === 3) return true;
          return false;
        });
      },
      [usedcheckbox],
    );

    const visibleTickets = filteredTickets(tickets);
    const tickets_sort = sortTickets(visibleTickets, filters);
    const group = tickets_sort.slice(limit.offset, limit.limit);

    const data = {
      items: group,
      filters: filters,
      loading: loading,
      hasError: hasError,
      usedcheckbox: usedcheckbox,
      allHandler: allHandler,
      showNextTicket: showNextTicket,
      onTicketsGroupChange: onTicketsGroupChange,
    };

    return (
      <ErrorBoundry>
        <AviasalesServiceContext.Provider value={data}>
          <View />
        </AviasalesServiceContext.Provider>
      </ErrorBoundry>
    );
  };
}

export default withData;
