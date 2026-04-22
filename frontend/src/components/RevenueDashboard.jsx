import { useState } from "react";
import RevenueChart from "./RevenueChart"; // Import the new dynamic chart

export default function RevenueDashboard() {
  // Active tab state to toggle between views
  const [activeTab, setActiveTab] = useState("insight");

  return (
    <div className="flex flex-col h-full">
      {/* Primary Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("insight")}
          className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "insight"
              ? "bg-[#8B5CF6] text-white shadow-[0_4px_15px_-3px_rgba(139,92,246,0.5)]"
              : "bg-transparent border border-[#7F92BB]/40 text-[#7F92BB] hover:text-white hover:border-[#7F92BB]/80"
          }`}
        >
          Insight & Prediction
        </button>
        <button
          onClick={() => setActiveTab("optimize")}
          className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "optimize"
              ? "bg-[#8B5CF6] text-white shadow-[0_4px_15px_-3px_rgba(139,92,246,0.5)]"
              : "bg-transparent border border-[#7F92BB]/40 text-[#7F92BB] hover:text-white hover:border-[#7F92BB]/80"
          }`}
        >
          Optimize
        </button>
      </div>

      {/* Main container with border matching your design */}
      <div className="flex-1 border border-[#7F92BB]/30 rounded-2xl p-6 bg-[#0B1220]/50 shadow-inner overflow-hidden flex flex-col">
        {/* ==========================================
            VIEW 1: Insight & Prediction 
            ========================================== */}
        {activeTab === "insight" && (
          <div className="flex flex-col flex-1 animate-in fade-in duration-500 overflow-y-auto">
            {/* Secondary Filter Tabs */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                "Total Revenue",
                "Sales Performance",
                "Risk & Alerts",
                "Inventory Health",
                "Customer Insights",
                "Campaign & Marketing",
              ].map((tab, idx) => (
                <button
                  key={tab}
                  className={`px-5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    idx === 0
                      ? "bg-[#8B5CF6] text-white border border-[#8B5CF6]"
                      : "bg-transparent border border-[#7F92BB]/30 text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-4">
              Total Revenue Overview
            </h3>

            {/* Top 4 Statistic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* ... (Keep your existing stat cards here) ... */}
            </div>

            {/* Bottom Section: Chart & AI Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[300px]">
              {/* Trend Graph Wrapper - Integrated RevenueChart */}
              <div className="lg:col-span-2 bg-[#121826] p-6 rounded-xl border border-[#7F92BB]/20 shadow-inner flex flex-col relative">
                <h4 className="text-lg font-bold text-white mb-6">
                  Revenue Trend & Prediction
                </h4>

                {/* Responsive chart container */}
                <div className="flex-1 w-full min-h-[220px]">
                  <RevenueChart />
                </div>
              </div>

              {/* AI Explanation Box */}
              <div className="bg-[#1F2937] p-6 rounded-xl border border-[#8B5CF6] flex flex-col">
                <h4 className="text-[#A855F7] font-bold text-lg mb-4">
                  AI Explanation
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The projected revenue increase is driven by historical
                  end-of-month spikes combined with recent inventory
                  optimizations.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================

            VIEW 2: Optimize

            ========================================== */}

        {activeTab === "optimize" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 animate-in fade-in zoom-in-95 duration-300">
            {/* Card 1: Primary Action Recommendation */}

            <div className="bg-[#0B1220] p-6 rounded-xl border border-[#7F92BB]/20 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">
                  Increase chicken rice price{" "}
                  <span className="text-[#8B5CF6]">by RM0.50</span>
                </h3>

                <p className="text-sm text-slate-400 mb-2">
                  Expected Profit Increase
                </p>

                <div className="text-4xl font-extrabold text-[#34D399] mb-4">
                  +8%
                </div>

                <p className="text-sm text-slate-400">
                  Confidence:{" "}
                  <span className="text-[#34D399] font-medium">High (90%)</span>
                </p>
              </div>

              <div className="flex items-center space-x-4 mt-8">
                <button className="flex-1 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-lg">
                  Simulate Scenario
                </button>

                <button className="flex-1 bg-transparent border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95">
                  Apply to Actions
                </button>
              </div>
            </div>

            {/* Card 2: Trade-off Comparison Table */}

            <div className="bg-[#0B1220] p-6 rounded-xl border border-[#7F92BB]/20 overflow-hidden flex flex-col">
              <h3 className="text-lg font-bold text-white mb-6">
                Trade-off Comparison
              </h3>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-[#7F92BB]/20 pb-2 block mb-3">
                      <th className="w-1/3 font-medium">Option</th>

                      <th className="w-1/4 font-medium text-center">
                        Profit Impact
                      </th>

                      <th className="w-1/4 font-medium text-center">
                        Risk Level
                      </th>

                      <th className="w-auto font-medium text-right">
                        Customer Impact
                      </th>
                    </tr>
                  </thead>

                  <tbody className="space-y-4 block">
                    <tr className="flex items-center border-b border-[#7F92BB]/10 pb-3">
                      <td className="w-1/3 text-white font-medium">
                        Increase Price (RM0.50)
                      </td>

                      <td className="w-1/4 text-center font-bold text-[#34D399]">
                        +8%
                      </td>

                      <td className="w-1/4 text-center font-bold text-[#F59E0B]">
                        Medium
                      </td>

                      <td className="w-auto text-right text-slate-300 flex-1">
                        Slight Decrease
                      </td>
                    </tr>

                    <tr className="flex items-center border-b border-[#7F92BB]/10 pb-3">
                      <td className="w-1/3 text-slate-300">Switch Supplier</td>

                      <td className="w-1/4 text-center font-bold text-[#34D399]">
                        +5%
                      </td>

                      <td className="w-1/4 text-center font-bold text-[#34D399]">
                        Low
                      </td>

                      <td className="w-auto text-right text-slate-300 flex-1">
                        No Impact
                      </td>
                    </tr>

                    <tr className="flex items-center border-b border-[#7F92BB]/10 pb-3">
                      <td className="w-1/3 text-slate-300">Keep Current</td>

                      <td className="w-1/4 text-center font-bold text-slate-500">
                        0%
                      </td>

                      <td className="w-1/4 text-center font-bold text-[#34D399]">
                        Low
                      </td>

                      <td className="w-auto text-right text-slate-300 flex-1">
                        No Impact
                      </td>
                    </tr>

                    <tr className="flex items-center">
                      <td className="w-1/3 text-slate-300">Run Friday Promo</td>

                      <td className="w-1/4 text-center font-bold text-[#34D399]">
                        +3%
                      </td>

                      <td className="w-1/4 text-center font-bold text-[#F59E0B]">
                        Medium
                      </td>

                      <td className="w-auto text-right text-slate-300 flex-1">
                        Positive
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 3: Scenario Simulation Metrics */}

            <div className="bg-[#0B1220] p-6 rounded-xl border border-[#7F92BB]/20 overflow-hidden flex flex-col">
              <h3 className="text-lg font-bold text-white mb-2">
                Scenario Simulation
              </h3>

              <p className="text-sm text-slate-400 mb-6">
                Current vs Projected
              </p>

              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-slate-400 border-b border-[#7F92BB]/20 pb-2 block mb-3">
                      <th className="w-1/3 font-medium">Metric</th>

                      <th className="w-1/4 font-medium text-center">Current</th>

                      <th className="w-1/4 font-medium text-center">
                        Projected
                      </th>

                      <th className="w-auto font-medium text-right">Change</th>
                    </tr>
                  </thead>

                  <tbody className="space-y-4 block">
                    <tr className="flex items-center border-b border-[#7F92BB]/10 pb-3">
                      <td className="w-1/3 text-slate-300">Total Revenue</td>

                      <td className="w-1/4 text-center text-slate-300">
                        RM 5,000
                      </td>

                      <td className="w-1/4 text-center text-white font-medium">
                        RM 5,400
                      </td>

                      <td className="w-auto text-right text-[#34D399] font-bold flex-1">
                        ↑ 8.0%
                      </td>
                    </tr>

                    <tr className="flex items-center border-b border-[#7F92BB]/10 pb-3">
                      <td className="w-1/3 text-slate-300">Total Cost</td>

                      <td className="w-1/4 text-center text-slate-300">
                        RM 3,000
                      </td>

                      <td className="w-1/4 text-center text-white font-medium">
                        RM 3,120
                      </td>

                      <td className="w-auto text-right text-[#34D399] font-bold flex-1">
                        ↑ 4.0%
                      </td>
                    </tr>

                    <tr className="flex items-center border-b border-[#7F92BB]/10 pb-3">
                      <td className="w-1/3 text-white font-bold">
                        Gross Profit
                      </td>

                      <td className="w-1/4 text-center text-white font-bold">
                        RM 2,000
                      </td>

                      <td className="w-1/4 text-center text-white font-bold">
                        RM 2,280
                      </td>

                      <td className="w-auto text-right text-[#34D399] font-bold flex-1">
                        ↑ 14.0%
                      </td>
                    </tr>

                    <tr className="flex items-center">
                      <td className="w-1/3 text-slate-300">Profit Margin</td>

                      <td className="w-1/4 text-center text-slate-300">40%</td>

                      <td className="w-1/4 text-center text-white font-medium">
                        42.2%
                      </td>

                      <td className="w-auto text-right text-[#34D399] font-bold flex-1">
                        ↑ 2.2%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Card 4: Qualitative Explanation */}

            <div className="bg-[#0B1220] p-6 rounded-xl border border-[#7F92BB]/20 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8B5CF6]/10 blur-3xl rounded-full"></div>

              <div>
                <h3 className="text-lg font-bold text-white mb-4 relative z-10">
                  Why this recommendation?
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                  Historical AI analysis indicates that your customer base has
                  high price elasticity for protein-based meals. A marginal{" "}
                  <span className="text-white font-bold">RM0.50</span> increase
                  absorbs the rising supplier costs without triggering a
                  significant drop in order volume, ultimately maximizing your
                  gross margins.
                </p>
              </div>

              <div className="mt-8 flex justify-end relative z-10">
                <button className="bg-[#1F2937] hover:bg-[#374151] border border-[#7F92BB]/30 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all">
                  View Detailed Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
