export default function ActionCard({
  id,
  title,
  description,
  iconSvg,
  iconColorClass,
  activeColorClass,
  isActive,
  onClick,
}) {
  return (
    <div
      className={`bg-[#1F2937] p-4 rounded-xl border transition-all ${
        isActive
          ? `border-[${activeColorClass}] shadow-[0_0_10px_rgba(var(--tw-shadow-color),0.2)]`
          : "border-[#7F92BB]/20 hover:border-[#7F92BB]/50"
      }`}
      style={isActive ? { borderColor: activeColorClass } : {}}
    >
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg mt-1 ${iconColorClass}`}>{iconSvg}</div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-sm">{title}</h3>
          <p className="text-slate-400 text-xs mt-1 mb-3">{description}</p>
          <div className="flex justify-end">
            <button
              onClick={() => onClick(id)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isActive
                  ? "text-white"
                  : "bg-[#0B1220] border border-[#7F92BB]/30 text-slate-300 hover:text-white"
              }`}
              style={isActive ? { backgroundColor: activeColorClass } : {}}
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
