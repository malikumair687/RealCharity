import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const donationApi = createApi({
  reducerPath: "donationApi",
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ["Donations"], // ✅ add tagTypes
  endpoints: (build) => ({
    createDonation: build.mutation({
      query: (formData) => ({
        url: "create-donation",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Donations"], // ✅ refresh list after create
    }),
    getAllDonations: build.query({
      query: () => "get-all-donations",
      providesTags: ["Donations"], // ✅ provide tag
    }),
    deleteDonation: build.mutation({
      query: (id) => ({
        url: `delete-donation/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Donations"], // ✅ refresh list after delete
    }),
    updateDonation: build.mutation({
      query: ({ id, ...patch }) => ({
        url: `update-donation/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Donations"], // ✅ refresh list after update
    }),
  }),
});

export const {
  useCreateDonationMutation,
  useGetAllDonationsQuery,
  useDeleteDonationMutation,
  useUpdateDonationMutation,
} = donationApi;
