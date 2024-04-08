// features/user/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userData: UserData | null;
}

interface UserData {
  // Define the structure of user data here
  id: string;
  name: string;
  email: string;
  picture: string;
  createdAt: string;
}

const initialState: UserState = {
  userData: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
    },
    clearUser: (state) => {
      state.userData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
