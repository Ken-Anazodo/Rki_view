import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuthenticated: JSON.parse(localStorage.getItem("isAuthenticated")) || false
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state)=>{
			state.isAuthenticated = true
			localStorage.setItem("isAuthenticated", state.isAuthenticated)
		},

		logout: (state)=>{
			state.isAuthenticated = false
			localStorage.removeItem("isAuthenticated")
		}
	}
})

export default authSlice.reducer;
export const { login } = authSlice.actions;