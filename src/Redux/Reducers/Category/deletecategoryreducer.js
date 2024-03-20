import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  delete_error: null,
  delete_data: null,
};

const deletecategoryreducer = createSlice({
  name: 'deletecategoryreducer',
  initialState,

  reducers: {
    deletecategory(state) {
      state.loading = true;
    },

    deletecategoryfailed(state, action) {
      state.loading = false;
      state.delete_error = action.payload;
    },

    deletecategorysuccess(state, action) {
      state.loading = false;
      state.delete_error = null;
      state.delete_data = action.payload;
    },
  },
});

export const {deletecategory, deletecategoryfailed, deletecategorysuccess} =
  deletecategoryreducer.actions;
export default deletecategoryreducer.reducer;
