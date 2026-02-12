import { cn } from "./ui/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function GlassCard({ children, className, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-card/50 backdrop-blur-sm border border-border rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      {children}
    </div>
  );
}
