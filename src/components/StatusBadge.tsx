import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "ok" | "warning" | "error" | "info";
  label?: string;
  className?: string;
}

const labels = {
  ok: "OK",
  warning: "Warning",
  error: "Error",
  info: "Info",
};

const styles = {
  ok: "bg-status-ok/10 text-status-ok border-status-ok/30",
  warning: "bg-status-warning/10 text-status-warning border-status-warning/30",
  error: "bg-status-error/10 text-status-error border-status-error/30",
  info: "bg-status-info/10 text-status-info border-status-info/30",
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium border font-mono",
        styles[status],
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", `status-dot-${status}`)} />
      {label ?? labels[status]}
    </span>
  );
}
