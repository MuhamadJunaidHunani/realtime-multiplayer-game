import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './Slices/Users.slice'
import currentUserReducer from './Slices/CurrentUser.slice'
import opponentReducer from './Slices/Opponent'

export const store = configureStore({
  reducer: {
    users:usersReducer,
    currentUser:currentUserReducer,
    opponent:opponentReducer,
  },
})