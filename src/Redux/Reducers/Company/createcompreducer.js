import {createSlice} from '@reduxjs/toolkit';

export const createcompanyreducer = createSlice({
  name: 'createcompanyreducer',
  initialState: {
    loading: false,
    createcomp_data: null,
    createcomp_error: null,
  },

  reducers: {
    createcomp(state) {
      state.loading = true;
    },

    createcompfailed(state, action) {
      state.loading = false;
      state.createcomp_error = action.payload;
    },

    createcompsuccess(state, action) {
      state.loading = false;
      state.createcomp_error = null;
      state.createcomp_data = action.payload;
    },
  },
});

export const {createcomp, createcompfailed, createcompsuccess} =
  createcompanyreducer.actions;
export default createcompanyreducer.reducer;
