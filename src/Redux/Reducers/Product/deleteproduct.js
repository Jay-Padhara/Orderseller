import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  delpro_error: null,
  delpro_data: null,
};

export const deleteproductreducer = createSlice({
  name: 'deleteproductreducer',
  initialState,

  reducers: {
    deletepro(state) {
      state.loading = true;
    },

    deleteprofailed(state, action) {
      state.loading = false;
      state.delpro_error = action.payload;
    },

    deleteprosuccess(state, action) {
      state.loading = false;
      state.delpro_error = null;
      state.delpro_data = action.payload;
    },
  },
});

export const {deletepro, deleteprofailed, deleteprosuccess} =
  deleteproductreducer.actions;
export default deleteproductreducer.reducer;
