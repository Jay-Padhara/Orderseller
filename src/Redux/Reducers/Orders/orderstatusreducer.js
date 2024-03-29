import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  updatestatus_error: null,
  updatestatus_data: null,
};

const updatestatusreducer = createSlice({
  name: 'updatestatusreducer',
  initialState,

  reducers: {
    updatestatus(state) {
      state.loading = true;
    },

    updatestatusfailed(state, action) {
      state.loading = false;
      state.updatestatus_error = action.payload;
    },

    updatestatussuccess(state, action) {
      state.loading = false;
      state.updatestatus_error = null;
      state.updatestatus_data = action.payload;
    },
  },
});

export const {updatestatus, updatestatusfailed, updatestatussuccess} =
  updatestatusreducer.actions;
export default updatestatusreducer.reducer;
