import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    // --------------------------
    // Authentication Endpoints
    // --------------------------

    // Signup
    signup: build.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),

    // Login
    login: build.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),

    // Verify OTP
    verifyOTP: build.mutation({
      query: (data) => ({
        url: "/verify-otp",
        method: "POST",
        body: data,
      }),
    }),

    // Forgot Password
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/forget-password",
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: data, // { email, otp, newPassword, confirmPassword }
      }),
    }),

    // --------------------------
    // User Profile Endpoints
    // --------------------------

    // Get User Profile
    getProfile: build.query({
  query: () => `/my-profile`, // backend figures out the user
  providesTags: ["User"],
}),

    // Update User Profile
    updateProfile: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/update-profile/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"], // automatically refresh profile after update
    }),

    // Update User Password
    updatePassword: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/change-password/${id}`,
        method: "PUT",
        body: data, // { currentPassword, newPassword }
      }),
    }),
  }),
});

// Export all hooks for use in components
export const {
  // Auth
  useSignupMutation,
  useLoginMutation,
  useVerifyOTPMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  
  // Profile
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
} = userApi;
