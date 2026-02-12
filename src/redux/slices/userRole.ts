import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    role: 'Student'
}
const userRole = createSlice({
    name: 'userRole',
    initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload
        }
    }
})

export const { setRole } = userRole.actions
export default userRole.reducer