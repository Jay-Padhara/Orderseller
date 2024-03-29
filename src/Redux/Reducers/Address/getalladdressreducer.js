import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  getalladdress_error: null,
  getalladdress_data: null,
};

export const getalladdressreducer = createSlice({
  name: 'getalladdressreducer',
  initialState,

  reducers: {
    getalladdress(state) {
      state.loading = true;
    },

    getalladdressfailed(state, action) {
      state.loading = false;
      state.getalladdress_error = action.payload;
    },

    getalladdresssuccess(state, action) {
      state.loading = false;
      state.getalladdress_error = null;
      state.getalladdress_data = action.payload;
    },
  },
});

export const {getalladdress, getalladdressfailed, getalladdresssuccess} =
  getalladdressreducer.actions;
export default getalladdressreducer.reducer;
