import { configureStore } from "@reduxjs/toolkit";
import { donationApi } from "./slices/DonationApi";
import { campaignApi } from "./slices/CampaignApi";
import { statsApi } from "./slices/StatsApi";
import { summaryApi } from "./slices/SummaryApi";
import { reportApi } from "./slices/ReportApi";
import { userApi } from "./slices/UserApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // <-- auth slice added
    [donationApi.reducerPath]: donationApi.reducer,
    [campaignApi.reducerPath]: campaignApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [summaryApi.reducerPath]: summaryApi.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      donationApi.middleware,
      campaignApi.middleware,
      statsApi.middleware,
      summaryApi.middleware,
      reportApi.middleware,
      userApi.middleware
    ),
});
