import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  forgot_error: null,
  forgot_data: null,
};

const forgotpassreducer = createSlice({
  name: 'forgotreducer',
  initialState,

  reducers: {
    forgotpassword(state) {
      state.loading = true;
    },

    forgotpasswordfailed(state, action) {
      state.loading = false;
      state.forgot_error = action.payload;
    },
    forgotpasswordsuccess(state, action) {
      state.loading = false;
      state.forgot_error = null;
      state.forgot_data = action.payload;
    },
  },
});

export const {forgotpassword, forgotpasswordfailed, forgotpasswordsuccess} =
  forgotpassreducer.actions;
export default forgotpassreducer.reducer;
