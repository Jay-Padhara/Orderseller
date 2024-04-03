import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  getcomp_data: null,
  getcomp_error: null,
};

export const getcompanyreducer = createSlice({
  name: 'getcompanyreducer',
  initialState,

  reducers: {
    getcomp(state) {
      state.loading = true;
    },

    getcompfailed(state, action) {
      state.loading = false;
      state.getcomp_error = action.payload;
    },

    getcompsuccess(state, action) {
      state.loading = false;
      state.getcomp_error = null;
      state.getcomp_data = action.payload;
    },
  },
});

export const {getcomp, getcompfailed, getcompsuccess} =
  getcompanyreducer.actions;
export default getcompanyreducer.reducer;
