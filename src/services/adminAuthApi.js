import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const adminAuthApi = createApi({
	reducerPath: "adminAuthApi",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000", credentials: "include",}), //credentials for jwt cookies
	endpoints: (builder) => ({
		adminDashboard: builder.query({query: () => "/api/v1/admin/dashboard/"}),

		adminSignUp: builder.mutation({
			query: (userData)=>({
				url: "/api/v1/admin/admin_signup/",
				method: "POST",
				body: userData
			})
		}),

		adminEmailVerification: builder.mutation({
			query: (token)=>({
				url: `/api/v1/verify_admin_email/${token}/`,
				method: 'POST',
				body: token
			})
		}),

		adminLogin: builder.mutation({
			query: (credentials)=>({
				url: "/api/v1/admin/admin_login/",
				method: "POST",
				body: credentials
			})
		})
	})
})

export const { useAdminDashboardQuery, useAdminSignUpMutation, useAdminEmailVerificationMutation, useAdminLoginMutation } = adminAuthApi;