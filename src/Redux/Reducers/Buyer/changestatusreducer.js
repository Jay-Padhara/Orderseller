import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  buyerstatus_error: null,
  buyerstatus_data: null,
};

export const changebuyerstatusreducer = createSlice({
  name: 'changebuyerstatusreducer',
  initialState,

  reducers: {
    changestatus(state) {
      state.loading = true;
    },

    changestatusfailed(state, action) {
      state.loading = false;
      state.createbuyer_error = action.payload;
    },

    changestatussuccess(state, action) {
      state.loading = false;
      state.createbuyer_error = null;
      state.createbuyer_data = action.payload;
    },
  },
});

export const {changestatus, changestatusfailed, changestatussuccess} =
  changebuyerstatusreducer.actions;
export default changebuyerstatusreducer.reducer;
