import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  getall_error: null,
  getall_data: null,
};

export const getallcategoryreducer = createSlice({
  name: 'getallcategoryreducer',
  initialState,

  reducers: {
    getallcate(state) {
      state.loading = true;
    },

    getallcatefailed(state, action) {
      state.loading = false;
      state.getall_error = action.payload;
    },

    getallcatesuccess(state, action) {
      state.loading = false;
      state.getall_error = null;
      state.getall_data = action.payload;
    },
  },
});

export const {getallcate, getallcatefailed, getallcatesuccess} =
  getallcategoryreducer.actions;
export default getallcategoryreducer.reducer;
