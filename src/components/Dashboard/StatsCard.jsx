/**
 * StatsCard.jsx
 * A statistics card with title, value, icon, trend indicator, and color accent.
 */
export default function StatsCard({ title, value, icon, trend, color = "bg-primary" }) {
  const isPositive = trend && trend > 0;
  const isNegative = trend && trend < 0;

  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-5 hover:scale-[1.02] transition-transform duration-200 cursor-default">
      <div className="flex items-start justify-between">
        {/* Icon container */}
        <div className={`${color} text-primary-foreground p-2.5 rounded-md`}>
          {icon}
        </div>

        {/* Trend indicator */}
        {trend !== undefined && trend !== null && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded-full ${
              isPositive
                ? "bg-chart-2/15 text-chart-2"
                : isNegative
                ? "bg-destructive/15 text-destructive"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {/* Arrow icon */}
            {isPositive && (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5"><polyline points="18 15 12 9 6 15" /></svg>
            )}
            {isNegative && (
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5"><polyline points="6 9 12 15 18 9" /></svg>
            )}
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      {/* Value & label */}
      <div className="mt-4">
        <p className="text-3xl font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-1">{title}</p>
      </div>
    </div>
  );
}
