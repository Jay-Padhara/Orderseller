import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  resend_error: null,
  resend_data: null,
};

const resendreducer = createSlice({
  name: 'resendreducer',
  initialState,

  reducers: {
    resendemail(state) {
      state.loading = true;
    },
    resendemailfailed(state, action) {
      state.loading = false;
      state.resend_error = action.payload;
    },
    resendemailsuccess(state, action) {
      state.loading = false;
      state.resend_data = action.payload;
      state.resend_error = null;
    },
  },
});

export const {resendemail, resendemailfailed, resendemailsuccess} =
  resendreducer.actions;
export default resendreducer.reducer;
