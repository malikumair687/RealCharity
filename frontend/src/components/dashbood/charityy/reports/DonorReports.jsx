import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend
} from "recharts";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import toast, { Toaster } from "react-hot-toast";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384", "#36A2EB"];

export default function DynamicDashboard() {
  const [filters, setFilters] = useState({ dateFrom: "", dateTo: "", campaign: "" });
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data from backend dynamically
  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/reports", { params: filters });
      setReports(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filters]);

  // PDF Export
  const exportPDF = () => {
    if (!reports) return;
    const input = document.getElementById("dashboard");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("Donation_Report.pdf");
    });
  };

  // CSV Export
  const exportCSV = (data, filename) => {
    if (!data || data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","), 
      ...data.map(row => headers.map(h => `"${row[h]}"`).join(","))
    ];
    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
  };

  if (loading) return <p className="p-4">Loading reports...</p>;
  if (!reports) return <p className="p-4">No data available</p>;

  return (
    <div className="p-4" id="dashboard">
      <Toaster />
      <h1 className="text-2xl font-bold mb-4">Dynamic Donation Dashboard</h1>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          className="border px-2 py-1"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          className="border px-2 py-1"
        />
        <input
          type="text"
          placeholder="Campaign name"
          value={filters.campaign}
          onChange={(e) => setFilters({ ...filters, campaign: e.target.value })}
          className="border px-2 py-1"
        />
        <button
          onClick={fetchReports}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Apply
        </button>
      </div>

      {/* Total Donations */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Total Donations (QAR)</h2>
        <LineChart width={700} height={300} data={reports.totalDonations}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        </LineChart>
      </section>

      {/* Donations by Campaign */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Donations by Campaign</h2>
        <BarChart width={700} height={300} data={reports.donationsByCampaign}>
          <XAxis dataKey="campaign" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#82ca9d" />
        </BarChart>
      </section>

      {/* Donor Categories */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Donor Categories</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={reports.donorCategories}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {reports.donorCategories.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </section>

      {/* Payment Methods */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Payment Methods</h2>
        <PieChart width={400} height={300}>
          <Pie
            data={reports.paymentMethods}
            dataKey="amount"
            nameKey="method"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {reports.paymentMethods.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </section>

      {/* Campaign Progress */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Campaign Progress</h2>
        {reports.campaigns.map((campaign, i) => (
          <div key={i} className="mb-2">
            <p>{campaign.name} - {campaign.raised} / {campaign.goal} QAR</p>
            <div className="w-full bg-gray-300 h-4 rounded">
              <div
                className="bg-green-500 h-4 rounded"
                style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </section>

      {/* Top Donors */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Top Donors</h2>
        <table className="table-auto border border-gray-300 w-full text-left">
          <thead>
            <tr>
              <th className="border px-2 py-1">Donor</th>
              <th className="border px-2 py-1">Total Donation</th>
              <th className="border px-2 py-1">Campaigns Supported</th>
            </tr>
          </thead>
          <tbody>
            {reports.topDonors.map((donor, i) => (
              <tr key={i}>
                <td className="border px-2 py-1">{donor.name}</td>
                <td className="border px-2 py-1">{donor.totalAmount}</td>
                <td className="border px-2 py-1">{donor.campaigns}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Volunteers */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Volunteers</h2>
        <p>Active Volunteers: {reports.volunteers.active}</p>
        <p>Hours Contributed: {reports.volunteers.hours}</p>
      </section>

      {/* Financial Summary */}
      <section className="mb-8">
        <h2 className="font-semibold mb-2">Financial Summary</h2>
        <p>Total Income: {reports.financials.income} QAR</p>
        <p>Total Expenses: {reports.financials.expenses} QAR</p>
      </section>

      {/* Export Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => exportCSV(reports.topDonors, "Top_Donors.csv")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Export Top Donors CSV
        </button>
        <button
          onClick={exportPDF}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Export Full Dashboard PDF
        </button>
      </div>
    </div>
  );
}
