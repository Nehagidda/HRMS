import { useNavigate } from "react-router";
import { FileText, Sheet, Briefcase, Users } from "lucide-react";
import { GlassCard } from "../components/glass-card";

const quickActions = [
  {
    title: "Create Job Description",
    description: "Use AI to generate professional job descriptions",
    icon: FileText,
    path: "/dashboard/create-jd",
    gradient: "from-[#14B8A6]/20 to-[#0891B2]/20",
    iconBg: "bg-[#14B8A6]/10",
    iconColor: "text-[#14B8A6]",
  },
  {
    title: "Excel Analysis",
    description: "Match candidates against job requirements",
    icon: Sheet,
    path: "/dashboard/excel-analysis",
    gradient: "from-[#0F172A]/20 to-[#1E293B]/20",
    iconBg: "bg-[#0F172A]/10",
    iconColor: "text-[#0F172A]",
  },
  {
    title: "Active Jobs",
    description: "Manage and track your job postings",
    icon: Briefcase,
    path: "/dashboard/jobs",
    gradient: "from-[#06B6D4]/20 to-[#0891B2]/20",
    iconBg: "bg-[#06B6D4]/10",
    iconColor: "text-[#06B6D4]",
  },
  {
    title: "Candidates",
    description: "View AI-shortlisted candidate profiles",
    icon: Users,
    path: "/dashboard/candidates",
    gradient: "from-[#14B8A6]/20 to-[#14B8A6]/10",
    iconBg: "bg-[#14B8A6]/10",
    iconColor: "text-[#14B8A6]",
  },
];

export function DashboardHome() {
  const navigate = useNavigate();
  const userName = "HR Manager"; // TODO: Get from auth context

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="mb-12">
        <h1 className="text-4xl mb-2">
          {getGreeting()}, {userName}
        </h1>
        <p className="text-muted-foreground text-lg">
          What would you like to accomplish today?
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <GlassCard
              key={action.path}
              onClick={() => navigate(action.path)}
              className="cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${action.gradient} p-6 rounded-lg h-full`}>
                <div
                  className={`${action.iconBg} w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <Icon className={`w-7 h-7 ${action.iconColor}`} />
                </div>
                <h3 className="text-xl mb-2">{action.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {action.description}
                </p>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Stats Overview */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="p-6">
            <p className="text-muted-foreground mb-2">Active Jobs</p>
            <p className="text-4xl">12</p>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="p-6">
            <p className="text-muted-foreground mb-2">Total Candidates</p>
            <p className="text-4xl">248</p>
          </div>
        </GlassCard>
        <GlassCard>
          <div className="p-6">
            <p className="text-muted-foreground mb-2">This Month</p>
            <p className="text-4xl">35</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
