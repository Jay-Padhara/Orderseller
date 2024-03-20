import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  register_error: null,
  register_data: null,
};

const registerReducer = createSlice({
  name: 'registerreducer',
  initialState,

  reducers: {
    registeruser(state) {
      state.loading = true;
    },
    registerfailed(state, action) {
      state.loading = false;
      state.register_error = action.payload;
      state.register_data = null;
    },
    registersuccess(state, action) {
      state.loading = false;
      state.register_data = action.payload;
      state.register_error = null;
    },
  },
});

export const {registeruser, registersuccess, registerfailed} =
  registerReducer.actions;
export default registerReducer.reducer;
