import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (build) => ({

        // ⭐ SIGNUP
        signup: build.mutation({
            query: (data) => ({
                url: "/signup",
                method: "POST",
                body: data,
            }),
        }),

        // ⭐ LOGIN
        login: build.mutation({
            query: (data) => ({
                url: "/login",
                method: "POST",
                body: data,
            }),
        }),

        // ⭐ VERIFY OTP
        verifyOTP: build.mutation({
            query: (data) => ({
                url: "/verify-otp",
                method: "POST",
                body: data,
            }),
        }),

        // ⭐ FORGOT PASSWORD (Send OTP)
        forgotPassword: build.mutation({
            query: (data) => ({
                url: "/forget-password",
                method: "POST",
                body: data,  // { email }
            }),
        }),

        // ⭐ RESET PASSWORD
        resetPassword: build.mutation({
            query: (data) => ({
                url: "/reset-password",
                method: "POST",
                body: data,  // { email, otp, newPassword }
            }),
        }),
    }),
});

export const {
    useSignupMutation,
    useLoginMutation,
    useVerifyOTPMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = userApi;
