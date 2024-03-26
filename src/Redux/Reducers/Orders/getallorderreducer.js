import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  getallorder_error: null,
  getallorder_data: null,
};

export const getallorderreducer = createSlice({
  name: 'getallorderreducer',
  initialState,

  reducers: {
    getallorder(state) {
      state.loading = true;
    },

    getallorderfailed(state, action) {
      state.loading = false;
      state.getallorder_error = action.payload;
    },

    getallordersuccess(state, action) {
      state.loading = false;
      state.getallorder_error = null;
      state.getallorder_data = action.payload;
    },
  },
});

export const {getallorder, getallorderfailed, getallordersuccess} =
  getallorderreducer.actions;
export default getallorderreducer.reducer;
