export default function UploadSection() {
  return (
    <div className="bg-[#1F2937] p-8 rounded-xl shadow-lg border border-[#7F92BB]/40 flex flex-col h-full">
      <h2 className="text-xl font-bold text-white mb-6">Upload Data</h2>

      <div className="flex flex-col space-y-4 flex-1">
        {/* Option 1: Snap Receipt */}
        <button className="flex items-center p-4 rounded-xl border border-[#7F92BB]/30 bg-transparent hover:bg-white/5 transition-colors group text-left">
          <div className="mr-4 text-slate-400 group-hover:text-white transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Snap Receipt</h3>
            <p className="text-xs text-slate-400 mt-0.5">Use camera to take photo</p>
          </div>
        </button>

        {/* Option 2: Upload PDF */}
        <button className="flex items-center p-4 rounded-xl border border-[#7F92BB]/30 bg-transparent hover:bg-white/5 transition-colors group text-left">
          <div className="mr-4 text-slate-400 group-hover:text-white transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Upload PDF</h3>
            <p className="text-xs text-slate-400 mt-0.5">Upload invoice or document</p>
          </div>
        </button>

        {/* Option 3: Voice Note */}
        <button className="flex items-center p-4 rounded-xl border border-[#7F92BB]/30 bg-transparent hover:bg-white/5 transition-colors group text-left">
          <div className="mr-4 text-slate-400 group-hover:text-white transition-colors">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">Voice Note</h3>
            <p className="text-xs text-slate-400 mt-0.5">Speak your data</p>
          </div>
        </button>

        {/* Option 4: Drag & Drop Area */}
        <div className="mt-4 flex-1 border-2 border-dashed border-[#7F92BB]/30 rounded-xl flex items-center justify-center p-6 hover:border-[#3B82F6]/50 hover:bg-[#3B82F6]/5 transition-all cursor-pointer min-h-[140px]">
          <span className="font-bold text-white">Drag and drop files here</span>
        </div>
      </div>
    </div>
  );
}