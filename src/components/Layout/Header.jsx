/**
 * Header.jsx
 * Top header bar with page title, search, notification bell, user profile dropdown.
 */
import { useState } from "react";

/* ── Inline SVG Icons ─────────────────────────────────────────── */
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

/* ── Page title mapping ───────────────────────────────────────── */
const pageTitles = {
  dashboard: "Dashboard",
  students: "Students",
  "add-student": "Add Student",
  "edit-student": "Edit Student",
  "student-detail": "Student Details",
  courses: "Courses",
  reports: "Reports",
};

export default function Header({ currentPage, onMenuClick, onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    onSearch?.(val);
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 bg-background/80 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3">
      {/* Left: hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-accent text-foreground transition-colors cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <MenuIcon />
        </button>
        <h1 className="text-lg sm:text-xl font-semibold text-foreground">
          {pageTitles[currentPage] || "Dashboard"}
        </h1>
      </div>

      {/* Right: search, bell, profile */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Search bar */}
        <div className="hidden sm:flex items-center bg-input border border-border rounded-md px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring transition-shadow">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search students…"
            value={searchQuery}
            onChange={handleSearch}
            className="ml-2 bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground w-40 lg:w-56"
          />
        </div>

        {/* Notification bell */}
        <button className="relative p-2 rounded-md hover:bg-accent text-foreground transition-colors cursor-pointer">
          <BellIcon />
          {/* Badge count */}
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full">
            3
          </span>
        </button>

        {/* Profile dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1 rounded-md hover:bg-accent transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
              AD
            </div>
            <span className="hidden md:inline text-sm font-medium text-foreground">Admin</span>
          </button>

          {/* Dropdown menu (visual only) */}
          {profileOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
              <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-50">
                <button className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent transition-colors cursor-pointer">
                  Profile
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent transition-colors cursor-pointer">
                  Settings
                </button>
                <hr className="my-1 border-border" />
                <button className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors cursor-pointer">
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
