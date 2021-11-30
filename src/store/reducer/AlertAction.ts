import { createSlice } from '@reduxjs/toolkit'

export interface AlertActionState {
  value: boolean
}

const initialState: AlertActionState = {
  value: false,
}

export const AlertActionSlice = createSlice({
  name: 'alertaction',
  initialState,
  reducers: {
    isDisable: (state ) => {
      state.value = false
    },
    isOpen: (state ) => {
        state.value = true
    },
  },
})

// Action creators are generated for each case reducer function
export const { isOpen , isDisable } = AlertActionSlice.actions

export default AlertActionSlice.reducer