import {createSlice, PayloadAction, current} from '@reduxjs/toolkit';

import {FormState} from './../../types/form';

const initialState: FormState = {
  firstName: '',
  lastName: '',
  age: null,
  nationality: '',
  sex: null,
  agree: null,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{field: keyof FormState; value: string}>,
    ) => {
      state[action.payload.field] = action.payload.value;
      console.log(current(state));
    },
  },
});

export const {updateField} = formSlice.actions;

export default formSlice.reducer;
