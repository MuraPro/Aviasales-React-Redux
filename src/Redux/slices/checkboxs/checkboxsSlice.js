import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usedcheckbox: {
    all: true,
    without: true,
    one: true,
    two: true,
    three: true,
  },
};

/* eslint-disable no-param-reassign */
const checkboxsSlice = createSlice({
  name: 'checkboxs',
  initialState,
  reducers: {
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
          tempFilter.all = false;
        }
        if (
          Object.keys(tempFilter).every((key) => {
            if (key === 'all') return true;
            return tempFilter[key] === true;
          })
        ) {
          tempFilter.all = true;
        }
      }
      state.usedcheckbox = tempFilter;
    },
  },
});

const { allHandler } = checkboxsSlice.actions;
export { allHandler };

export default checkboxsSlice.reducer;
