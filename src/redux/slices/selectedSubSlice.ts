import { createSlice } from "@reduxjs/toolkit";

interface SubIdState {
    selectedSubId: string | null;
}

const initialState: SubIdState = {
    selectedSubId: null
}
const selectedSubIdSlice = createSlice({
    name: 'selectedSubId',
    initialState,
    reducers: {
        setSelectedSubId: (state, action) => {
            state.selectedSubId = action.payload;
        },
        removeSelectedSubId: (state) => {
            state.selectedSubId = null
        }
    }
})

export const { setSelectedSubId, removeSelectedSubId } = selectedSubIdSlice.actions
export default selectedSubIdSlice.reducer
