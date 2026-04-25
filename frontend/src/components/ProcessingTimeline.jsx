// frontend/src/components/ProcessingTimeline.jsx
import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";

// Define steps outside the component so they are static
const STEPS = [
  "Reading file data...",
  "Extracting text via Z.AI GLM...",
  "Identifying items and prices...",
  "Matching with Business Context...",
  "Finalizing structured data..."
];

export default function ProcessingTimeline({ isProcessing, startTime }) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [showResultAlert, setShowResultAlert] = useState(false);
  
  // Track previous prop to detect transitions without synchronous effect warnings
  const [prevIsProcessing, setPrevIsProcessing] = useState(isProcessing);

  // Helper to format time: HH:MM:SS
  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { hour12: false });
  };

  // ✅ 1. Calculate log timestamps during render using useMemo.
  // This derives data from props without needing a separate state/Effect.
  const logs = useMemo(() => {
    if (!startTime) return [];
    return STEPS.map((msg, index) => {
      // Each step appears to take 1.2 seconds in the timeline
      const timeOffset = new Date(startTime.getTime() + index * 1200);
      return { msg, time: formatTime(timeOffset) };
    });
  }, [startTime]);

  // ✅ 2. Reset state during render phase when isProcessing changes.
  // This follows the recommended React pattern to avoid cascading render warnings.
  if (isProcessing !== prevIsProcessing) {
    setPrevIsProcessing(isProcessing);
    if (isProcessing) {
      setCurrentStep(0);
      setShowResultAlert(false);
    }
  }

  // ✅ 3. Handle the progression interval
  useEffect(() => {
    let interval;

    if (isProcessing) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < STEPS.length - 1) {
            return prev + 1;
          } else {
            // Reached the end of the log
            clearInterval(interval);
            setShowResultAlert(true);
            return prev;
          }
        });
      }, 1000); // UI increments every second
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isProcessing]);

  return (
    <div className="bg-[#1F2937] p-8 rounded-xl border border-[#7F92BB]/40 shadow-lg min-h-[360px] flex flex-col transition-all">
      <h2 className="text-xl font-bold text-white mb-8">AI Real-Time Processing Log</h2>
      
      <div className="space-y-6 relative flex-1">
        {/* Connecting Vertical Line */}
        <div className="absolute left-[11px] top-2 bottom-2 w-px bg-slate-700"></div>

        {logs.map((log, index) => (
          <div key={index} className="flex items-center space-x-6 relative">
            {/* Timestamp - shows once the step is reached */}
            <span className={`text-xs font-mono w-16 transition-opacity duration-300 ${
              index <= currentStep ? "text-slate-400 opacity-100" : "text-transparent opacity-0"
            }`}>
              {log.time}
            </span>

            {/* Indicator Dot */}
            <div className={`w-6 h-6 rounded-full border-4 border-[#1F2937] z-10 transition-all duration-500 ${
              index <= currentStep ? "bg-[#10B981] shadow-[0_0_8px_#10B981]" : "bg-slate-700"
            }`}></div>

            {/* Message */}
            <span className={`text-sm transition-all duration-500 ${
              index <= currentStep ? "text-slate-200" : "text-slate-500 opacity-40"
            }`}>
              {log.msg}
              {index === currentStep && index < STEPS.length - 1 && (
                <span className="ml-2 animate-pulse text-[#8B5CF6]">...</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* ✅ 4. Functional Review Alert: Appears when log is complete and backend is done */}
      {showResultAlert && !isProcessing && (
        <div className="mt-6 p-5 rounded-xl border border-[#4F46E5]/50 bg-[#4F46E5]/10 flex items-center justify-between animate-in zoom-in duration-300">
          <div className="flex items-center space-x-4">
            <div className="text-[#FBBF24] text-xl">⚠️</div>
            <div>
              <h4 className="text-white font-bold text-sm">Extraction Complete</h4>
              <p className="text-slate-400 text-xs">Data is ready for review in workspace</p>
            </div>
          </div>
          <Link
            to="/data/workspace"
            className="bg-[#4F46E5] hover:bg-[#4338CA] text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg active:scale-95"
          >
            Review Now
          </Link>
        </div>
      )}
    </div>
  );
}