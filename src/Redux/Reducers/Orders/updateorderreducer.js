import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  updateorder_error: null,
  updateorder_data: null,
};

const updateorderreducer = createSlice({
  name: 'updateorderreducer',
  initialState,

  reducers: {
    updateorder(state) {
      state.loading = true;
    },

    updateorderfailed(state, action) {
      state.loading = false;
      state.updateorder_error = action.payload;
    },

    updateordersuccess(state, action) {
      state.loading = false;
      state.updateorder_error = null;
      state.updateorder_data = action.payload;
    },
  },
});

export const {updateorder, updateorderfailed, updateordersuccess} =
  updateorderreducer.actions;
export default updateorderreducer.reducer;
