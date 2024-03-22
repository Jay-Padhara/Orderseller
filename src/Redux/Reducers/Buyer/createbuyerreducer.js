import {createSlice} from '@reduxjs/toolkit';

export const createbuyerreducer = createSlice({
  name: 'createbuyerreducer',
  initialState: {
    loading: false,
    createbuyer_data: null,
    createbuyer_error: null,
  },

  reducers: {
    createbuyer(state) {
      state.loading = true;
    },

    createbuyerfailed(state, action) {
      state.loading = false;
      state.createbuyer_error = action.payload;
    },

    createbuyersuccess(state, action) {
      state.loading = false;
      state.createbuyer_error = null;
      state.createbuyer_data = action.payload;
    },
  },
});

export const {createbuyer, createbuyerfailed, createbuyersuccess} =
  createbuyerreducer.actions;
export default createbuyerreducer.reducer;
