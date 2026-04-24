import { useState, useEffect } from "react";
import RevenueChart from "./RevenueChart";

export default function RevenueDashboard() {
  const [activeTab, setActiveTab] = useState("insight");
  const [insightData, setInsightData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Fetch real data from Firebase via Backend
  useEffect(() => {
    const fetchInsightData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/insight-data");
        const data = await response.json();
        setInsightData(data);
      } catch (error) {
        console.error("Error fetching insight data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInsightData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6]"></div>
        <p className="animate-pulse">Retrieving live data from Firebase...</p>
      </div>
    );
  }

  if (!insightData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-red-400 p-10 text-center">
        <p>⚠️ Intelligence Engine Offline</p>
        <p className="text-xs text-slate-500 mt-2">Could not connect to http://localhost:5000. Ensure Flask is running.</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full">
      {/* ✅ Tab Navigation: This uses setActiveTab and fixes the ESLint error */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("insight")}
          className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "insight"
              ? "bg-[#8B5CF6] text-white shadow-[0_4px_15px_-3px_rgba(139,92,246,0.5)]"
              : "bg-transparent border border-[#7F92BB]/40 text-[#7F92BB] hover:text-white"
          }`}
        >
          Insight & Prediction
        </button>
        <button
          onClick={() => setActiveTab("optimize")}
          className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
            activeTab === "optimize"
              ? "bg-[#8B5CF6] text-white shadow-[0_4px_15px_-3px_rgba(139,92,246,0.5)]"
              : "bg-transparent border border-[#7F92BB]/40 text-[#7F92BB] hover:text-white"
          }`}
        >
          Optimize
        </button>
      </div>

      <div className="flex-1 border border-[#7F92BB]/30 rounded-2xl p-6 bg-[#0B1220]/50 shadow-inner overflow-hidden flex flex-col">
        {/* ==========================================
            FEATURE 1: Total Revenue Overview (Insight Tab)
            ========================================== */}
        {activeTab === "insight" && (
          <div className="flex flex-col flex-1 animate-in fade-in duration-500 overflow-y-auto">
            <div className="flex flex-wrap gap-3 mb-8">
              {["Total Revenue", "Sales Performance", "Risk & Alerts", "Inventory Health", "Customer Insights", "Campaign & Marketing"].map((tab) => (
                <button 
                  key={tab} 
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-transparent border border-[#7F92BB]/30 text-slate-300 hover:bg-white/5 transition-all"
                >
                  {tab}
                </button>
              ))}
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Total Revenue Overview</h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-[300px]">
              <div className="lg:col-span-2 bg-[#121826] p-6 rounded-xl border border-[#7F92BB]/20 shadow-inner flex flex-col relative">
                <h4 className="text-lg font-bold text-white mb-6">Revenue Trend & Prediction</h4>
                <div className="flex-1 w-full min-h-[220px]">
                  <RevenueChart 
                    data={insightData.chartData} 
                    transitionDate={insightData.todayDate} 
                  />
                </div>
              </div>

              <div className="bg-[#1F2937] p-6 rounded-xl border border-[#8B5CF6] flex flex-col">
                <h4 className="text-[#A855F7] font-bold text-lg mb-4">AI Explanation</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {insightData.aiExplanation}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ==========================================
            FEATURE 2: Optimization & Simulation (Optimize Tab)
            ========================================== */}
        {activeTab === "optimize" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 animate-in fade-in zoom-in-95 duration-300">
            
            <div className="bg-[#0B1220] p-6 rounded-xl border border-[#7F92BB]/20 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-6">
                  {insightData.optimization.title} <span className="text-[#8B5CF6]">{insightData.optimization.adjustment}</span>
                </h3>
                <p className="text-sm text-slate-400 mb-2">Expected Profit Increase</p>
                <div className="text-4xl font-extrabold text-[#34D399] mb-4">
                  {insightData.optimization.profitGrowth}
                </div>
                <p className="text-sm text-slate-400">Confidence: <span className="text-[#34D399] font-medium">{insightData.optimization.confidence}</span></p>
              </div>
              <div className="flex items-center space-x-4 mt-8">
                <button className="flex-1 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white py-2.5 rounded-lg text-sm font-semibold transition-all">Simulate Scenario</button>
                <button className="flex-1 border border-[#8B5CF6] text-[#8B5CF6] hover:bg-[#8B5CF6]/10 py-2.5 rounded-lg text-sm font-semibold transition-all">Apply to Actions</button>
              </div>
            </div>

            <div className="bg-[#0B1220] p-6 rounded-xl border border-[#7F92BB]/20 overflow-hidden flex flex-col">
              <h3 className="text-lg font-bold text-white mb-2">Scenario Simulation</h3>
              <p className="text-sm text-slate-400 mb-6">Current vs Projected</p>
              <table className="w-full text-left text-sm">
                <tbody className="space-y-4 block">
                  {insightData.simulationMetrics.map((metric, i) => (
                    <tr key={i} className="flex items-center border-b border-[#7F92BB]/10 pb-3">
                      <td className="w-1/3 text-slate-300">{metric.label}</td>
                      <td className="w-1/4 text-center text-slate-300">RM {metric.current}</td>
                      <td className="w-1/4 text-center text-white font-medium">RM {metric.projected}</td>
                      <td className="w-auto text-right text-[#34D399] font-bold flex-1">↑ {metric.change}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-[#0B1220] p-6 rounded-xl border border-[#7F92BB]/20 flex flex-col justify-between relative overflow-hidden lg:col-span-2">
              <h3 className="text-lg font-bold text-white mb-4">Why this recommendation?</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {insightData.optimization.reasoning}
              </p>
              <div className="mt-4 flex justify-end">
                 <button className="bg-[#1F2937] hover:bg-[#374151] border border-[#7F92BB]/30 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all">View Detailed Analysis</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}