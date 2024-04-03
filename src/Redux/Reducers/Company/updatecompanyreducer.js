import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  updatecomp_error: null,
  updatecomp_data: null,
};

const updatecompanyreducer = createSlice({
  name: 'updatecompanyreducer',
  initialState,

  reducers: {
    updatecompany(state) {
      state.loading = true;
    },

    updatecompanyfailed(state, action) {
      state.loading = false;
      state.updatecomp_error = action.payload;
    },

    updatecompanysuccess(state, action) {
      state.loading = false;
      state.updatecomp_error = null;
      state.updatecomp_data = action.payload;
    },
  },
});

export const {updatecompany, updatecompanyfailed, updatecompanysuccess} =
  updatecompanyreducer.actions;
export default updatecompanyreducer.reducer;
