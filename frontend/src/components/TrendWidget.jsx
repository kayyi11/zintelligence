export default function TrendWidget({
  title,
  value,
  statusText,
  statusType,
  chartType,
  data = [],
}) {
  const isUp = statusType === "up";

  const colors = {
    revenue: { stroke: "#3B82F6", fill: "rgba(59, 130, 246, 0.25)" },
    cost: { stroke: "#EF4444", fill: "rgba(239, 68, 68, 0.25)" },
    inventory: { stroke: "#10B981" },
  };

  const currentStyle = colors[chartType];
  const gradientId = `fadeGradient-${chartType}`;

  const generatePath = (dataPoints) => {
    if (!dataPoints || dataPoints.length === 0) return "M0,40 L100,40";
    const max = Math.max(...dataPoints);
    const min = Math.min(...dataPoints);
    const range = max - min || 1;
    const step = 100 / (dataPoints.length - 1);

    // Convert data to X, Y coordinates
    const points = dataPoints.map((val, i) => ({
      x: i * step,
      // UPDATE: Increased amplitude from 28 to 34 for more dynamic waves!
      y: 40 - ((val - min) / range) * 34,
    }));

    let d = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p0.x + (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
    }
    return d;
  };

  const curvePath = generatePath(data);

  return (
    <div className="bg-[#1F2937] p-6 rounded-xl shadow-md border border-[#7F92BB]/40 flex flex-col relative overflow-hidden h-full min-h-[190px]">
      <div className="relative z-10 flex justify-between items-start mb-1">
        <div className="flex flex-col">
          <h3 className="text-slate-300 text-sm font-medium mb-1.5">{title}</h3>
          <p className="text-2xl font-bold text-white tracking-tight">
            {value}
          </p>
        </div>

        {statusText && (
          <div className="flex flex-col items-end">
            <span
              className={`text-sm font-bold ${isUp ? "text-[#34D399]" : "text-red-400"}`}
            >
              {statusText.split(" vs ")[0]}
            </span>
            <span
              className={`text-[11px] font-medium mt-0.5 ${isUp ? "text-[#34D399]" : "text-red-400"}`}
            >
              vs {statusText.split(" vs ")[1]}
            </span>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24">
        {chartType !== "inventory" ? (
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={currentStyle.stroke}
                  stopOpacity="0.8"
                />
                <stop
                  offset="100%"
                  stopColor={currentStyle.stroke}
                  stopOpacity="0"
                />
              </linearGradient>
            </defs>
            <path
              d={`${curvePath} L100,40 L0,40 Z`}
              fill={`url(#${gradientId})`}
            />
            <path
              d={curvePath}
              fill="none"
              stroke={currentStyle.stroke}
              strokeWidth="2.5"
            />
          </svg>
        ) : (
          <div className="w-full h-full flex items-end px-6 pb-8">
            <div className="w-full h-3 bg-[#0B1220] rounded-full overflow-hidden border border-[#7F92BB]/20 shadow-inner">
              <div
                className="h-full bg-[#10B981] rounded-full shadow-[0_0_12px_#10B981]"
                style={{ width: value }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
