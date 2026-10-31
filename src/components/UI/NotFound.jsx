/**
 * NotFound.jsx
 * Generic "record not found" empty state card.
 * Reused across StudentDetailPage, StudentEditPage, etc.
 */
import Button from "./Button";

export default function NotFound({ message = "Record not found.", onBack, backLabel = "Go Back" }) {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-12 text-center max-w-lg mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mx-auto text-muted-foreground mb-4"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <h3 className="text-lg font-semibold text-foreground">Not Found</h3>
      <p className="text-muted-foreground mt-1 mb-4 text-sm">{message}</p>
      {onBack && (
        <Button variant="outline" onClick={onBack}>
          {backLabel}
        </Button>
      )}
    </div>
  );
}
