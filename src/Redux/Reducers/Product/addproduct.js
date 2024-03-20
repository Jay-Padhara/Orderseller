import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  addpro_error: null,
  addpro_data: null,
};

const addprocuctreducer = createSlice({
  name: 'addproductreducer',
  initialState,

  reducers: {
    addpro(state) {
      state.loading = true;
    },

    addprofailed(state, action) {
      state.loading = false;
      state.addpro_error = action.payload;
    },

    addprosuccess(state, action) {
      state.loading = false;
      state.addpro_error = null;
      state.addpro_data = action.payload;
    },
  },
});

export const {addpro, addprofailed, addprosuccess} = addprocuctreducer.actions;
export default addprocuctreducer.reducer;
