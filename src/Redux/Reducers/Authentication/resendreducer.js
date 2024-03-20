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
      state.register_error = action.payload;
      state.register_data = null;
    },
    resendemailsuccess(state, action) {
      state.loading = false;
      state.register_data = action.payload;
      state.register_error = null;
    },
  },
});

export const {resendemail, resendemailfailed, resendemailsuccess} =
  resendreducer.actions;
export default resendreducer.reducer;
