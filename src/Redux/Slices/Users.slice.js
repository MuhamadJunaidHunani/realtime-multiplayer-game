import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: null,
  userLoading:true,
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state ,action) => {
      state.users = action.payload;
    },
    setUserLoading: (state , action) => {
      state.userLoading = action.payload
    }
  },
})

export const { setUser, setUserLoading } = usersSlice.actions
const usersReducer = usersSlice.reducer
export default usersReducer