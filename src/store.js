import { configureStore } from '@reduxjs/toolkit';
import { adminAuthApi } from './services/adminAuthApi';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
	reducer: {
		[ adminAuthApi.reducerPath ]: adminAuthApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminAuthApi.middleware),
});

setupListeners(store.dispatch);