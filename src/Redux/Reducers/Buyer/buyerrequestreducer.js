import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  buyerrequest_error: null,
  buyerrequest_data: null,
};

export const buyerrequestreducer = createSlice({
  name: 'buyerrequestreducer',
  initialState,

  reducers: {
    buyerrequest(state) {
      state.loading = true;
    },

    buyerrequestfailed(state, action) {
      state.loading = false;
      state.buyerrequest_error = action.payload;
    },

    buyerrequestsuccess(state, action) {
      state.loading = false;
      state.buyerrequest_error = null;
      state.buyerrequest_data = action.payload;
    },
  },
});

export const {buyerrequest, buyerrequestfailed, buyerrequestsuccess} =
  buyerrequestreducer.actions;
export default buyerrequestreducer.reducer;
