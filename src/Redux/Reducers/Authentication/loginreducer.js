import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  login_error: null,
  login_data: null,
};

const loginReducer = createSlice({
  name: 'loginreducer',
  initialState,

  reducers: {
    loginuser(state) {
      state.loading = true;
    },
    loginfailed(state, action) {
      state.loading = false;
      state.login_error = action.payload;
    },
    loginsuccess(state, action) {
      state.loading = false;
      state.login_error = null;
      state.login_data = action.payload;
    },
  },
});

export const {loginuser, loginsuccess, loginfailed} = loginReducer.actions;
export default loginReducer.reducer;
