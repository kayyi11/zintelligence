//frontend/src/components/EditableDataTable.jsx

import { useState, useEffect } from "react";

export default function EditableDataTable() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/data/table")
      .then(res => res.json())
      .then(data => {
        setTableData(data);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id, field, value) => {
    setTableData(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const saveRow = async (id) => {
    const row = tableData.find(r => r.id === id);
    await fetch("http://localhost:5000/api/data/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, price: row.unitPrice }),
    });
    alert(`Product ${row.item} updated!`);
  };

  if (loading) return <div className="p-20 text-center text-slate-500 animate-pulse">Syncing Unified Workspace...</div>;

  return (
    <div className="bg-[#1F2937]/50 rounded-xl border border-[#7F92BB]/20 shadow-2xl overflow-hidden backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-[11px] uppercase tracking-wider bg-[#0B1220]/50">
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4 text-center">Unit Price (RM)</th>
              <th className="px-6 py-4">Total (RM)</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Confidence</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {tableData.map((row) => (
              <tr key={row.id} className="border-b border-[#7F92BB]/10 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 font-medium text-white">{row.item}</td>
                <td className="px-6 py-4 text-slate-400">{row.category}</td>
                <td className="px-6 py-4 text-slate-300">{row.totalSales} units</td>
                <td className="px-6 py-4 text-center">
                  <input 
                    type="number" 
                    value={row.unitPrice} 
                    onChange={(e) => handleEdit(row.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="bg-[#0B1220] border border-[#7F92BB]/30 rounded px-2 py-1 w-20 text-white text-center outline-none focus:border-[#3B82F6]"
                  />
                </td>
                <td className="px-6 py-4 text-white font-mono">
                  {(row.unitPrice * row.totalSales).toFixed(2)}
                </td>
                <td className="px-6 py-4 text-slate-400">{row.source}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${row.confidence > 80 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                    {row.confidence}%
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => saveRow(row.id)} className="text-[#3B82F6] text-xs font-bold hover:brightness-125">SAVE</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}