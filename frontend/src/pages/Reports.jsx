import { useState } from "react";
import { generateReport } from "../services/api";

export default function Reports() {
  // --------- STATE MANAGEMENT ---------
  const [prompt, setPrompt] = useState("");
  const [reportType, setReportType] = useState("full");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  // --------- HANDLERS ---------
  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setPdfUrl(null); // Clear previous preview

    try {
      // 1. Call Backend
      const blob = await generateReport(prompt, reportType);
      
      // 2. Create Object URL for preview and download
      const fileUrl = window.URL.createObjectURL(blob);
      setPdfUrl(fileUrl);

      // 3. Programmatically Download PDF (Section C requirement)
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = `${reportType}-report-${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error("Report generation failed:", error);
      alert("Failed to generate report. Please try again or check the backend logs.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-gray-800">Custom Report Generator</h1>

      {/* SECTION A: Prompt Input Panel */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Report Type
          </label>
          <select
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="full">Full Business Summary</option>
            <option value="inventory">Inventory Health</option>
            <option value="revenue">Revenue & Sales</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Instructions for the AI
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., 'Draft a weekly revenue summary focusing on our recent price optimization...'"
            className="w-full w-full h-24 p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Generate / Export Button */}
        <div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-2 px-6 rounded-md transition-colors"
          >
            {isGenerating ? "Generating Report (10-20s)..." : "Generate & Download PDF"}
          </button>
        </div>
      </div>

      {/* SECTION B: Status / Preview Panel */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[400px] flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Report Preview</h2>
        
        <div className="flex-1 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center bg-gray-50 overflow-hidden relative">
          
          {isGenerating && (
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-500 font-medium">CrewAI is gathering data and drafting your report...</p>
            </div>
          )}

          {!isGenerating && !pdfUrl && (
             <p className="text-gray-400">Fill out the prompt above and generate a report to see it here.</p>
          )}

          {!isGenerating && pdfUrl && (
            <iframe 
              src={pdfUrl} 
              title="PDF Preview"
              className="w-full h-[600px] border-none object-cover"
            />
          )}

        </div>
      </div>
    </div>
  );
}