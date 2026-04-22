import { useState } from 'react';

export default function EditableDataTable() {
  const [data, setData] = useState([
    { id: 1, item: 'Chicken', cat: 'Protein', qty: '10 kg', price: 12.00, source: 'Receipt', conf: 95 },
    { id: 2, item: 'Rice', cat: 'Carbs', qty: '5 kg', price: 4.50, source: 'Receipt', conf: 93 },
    { id: 3, item: 'Chili', cat: 'Ingredient', qty: '0.5 kg', price: 8.00, source: 'Receipt', conf: 58 }, // Low confidence
    { id: 4, item: 'Oil', cat: 'Cooking', qty: '2 L', price: 7.50, source: 'Receipt', conf: 88 },
    { id: 5, item: 'Garlic', cat: 'Ingredient', qty: '0.3 kg', price: 7.00, source: 'Receipt', conf: 76 },
  ]);

  return (
    <div className="bg-[#1F2937] rounded-xl border border-[#7F92BB]/40 shadow-2xl overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-6 border-b border-[#7F92BB]/20 flex justify-between items-center bg-[#1F2937]">
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-[#0B1220] border border-[#7F92BB]/30 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors">+ Add Row</button>
          <button className="px-4 py-2 bg-[#0B1220] border border-[#7F92BB]/30 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors">+ Add Column</button>
          <button className="px-4 py-2 bg-[#0B1220] border border-[#7F92BB]/30 rounded-lg text-xs font-bold text-slate-300 hover:text-white transition-colors">Hide Column</button>
        </div>
        <div className="flex space-x-3">
          <button className="px-6 py-2 bg-transparent text-[#2563EB] font-bold text-sm hover:bg-blue-500/5 rounded-lg transition-colors">Reset</button>
          <button className="px-6 py-2 bg-[#2563EB] text-white font-bold text-sm rounded-lg shadow-lg transition-all duration-300 ease-out hover:bg-[#3B82F6] active:scale-95"> Save Changes </button>
        </div>
      </div>

      {/* The Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-400 text-xs font-bold uppercase tracking-widest border-b border-[#7F92BB]/20 bg-[#0B1220]/30">
              <th className="px-6 py-4 w-12 text-center">#</th>
              <th className="px-6 py-4">Item</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Quantity</th>
              <th className="px-6 py-4 text-center">Unit Price (RM)</th>
              <th className="px-6 py-4 text-center">Total (RM)</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {data.map((row, idx) => (
              <tr key={row.id} className="border-b border-[#7F92BB]/10 hover:bg-white/5 transition-colors">
                <td className="px-6 py-4 text-slate-500 text-center">{idx + 1}</td>
                <td className="px-6 py-4 text-white font-medium">{row.item}</td>
                <td className="px-6 py-4 text-slate-400">{row.cat}</td>
                <td className="px-6 py-4 text-slate-300">{row.qty}</td>
                
                {/* Unit Price with logic: Blue focus for ID 1, Red warning for ID 3 */}
                <td className="px-6 py-4">
                  <div className={`mx-auto w-24 py-1.5 px-3 rounded-md text-center flex items-center justify-center space-x-2 border-2 ${
                    row.id === 1 ? 'border-blue-600 bg-blue-600/10' : 
                    row.id === 3 ? 'border-red-500/50 bg-red-500/10' : 'border-transparent'
                  }`}>
                    <span className="text-white font-mono">{row.price.toFixed(2)}</span>
                    {row.id === 3 && (
                       <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 text-slate-300 text-center font-mono">{(row.price * parseFloat(row.qty)).toFixed(2)}</td>
                <td className="px-6 py-4 text-slate-400 italic">{row.source}</td>
                
                <td className="px-6 py-4 text-right">
                  <span className={`px-3 py-1 rounded-md font-bold text-[11px] border ${
                    row.conf >= 90 ? 'bg-[#064E3B] text-[#34D399] border-[#065F46]' :
                    row.conf >= 70 ? 'bg-[#92400E]/20 text-[#F59E0B] border-[#92400E]' : 
                    'bg-red-950/40 text-red-500 border-red-900'
                  }`}>
                    {row.conf}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-6 bg-[#0B1220]/20 flex justify-between items-center">
        <p className="text-xs text-slate-500">Showing 1 to 5 of 28 items</p>
        <div className="flex space-x-2">
           {[1, 2, 3, 4, 5].map(p => (
             <button key={p} className={`w-8 h-8 rounded-md text-xs font-bold transition-all ${p === 1 ? 'bg-[#2563EB] text-white' : 'text-slate-500 hover:text-white'}`}>{p}</button>
           ))}
           <button className="w-8 h-8 rounded-md text-slate-500 hover:text-white">{' > '}</button>
        </div>
      </div>
    </div>
  );
}