import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  opponent: null,
}

export const opponentSlice = createSlice({
  name: 'opponent',
  initialState,
  reducers: {
    setOpponent: (state ,action) => {
      state.opponent = action.payload;
    },
  },
})

export const { setOpponent } = opponentSlice.actions
const opponentReducer = opponentSlice.reducer
export default opponentReducer;