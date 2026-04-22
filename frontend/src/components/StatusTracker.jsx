export default function StatusTracker({ steps }) {
  return (
    <div className="relative flex-1 pl-4">
      {/* Connecting Vertical Line */}
      <div className="absolute left-[27px] top-4 bottom-8 w-px bg-[#7F92BB]/20"></div>

      <div className="space-y-6">
        {steps.map((step, index) => {
          // Determine styling based on the status of the step
          const isCompleted = step.status === "completed";
          const iconBgClass = isCompleted ? "bg-[#10B981]" : "bg-[#F59E0B]";
          const titleClass = "text-white text-sm font-medium";
          const subtitleClass = isCompleted
            ? "text-[#10B981] text-xs font-medium mt-0.5"
            : "text-slate-400 text-xs mt-0.5";

          return (
            <div key={index} className="relative flex items-start space-x-4">
              {/* Status Indicator Icon */}
              <div
                className={`relative z-10 w-6 h-6 rounded-full ${iconBgClass} flex items-center justify-center ring-4 ring-[#121826]`}
              >
                {isCompleted ? (
                  // Checkmark for completed steps
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                ) : (
                  // Clock icon for pending steps
                  <svg
                    className="w-3.5 h-3.5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                )}
              </div>

              {/* Step Details */}
              <div>
                <h4 className={titleClass}>{step.title}</h4>
                <p className={subtitleClass}>{step.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
