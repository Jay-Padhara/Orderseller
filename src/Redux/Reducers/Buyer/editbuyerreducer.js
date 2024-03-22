import {createSlice} from '@reduxjs/toolkit';

export const editbuyerreducer = createSlice({
  name: 'editbuyerreducer',
  initialState: {
    loading: false,
    editbuyer_data: null,
    editbuyer_error: null,
  },

  reducers: {
    editbuyer(state) {
      state.loading = true;
    },

    editbuyerfailed(state, action) {
      state.loading = false;
      state.editbuyer_error = action.payload;
    },

    editbuyersuccess(state, action) {
      state.loading = false;
      state.editbuyer_error = null;
      state.editbuyer_data = action.payload;
    },
  },
});

export const {editbuyer, editbuyerfailed, editbuyersuccess} =
  editbuyerreducer.actions;
export default editbuyerreducer.reducer;
