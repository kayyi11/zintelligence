import alertRed from "../assets/alert_red.svg";
import alertYellow from "../assets/alert_yellow.svg";

export default function AlertCard({ color }) {
  const bgClass = color === "red" ? "bg-[#7F2626]" : "bg-[#966814]";

  const currentIcon = color === "red" ? alertRed : alertYellow;

  return (
    <div
      className={`h-[84px] p-5 rounded-xl flex items-center shadow-sm ${bgClass}`}
    >
      {/* 4. Display the dynamically selected icon */}
      <img
        src={currentIcon}
        alt={`${color} alert`}
        className="h-8 w-8 flex-shrink-0"
      />
    </div>
  );
}
