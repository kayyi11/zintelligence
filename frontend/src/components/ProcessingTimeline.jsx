import { Link } from "react-router-dom";

export default function ProcessingTimeline() {
  const logs = [
    { time: "04:28:12", msg: "Reading receipt image...", status: "done" },
    { time: "04:28:14", msg: "Extracting text using OCR...", status: "done" },
    {
      time: "04:28:17",
      msg: "Identifying items and prices...",
      status: "done",
    },
    { time: "04:28:21", msg: "Matched with product list...", status: "done" },
    {
      time: "04:28:29",
      msg: "Checking against historical data...",
      status: "pending",
    },
    { time: "04:28:31", msg: "Detecting anomalies...", status: "pending" },
    {
      time: "04:28:40",
      msg: "Finalizing structured data...",
      status: "pending",
    },
  ];

  return (
    <div className="bg-[#1F2937] p-8 rounded-xl shadow-lg border border-[#7F92BB]/40 flex flex-col">
      {/* Header with Stop Button */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold text-white">AI Processing Log</h2>
        <button className="flex items-center space-x-2 px-4 py-1.5 rounded-lg border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
          <span className="h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></span>
          <span>Stop</span>
        </button>
      </div>

      {/* Timeline List */}
      <div className="relative pl-3 flex-1 mb-6">
        {/* The continuous vertical line connecting the dots */}
        <div className="absolute left-[17px] top-2 bottom-4 w-px bg-[#7F92BB]/30"></div>

        <div className="space-y-5">
          {logs.map((log, index) => (
            <div key={index} className="relative flex items-center space-x-6">
              {/* Timestamp */}
              <span className="text-xs text-slate-400 font-mono w-16 flex-shrink-0">
                {log.time}
              </span>

              {/* Dot Indicator */}
              <div
                className={`relative z-10 w-3 h-3 rounded-full border-2 border-[#1F2937] ${
                  log.status === "done" ? "bg-[#10B981]" : "bg-slate-500"
                }`}
              ></div>

              {/* Message */}
              <span
                className={`text-sm ${log.status === "done" ? "text-slate-300" : "text-slate-500"}`}
              >
                {log.msg}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alert */}
      <div className="mt-4 p-5 rounded-xl border border-[#4F46E5]/50 bg-[#4F46E5]/10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Warning Triangle Icon */}
          <svg
            className="w-8 h-8 text-[#FBBF24]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div>
            <h4 className="text-white font-bold text-sm">
              Low confidence detected
            </h4>
            <p className="text-slate-400 text-xs mt-0.5">
              2 fields need your review
            </p>
          </div>
        </div>

        <Link
          to="/data/workspace"
          className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors inline-flex items-center justify-center"
        >
          Review Now
        </Link>
      </div>
    </div>
  );
}
