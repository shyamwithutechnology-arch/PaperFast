import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLogin: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLogin: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.isLogin = true;
      state.token = action.payload;
    },
    logout: state => {
      state.isLogin = false;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
