import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface UserState {
  currentUser: User | null;   // for a single user (logged-in user)
  userList: User[];   
  selectedUser: User | null;         // for a list of users
}

const initialState: UserState = {
  currentUser: null,
  userList: [],
  selectedUser: null
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User>) => {
      state.selectedUser = action.payload;
    },
    setAllUsers: (state, action: PayloadAction<User[]>) => {
      state.userList = action.payload;
    },
    resetUsers: (state) => {
     state =  initialState;
    },
  },
});

export const { setCurrentUser, setSelectedUser, setAllUsers, resetUsers } = userSlice.actions;
export default userSlice.reducer;
