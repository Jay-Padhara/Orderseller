import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  delecate_error: null,
  delecate_data: null,
};

export const deletecategoryreducer = createSlice({
  name: 'deletecategoryreducer',
  initialState,

  reducers: {
    deletecategory(state) {
      state.loading = true;
    },

    deletecategoryfailed(state, action) {
      state.loading = false;
      state.delecate_error = action.payload;
    },

    deletecategorysuccess(state, action) {
      state.loading = false;
      state.delecate_error = null;
      state.delecate_data = action.payload;
    },
  },
});

export const {deletecategory, deletecategoryfailed, deletecategorysuccess} =
  deletecategoryreducer.actions;
export default deletecategoryreducer.reducer;
