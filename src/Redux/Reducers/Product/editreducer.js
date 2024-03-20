import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  editpro_error: null,
  editpro_data: null,
};

export const editproductreducer = createSlice({
  name: 'editproductreducer',
  initialState,

  reducers: {
    editpro(state) {
      state.loading = true;
    },

    editprofailed(state, action) {
      state.loading = false;
      state.editpro_error = action.payload;
    },

    editprosuccess(state, action) {
      state.loading = false;
      state.editpro_error = null;
      state.editpro_data = action.payload;
    },
  },
});

export const {editpro, editprofailed, editprosuccess} =
  editproductreducer.actions;
export default editproductreducer.reducer;
