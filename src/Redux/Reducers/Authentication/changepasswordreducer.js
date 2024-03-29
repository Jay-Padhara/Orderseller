import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  changepassword_error: null,
  changepassword_data: null,
};

const changepasswordreducer = createSlice({
  name: 'changepasswordreducer',
  initialState,

  reducers: {
    changepassword(state) {
      state.loading = true;
    },
    changepasswordfailed(state, action) {
      state.loading = false;
      state.changepassword_error = action.payload;
    },
    changepasswordsuccess(state, action) {
      state.loading = false;
      state.changepassword_data = action.payload;
      state.changepassword_error = null;
    },
  },
});

export const {changepassword, changepasswordfailed, changepasswordsuccess} =
  changepasswordreducer.actions;
export default changepasswordreducer.reducer;
