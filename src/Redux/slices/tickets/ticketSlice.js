import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, sortTickets, transformTickets } from '../../../utils';

const fetchSearchId = createAsyncThunk('tickets/fetchSearchId', async (_, { rejectWithValue }) => {
  try {
    const res = await fetch('https://aviasales-test-api.kata.academy/search');
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return await res.json();
  } catch (err) {
    return rejectWithValue(err.message);
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
    const { tickets, stop } = await res.json();
    const ticketsGroup = tickets.map((ticket) => transformTickets(ticket));
    const sortedTickets = sortTickets(ticketsGroup, 'cheap');
    return { sortedTickets, stop };
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const ticketSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    newArr: [],
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
  },
  reducers: {
    /* eslint-disable no-param-reassign */
    showNextTicket(state) {
      state.limit += 5;
    },
    /* eslint-disable no-param-reassign */
    onTicketsGroupChange(state, action) {
      state.filters = action.payload;
      state.tickets = sortTickets(state.tickets, state.filters);
      state.limit = 5;
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

const { showNextTicket, onTicketsGroupChange } = ticketSlice.actions;

export default ticketSlice.reducer;

export { showNextTicket, onTicketsGroupChange, fetchSearchId, fetchTickets };
