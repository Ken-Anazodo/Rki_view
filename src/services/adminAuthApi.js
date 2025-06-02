import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const adminAuthApi = createApi({
	reducerPath: "adminAuthApi",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:3000", credentials: "include",}), //credentials for jwt cookies
	endpoints: (builder) => ({
		adminDashboard: builder.query({query: () => "admin/dashboard/"}),

		adminSignUp: builder.mutation({
			query: (userData)=>({
				url: "admin/admin_signup/",
				method: "POST",
				body: userData
			})
		}),

		adminEmailVerification: builder.mutation({
			query: (token)=>({
				url: `/verify_admin_email/${token}/`,
				method: 'POST',
				body: token
			})
		}),

		adminLogin: builder.mutation({
			query: (credentials)=>({
				url: "admin/admin_login/",
				method: "POST",
				body: credentials
			})
		})
	})
})

export const { useAdminDashboardQuery, useAdminSignUpMutation, useAdminEmailVerificationMutation, useAdminLoginMutation } = adminAuthApi;