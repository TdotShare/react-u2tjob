import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type UserType = {
    user_id : number
    idcard: string,
    token: string
}

export interface UserState {
    auth: boolean,
    data: UserType
}

const initialState: UserState = {
    auth: false,
    data: { user_id : 0 , idcard: "",  token: "" }
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<UserType>) => {
            state.data = action.payload
        },
        deleteUser: (state) => {
            state.data = { user_id : 0 , idcard : "", token: "" }
        },
        setLoginSuccess: (state) => {
            state.auth = true
        },
        setLoginfail: (state) => {
            state.auth = false
        },
    },
})

// Action creators are generated for each case reducer function
export const { addUser, deleteUser, setLoginSuccess, setLoginfail } = userSlice.actions

export default userSlice.reducer