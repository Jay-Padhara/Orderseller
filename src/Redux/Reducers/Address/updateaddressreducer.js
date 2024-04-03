import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  updateaddress_error: null,
  updateaddress_data: null,
};

export const updateaddressreducer = createSlice({
  name: 'updateaddressreducer',
  initialState,

  reducers: {
    updateaddress(state) {
      state.loading = true;
    },

    updateaddressfailed(state, action) {
      state.loading = false;
      state.updateaddress_error = action.payload;
    },

    updateaddresssuccess(state, action) {
      state.loading = false;
      state.updateaddress_error = null;
      state.updateaddress_data = action.payload;
    },
  },
});

export const {updateaddress, updateaddressfailed, updateaddresssuccess} =
  updateaddressreducer.actions;
export default updateaddressreducer.reducer;
