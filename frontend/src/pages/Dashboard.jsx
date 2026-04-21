// src/pages/Dashboard.jsx
import { useState } from 'react';
import TrendWidget from '../components/TrendWidget';
import AlertCard from '../components/AlertCard';
import DecisionCard from '../components/DecisionCard';

export default function Dashboard() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const navItems = [
    { name: 'Dashboard' },
    { name: 'Data Extract' },
    { name: 'Insight' },
    { name: 'Quick Actions' },
    { name: 'Reports' },
    { name: 'Settings' }
  ];

  // Dummy dynamic data for the charts
  const revenueData = [10, 15, 8, 20, 14, 25, 22, 30, 28];
  const costData = [20, 18, 22, 16, 25, 20, 28, 24, 26];

  return (
    // Applied background color #0B1220
    <div className="flex h-screen bg-[#0B1220] font-sans text-slate-200">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#1F2937] shadow-xl flex flex-col border-r border-[#7F92BB]/20">
        <div className="p-8 h-24 border-b border-[#7F92BB]/20 flex items-center">
          {/* Logo empty placeholder */}
        </div>
        
        <nav className="flex-1 p-6 space-y-2">
          {navItems.map(item => (
            <button
              key={item.name}
              onClick={() => setActiveItem(item.name)}
              className={`w-full flex items-center px-5 py-3.5 rounded-xl font-medium transition duration-150 ${
                activeItem === item.name
                  ? 'bg-[#2563EB] text-white shadow-md'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-[32px] font-extrabold text-white">Dashboard</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-[#34D399]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34D399]"></span>
              </span>
              <span>Live Sync</span>
            </div>
            <div className="text-sm text-slate-400">Last updated: 10s ago</div>
            <div className="flex items-center space-x-3 bg-[#1F2937] px-3 py-1.5 rounded-full border border-[#7F92BB]/30">
              <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white">U</div>
              <span className="font-medium text-white text-sm pr-2">User</span>
            </div>
          </div>
        </header>

        {/* Middle Section (Gap increased to 8 for breathing room) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          <div className="bg-[#1F2937] p-8 rounded-xl shadow-lg border border-[#7F92BB]/40">
            <h2 className="text-xl font-bold text-white mb-6">Priority Alert Feed</h2>
            <div className="space-y-5 mb-5">
              <AlertCard color="red" message="Profit dropping: Raw material cost increased." />
              <AlertCard color="yellow" message="Inventory low: Chicken stock below 15%." />
            </div>
            <a href="#" className="text-blue-400 hover:text-blue-300 font-medium text-sm flex justify-end">
              View All Alerts
            </a>
          </div>

          <DecisionCard />
        </div>

        {/* Bottom Section (Gap increased, layout stabilized) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Widgets take up 2 columns */}
          <div className="xl:col-span-2 grid grid-cols-3 gap-6">
            <TrendWidget title="Revenue" value="RM 5,230" statusText="↑ 8.4% vs yesterday" statusType="up" chartType="revenue" data={revenueData} />
            <TrendWidget title="Cost" value="RM 3,100" statusText="↑ 6.7% vs yesterday" statusType="down" chartType="cost" data={costData} />
            <TrendWidget title="Inventory Health" value="78%" chartType="inventory" />
          </div>

          {/* AI Feed takes up 1 column */}
          <div className="bg-[#1F2937] p-8 rounded-xl shadow-lg border border-[#7F92BB]/40">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Live AI Feed</h2>
              <div className="flex items-center space-x-2 text-xs text-[#34D399]">
                <span className="h-2 w-2 rounded-full bg-[#34D399] animate-pulse"></span>
                <span>Analyzing sales data...</span>
              </div>
            </div>
            <div className="space-y-5">
              {[1, 2, 3, 4].map(item => (
                <div key={item} className="flex items-center space-x-4">
                  <span className="h-3 w-3 rounded-full bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                  <div className="flex-1 h-2.5 bg-white/10 rounded-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}