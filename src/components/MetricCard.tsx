import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  accent?: "ok" | "warning" | "error" | "info" | "default";
  className?: string;
}

const accentStyles = {
  ok: "border-l-status-ok",
  warning: "border-l-status-warning",
  error: "border-l-status-error",
  info: "border-l-primary",
  default: "border-l-border",
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  accent = "default",
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "card-glass rounded-lg p-4 border-l-2",
        accentStyles[accent],
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="text-muted-foreground shrink-0 mt-0.5">{icon}</div>
        )}
      </div>
    </div>
  );
}
