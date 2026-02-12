import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileText,
  Sheet,
  Briefcase,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "./ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: FileText, label: "Create JD", path: "/dashboard/create-jd" },
  { icon: Sheet, label: "Excel Analysis", path: "/dashboard/excel-analysis" },
  { icon: Briefcase, label: "Jobs", path: "/dashboard/jobs" },
  { icon: Users, label: "Candidates", path: "/dashboard/candidates" },
  { icon: Settings, label: "Settings", path: "/dashboard/settings" },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside
        className={`bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 flex items-center justify-between border-b border-sidebar-border">
          {sidebarOpen ? (
            <div className="flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-sidebar-primary" />
              <span className="text-xl">HR Portal</span>
            </div>
          ) : (
            <Sparkles className="w-8 h-8 text-sidebar-primary mx-auto" />
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-sidebar-foreground hover:text-sidebar-primary transition-colors lg:block hidden"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-all duration-200"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
