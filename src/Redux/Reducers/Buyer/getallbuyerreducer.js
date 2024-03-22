import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  getallbuyer_error: null,
  getallbuyer_data: null,
};

export const getallbuyerreducer = createSlice({
  name: 'getallbuyerreducer',
  initialState,

  reducers: {
    getallbuyer(state) {
      state.loading = true;
    },

    getallbuyerfailed(state, action) {
      state.loading = false;
      state.getallbuyer_error = action.payload;
    },

    getallbuyersuccess(state, action) {
      state.loading = false;
      state.getallbuyer_error = null;
      state.getallbuyer_data = action.payload;
    },
  },
});

export const {getallbuyer, getallbuyerfailed, getallbuyersuccess} =
  getallbuyerreducer.actions;
export default getallbuyerreducer.reducer;
