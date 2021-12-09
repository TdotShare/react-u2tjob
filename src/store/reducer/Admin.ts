import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AdminType = {
    email : string,
    username : string,
    fullname : string,
    token : string
}

export interface AdminState {
    auth: boolean,
    data: AdminType
}

const initialState: AdminState = {
    auth: false,
    data : { email : "" , username : "" , fullname : "" , token : "" }
}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        addAdmin: (state, action: PayloadAction<AdminType>) => {
            state.data = action.payload
        },
        deleteAdmin: (state) => {
            state.data = { email : "" , username : "" , fullname : "" , token : "" }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addAdmin, deleteAdmin } = adminSlice.actions

export default adminSlice.reducer