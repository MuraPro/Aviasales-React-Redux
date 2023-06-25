/* eslint-disable */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, sortTickets } from '../../../utils';
import { transformTickets } from '../../../utils';

const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err);
  }
});

const fetchTickets = createAsyncThunk('tickets/fetchTickets', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(
      `https://aviasales-test-api.kata.academy/tickets?searchId=${getCookie('searchId')}`,
    );
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    let isNotLastTicketsPack = true;
    while (isNotLastTicketsPack) {
      const { tickets, stop } = await res.json();
      if (stop) isNotLastTicketsPack = false;
      const ticketsGroup = tickets.map((ticket) => transformTickets(ticket));
      const sortedTickets = sortTickets(ticketsGroup, 'cheap');
      return { sortedTickets, stop };
    }
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    searchId: false,
    stopFetch: false,
    fetchStatus500: 0,
    error: false,
    filters: 'cheap',
    buttons: [
      { name: 'cheap', label: 'Самые дешевые' },
      { name: 'speed', label: 'Самые быстрые' },
      { name: 'optimal', label: 'Оптимальные' },
    ],
    limit: 5,
    offset: 0,
    usedcheckbox: {
      all: true,
      without: true,
      one: true,
      two: true,
      three: true,
    },
  },
  reducers: {
    showNextTicket(state) {
      state.limit = state.limit + 5;
    },
    onTicketsGroupChange(state, action) {
      state.filters = action.payload;
      state.tickets = sortTickets(state.tickets, state.filters);
      state.limit = 5;
    },
    allHandler(state, action) {
      const flag = action.payload;
      let tempFilter = { ...state.usedcheckbox };

      tempFilter[flag] = !tempFilter[flag];

      if (flag === 'all') {
        tempFilter = Object.fromEntries(
          Object.keys(tempFilter).map((current) => [current, tempFilter[flag]]),
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
      state.usedcheckbox = tempFilter;
    },
    filteredTickets(state, action) {
      console.log(action.payload.all);
      state.tickets = state.tickets.filter((current) => {
        if (action.payload.all) return current;
        if (action.payload.without && current.fStops === 0 && current.bStops === 0) return true;
        if (action.payload.one && current.fStops === 1 && current.bStops === 1) return true;
        if (action.payload.two && current.fStops === 2 && current.bStops === 2) return true;
        if (action.payload.three && current.fStops === 3 && current.bStops === 3) return true;
        return false;
      });
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        document.cookie = `searchId = ${action.payload.searchId}`;
        state.searchId = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = [...state.tickets, ...action.payload.sortedTickets];
        state.stopFetch = action.payload.stop;
        state.loading = !action.payload.stop;
      })
      .addCase(fetchSearchId.rejected, (state) => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        if (action.payload === '500') {
          state.fetchStatus500 += 1;
        } else {
          state.loading = false;
          state.error = true;
        }
      });
  },
});

const { showNextTicket, onTicketsGroupChange, allHandler, filteredTickets } = ticketSlice.actions;

export default ticketSlice.reducer;

export {
  showNextTicket,
  onTicketsGroupChange,
  fetchSearchId,
  fetchTickets,
  allHandler,
  filteredTickets,
};
