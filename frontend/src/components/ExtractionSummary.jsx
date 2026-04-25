//frontend/src/components/ExtractionSummary.jsx

export default function ExtractionSummary({ data }) {
  // Use data if provided, otherwise default to zero
  const stats = [
    { label: "Items Detected", value: data?.itemsDetected || 0, color: "text-white" },
    { label: "High Confidence", value: data?.highConfidence || 0, color: "text-[#10B981]" },
    { label: "Low Confidence", value: data?.lowConfidence || 0, color: "text-red-500" },
    { label: "Overall Accuracy", value: data ? `${data.overallAccuracy}%` : "0%", color: "text-[#10B981]" }
  ];

  return (
    <div className="bg-[#1F2937] p-8 rounded-xl border border-[#7F92BB]/40 shadow-lg mt-6">
      <h2 className="text-xl font-bold text-white mb-6">Extraction Summary</h2>
      <div className="flex items-center justify-between divide-x divide-[#7F92BB]/20">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center flex-1 px-4">
            <span className={`text-[32px] font-bold leading-none mb-2 ${stat.color}`}>
              {stat.value}
            </span>
            <span className="text-xs text-slate-400 text-center uppercase tracking-tight">
              {stat.label.split(' ').map((word, idx) => <span key={idx}>{word}<br/></span>)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}