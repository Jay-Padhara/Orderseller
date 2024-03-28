import {createSlice} from '@reduxjs/toolkit';

export const createaddressreducer = createSlice({
  name: 'createaddressreducer',
  initialState: {
    loading: false,
    createaddress_data: null,
    createaddress_error: null,
  },

  reducers: {
    createaddress(state) {
      state.loading = true;
    },

    createaddressfailed(state, action) {
      state.loading = false;
      state.createaddress_error = action.payload;
    },

    createaddsuccess(state, action) {
      state.loading = false;
      state.createaddress_error = null;
      state.createaddress_data = action.payload;
    },
  },
});

export const {createaddress, createaddressfailed, createaddsuccess} =
  createaddressreducer.actions;
export default createaddressreducer.reducer;
