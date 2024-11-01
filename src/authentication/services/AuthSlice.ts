import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';

const AuthSlice = createSlice({
    name: 'auth',
    initialState: { token: null, user: null },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.user = jwtDecode(action.payload);
        },
        clearToken: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setToken, clearToken } = AuthSlice.actions;
export default AuthSlice.reducer;
