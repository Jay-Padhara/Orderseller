import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  edit_error: null,
  edit_data: null,
};

const editcategoryreducer = createSlice({
  name: 'editcategoryreducer',
  initialState,

  reducers: {
    editcategory(state) {
      state.loading = true;
    },

    editcategoryfailed(state, action) {
      state.loading = false;
      state.edit_error = action.payload;
    },

    editcategorysuccess(state, action) {
      state.loading = false;
      state.edit_error = null;
      state.edit_data = action.payload;
    },
  },
});

export const {editcategory, editcategoryfailed, editcategorysuccess} =
  editcategoryreducer.actions;
export default editcategoryreducer.reducer;
