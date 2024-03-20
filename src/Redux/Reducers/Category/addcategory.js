import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  add_error: null,
  add_data: null,
};

const addcategoryreducer = createSlice({
  name: 'addcategoryreducer',
  initialState,

  reducers: {
    addcategory(state) {
      state.loading = true;
    },

    addcategoryfailed(state, action) {
      state.loading = false;
      state.add_error = action.payload;
    },

    addcategorysuccess(state, action) {
      state.loading = false;
      state.add_error = null;
      state.add_data = action.payload;
    },
  },
});

export const {addcategory, addcategoryfailed, addcategorysuccess} =
  addcategoryreducer.actions;
export default addcategoryreducer.reducer;
