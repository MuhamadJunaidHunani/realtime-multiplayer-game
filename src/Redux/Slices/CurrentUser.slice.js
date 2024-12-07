import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  currentUserLoading:true,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setcurrentUser: (state ,action) => {
      state.currentUser = action.payload;
    },
    setcurrentUserLoading: (state , action) => {
      state.currentUserLoading = action.payload;
    }
  },
})

export const { setcurrentUserLoading, setcurrentUser } = currentUserSlice.actions
const currentUserReducer = currentUserSlice.reducer
export default currentUserReducer