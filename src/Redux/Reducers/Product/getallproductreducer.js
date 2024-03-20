import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  getall_error: null,
  getall_data: null,
};

const getallproductreducer = createSlice({
  name: 'getallproductreducer',
  initialState,

  reducers: {
    getallproduct(state) {
      state.loading = true;
    },

    getallproductfailed(state, action) {
      state.loading = false;
      state.getall_data = action.payload;
    },

    getallproductsuccess(state, action) {
      state.loading = false;
      state.getall_data = null;
      state.getall_data = action.payload;
    },
  },
});

export const {getallproduct, getallproductfailed, getallproductsuccess} =
  getallproductreducer.actions;
export default getallproductreducer.reducer;
