import { configureStore } from '@reduxjs/toolkit';
import { adminAuthApi } from './services/adminAuthApi';
import { setupListeners } from '@reduxjs/toolkit/query';
import authReducer from './features/auth/authentication'

export const store = configureStore({
	reducer: {
		[ adminAuthApi.reducerPath ]: adminAuthApi.reducer,
		auth: authReducer
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminAuthApi.middleware),
});

setupListeners(store.dispatch);