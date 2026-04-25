//frontend/src/pages/DataPage.jsx

import { useState } from "react";
import UploadSection from "../components/UploadSection";
import ProcessingTimeline from "../components/ProcessingTimeline";
import ExtractionSummary from "../components/ExtractionSummary";

export default function DataPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [summaryData, setSummaryData] = useState(null); // ✅ Fixed state

  const handleStart = (time) => {
    setStartTime(time);
    setIsProcessing(true);
    setSummaryData(null); 
  };

  const handleComplete = (backendResponse) => {
    setIsProcessing(false);
    // ✅ backendResponse now contains the 'summary' from our logic
    setSummaryData(backendResponse.summary); 
  };

  return (
    <div className="animate-in fade-in duration-500">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-[32px] font-extrabold text-white">Data Extract</h1>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-4">
          <UploadSection onUploadStart={handleStart} onUploadComplete={handleComplete} />
        </div>
        <div className="xl:col-span-8 flex flex-col space-y-6">
          <ProcessingTimeline isProcessing={isProcessing} startTime={startTime} />
          {/* ✅ Pass the summaryData to the component */}
          <ExtractionSummary data={summaryData} />
        </div>
      </div>
    </div>
  );
}