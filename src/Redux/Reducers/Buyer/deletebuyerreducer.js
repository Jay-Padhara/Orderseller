import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  delebuyer_error: null,
  delebuyer_data: null,
};

export const deletebuyerreducer = createSlice({
  name: 'deletebuyerreducer',
  initialState,

  reducers: {
    deletebuyer(state) {
      state.loading = true;
    },

    deletebuyerfailed(state, action) {
      state.loading = false;
      state.delebuyer_error = action.payload;
    },

    deletebuyersuccess(state, action) {
      state.loading = false;
      state.delebuyer_error = null;
      state.delebuyer_data = action.payload;
    },
  },
});

export const {deletebuyer, deletebuyerfailed, deletebuyersuccess} =
  deletebuyerreducer.actions;
export default deletebuyerreducer.reducer;
