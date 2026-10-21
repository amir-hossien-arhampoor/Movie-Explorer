

const priorityConfig = {
  high: {
    label: "High",
    style: "bg-red-500/15 text-red-400",
  },
  medium: {
    label: "Medium",
    style: "bg-orange-500/15 text-orange-400",

  },
  low: {
    label: "Low",
    style: "bg-emerald-500/15 text-emerald-400",
  },
};

export default function TicketPriorityBadge({ priority }) {
  const config = priorityConfig[priority] || priorityConfig.medium;


  return (
    <span
      className={`inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${config.style}`}
    >
      {config.label}
    </span>
  );
}
