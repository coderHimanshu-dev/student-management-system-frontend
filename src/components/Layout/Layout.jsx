/**
 * Layout.jsx
 * Main layout wrapper combining Sidebar + Header + main content area.
 * Manages sidebar open/close state for mobile.
 */
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout({ children, currentPage, onNavigate, onSearch }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area – offset on desktop */}
      <div className="lg:ml-[280px] flex flex-col min-h-screen">
        {/* Header */}
        <Header
          currentPage={currentPage}
          onMenuClick={() => setSidebarOpen(true)}
          onSearch={onSearch}
        />

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
