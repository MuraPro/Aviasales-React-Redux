import { configureStore } from '@reduxjs/toolkit';
import ticketReducer from '../slices/tickets/ticketSlice';
import checkboxsReducer from '../slices/checkboxs/checkboxsSlice';

const store = configureStore({
  reducer: {
    tickets: ticketReducer,
    checkboxs: checkboxsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export default store;
