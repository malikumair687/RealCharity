import React from "react";
import { useGetAllDonationsQuery } from "../../../../../Redux/slices/DonationApi.js";
import { useGetAllCampaignsQuery } from "../../../../../Redux/slices/CampaignApi.js";
import { useGetBeneficiariesCountQuery, useGetCharitiesCountQuery } from "../../../../../Redux/slices/StatsApi.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export default function DashboardHome() {
  const { data: donations = [], isLoading: donationsLoading } = useGetAllDonationsQuery();
  const { data: campaigns = [], isLoading: campaignsLoading } = useGetAllCampaignsQuery();
  const { data: beneficiariesData, isLoading: loadingBeneficiaries } = useGetBeneficiariesCountQuery();
  const { data: charitiesData, isLoading: loadingCharities } = useGetCharitiesCountQuery();

  // Top campaigns (3 with highest raisedAmount)
  const topCampaigns = [...campaigns]
    .sort((a, b) => b.raisedAmount - a.raisedAmount)
    .slice(0, 3)
    .map(c => ({ name: c.title, amount: `$${c.raisedAmount}` }));

  // Stats
  const stats = [
    { title: "My Donations", value: donations.length },
    { title: "Active Campaigns", value: campaigns.length },
    {
  title: "Beneficiaries",
  value: loadingBeneficiaries ? "..." : (beneficiariesData?.totalBeneficiaries || 0)
},
{
  title: "Registered Charities",
  value: loadingCharities ? "..." : (charitiesData?.totalCharities || 0)
}

  ];

  if (donationsLoading || campaignsLoading) return <p>Loading dashboard...</p>;

  // Prepare donation chart data (by date)
  const donationData = donations
    .reduce((acc, d) => {
      const date = new Date(d.date).toLocaleDateString();
      const existing = acc.find(item => item.date === date);
      if (existing) existing.count += 1;
      else acc.push({ date, count: 1 });
      return acc;
    }, [])
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Prepare campaign chart data (total raised amount per campaign)
  const campaignData = campaigns.map(c => ({
    name: c.title,
    raised: Number(c.raisedAmount) || 0,
  }));

  return (
    <div className="w-full pt-24 p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          >
            <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
            <p className="mt-2 text-3xl font-bold text-[#8A1538]">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Charts + Top Campaigns */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Charts */}
        <div className="flex-1 bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Analytics Overview
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Donations Line Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={donationData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#8A1538" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Campaigns Bar Chart */}
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={campaignData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="raised" fill="#8A1538" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Top Campaigns */}
        <div className="w-full lg:w-[35%] bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Campaigns</h2>
          <div className="space-y-4">
            {topCampaigns.length > 0 ? (
              topCampaigns.map((campaign, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 border"
                >
                  <span className="text-gray-700 font-medium">{campaign.name}</span>
                  <span className="font-bold text-[#8A1538]">{campaign.amount}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No campaigns found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
