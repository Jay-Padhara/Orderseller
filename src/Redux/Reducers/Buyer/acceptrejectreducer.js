import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  buyerrequest_error: null,
  buyerrequest_data: null,
};

export const acceptrejectreducer = createSlice({
  name: 'acceptrejectreducer',
  initialState,

  reducers: {
    requeststatus(state) {
      state.loading = true;
    },

    requeststatusfailed(state, action) {
      state.loading = false;
      state.buyerrequest_error = action.payload;
    },

    requeststatussuccess(state, action) {
      state.loading = false;
      state.buyerrequest_error = null;
      state.buyerrequest_data = action.payload;
    },
  },
});

export const {requeststatus, requeststatusfailed, requeststatussuccess} =
  acceptrejectreducer.actions;
export default acceptrejectreducer.reducer;
