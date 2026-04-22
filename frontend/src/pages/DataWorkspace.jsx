import DataStats from "../components/DataStats";
import EditableDataTable from "../components/EditableDataTable";

export default function DataWorkspace() {
  return (
    <>
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-[32px] font-extrabold text-white">
          Data Workspace
        </h1>
        <div className="flex items-center space-x-6">
          {/* Live Sync Indicator */}
          <div className="flex items-center space-x-2 text-sm text-[#34D399]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34D399] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#34D399]"></span>
            </span>
            <span>Live Sync</span>
          </div>
          <div className="text-sm text-slate-400">Last updated: 10s ago</div>
          {/* User Profile Bubble */}
          <div className="flex items-center space-x-3 bg-[#1F2937] px-3 py-1.5 rounded-full border border-[#7F92BB]/30">
            <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
              U
            </div>
            <span className="font-medium text-white text-sm pr-2">User</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <DataStats />
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Table Editor</h2>
        <EditableDataTable />
      </div>
    </>
  );
}
