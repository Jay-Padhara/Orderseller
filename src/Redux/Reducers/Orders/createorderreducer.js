import {createSlice} from '@reduxjs/toolkit';

export const createorderreducer = createSlice({
  name: 'createorderreducer',
  initialState: {
    loading: false,
    createorder_data: null,
    createorder_error: null,
  },

  reducers: {
    createorder(state) {
      state.loading = true;
    },

    createorderfailed(state, action) {
      state.loading = false;
      state.createorder_error = action.payload;
    },

    createordersuccess(state, action) {
      state.loading = false;
      state.createorder_error = null;
      state.createorder_data = action.payload;
    },
  },
});

export const {createorder, createorderfailed, createordersuccess} =
  createorderreducer.actions;
export default createorderreducer.reducer;
