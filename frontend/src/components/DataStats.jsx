export default function DataStats() {
  const stats = [
    { title: 'Inventory Data', records: 28, confidence: '94%', color: 'text-[#10B981]' },
    { title: 'Sales Data', records: 15, confidence: '92%', color: 'text-[#10B981]' },
    { title: 'Supplier Data', records: 8, confidence: '90%', color: 'text-[#10B981]' },
    { title: 'Performance Data', records: 6, confidence: '91%', color: 'text-[#10B981]' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-[#1F2937] p-6 rounded-xl border border-[#7F92BB]/40 shadow-lg hover:border-[#3B82F6]/50 transition-all cursor-pointer group">
          <h3 className="text-slate-200 font-bold mb-8">{stat.title}</h3>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-bold text-white">{stat.records}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Records</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.confidence}</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Confidence</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}