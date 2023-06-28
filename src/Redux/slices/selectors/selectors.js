const tickets = (state) => state.tickets.tickets;
const fetchStatus500 = (state) => state.tickets.fetchStatus500;
const stopFetch = (state) => state.tickets.stopFetch;
const searchId = (state) => state.tickets.searchId;
const filters = (state) => state.tickets.filters;
const buttons = (state) => state.tickets.buttons;
const usedcheckbox = (state) => state.checkboxs.usedcheckbox;
const loading = (state) => state.tickets.loading;
const error = (state) => state.tickets.error;
const limit = (state) => state.tickets.limit;
const offset = (state) => state.tickets.offset;

export {
  tickets,
  fetchStatus500,
  stopFetch,
  searchId,
  filters,
  buttons,
  usedcheckbox,
  loading,
  error,
  limit,
  offset,
};
