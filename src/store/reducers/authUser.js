// third-party
import { createSlice } from '@reduxjs/toolkit';
import { StorageKeys } from 'constants';
// import { StorageKeys } from 'constants';

// initial state
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

// ==============================|| AUTH-USER ||============================== //

const authUser = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    login(state, action) {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user
      };
    },
    logout() {
      localStorage.removeItem(StorageKeys.TOKEN);
      return {
        isInitialized: true,
        isLoggedIn: false
      };
    }
  }
});
export const { login, logout } = authUser.actions;
export default authUser.reducer;
