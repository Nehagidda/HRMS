import { useState } from "react";
import { useLocation } from "react-router";
import { GlassCard } from "../components/glass-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";

interface Candidate {
  id: string;
  name: string;
  matchScore: number;
  role: string;
  skills: string[];
  email: string;
  phone: string;
  location: string;
  stepsCompleted: number;
  totalSteps: number;
  currentStage: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    matchScore: 95,
    role: "Senior Software Engineer",
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    email: "sarah.j@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    stepsCompleted: 3,
    totalSteps: 4,
    currentStage: "Interview",
  },
  {
    id: "2",
    name: "Michael Chen",
    matchScore: 92,
    role: "Senior Software Engineer",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    email: "m.chen@email.com",
    phone: "+1 (555) 234-5678",
    location: "Seattle, WA",
    stepsCompleted: 2,
    totalSteps: 4,
    currentStage: "Screening",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    matchScore: 88,
    role: "Senior Software Engineer",
    skills: ["Java", "Spring Boot", "Microservices", "Kubernetes"],
    email: "emily.r@email.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    stepsCompleted: 4,
    totalSteps: 4,
    currentStage: "Offer",
  },
  {
    id: "4",
    name: "David Kim",
    matchScore: 85,
    role: "Senior Software Engineer",
    skills: ["JavaScript", "Vue.js", "MongoDB", "Redis"],
    email: "d.kim@email.com",
    phone: "+1 (555) 456-7890",
    location: "Boston, MA",
    stepsCompleted: 1,
    totalSteps: 4,
    currentStage: "Screening",
  },
  {
    id: "5",
    name: "Jennifer Lee",
    matchScore: 83,
    role: "Senior Software Engineer",
    skills: ["Go", "gRPC", "Kafka", "Elasticsearch"],
    email: "j.lee@email.com",
    phone: "+1 (555) 567-8901",
    location: "New York, NY",
    stepsCompleted: 2,
    totalSteps: 4,
    currentStage: "Interview",
  },
  {
    id: "6",
    name: "Robert Taylor",
    matchScore: 81,
    role: "Senior Software Engineer",
    skills: ["C#", ".NET Core", "Azure", "SQL Server"],
    email: "r.taylor@email.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    stepsCompleted: 1,
    totalSteps: 4,
    currentStage: "Screening",
  },
];

export function CandidatesPage() {
  const location = useLocation();
  const [selectedRole, setSelectedRole] = useState(location.state?.job || "");
  const [candidates] = useState<Candidate[]>(mockCandidates);

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-[#14B8A6]";
    if (score >= 70) return "bg-yellow-500";
    return "bg-orange-500";
  };

  const handleCall = (phone: string, name: string) => {
    window.location.href = `tel:${phone}`;
    toast.success(`Calling ${name}...`);
  };

  const filteredCandidates = selectedRole
    ? candidates.filter(c => c.role === selectedRole)
    : candidates;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Candidates</h1>
        <p className="text-muted-foreground text-lg">
          AI-shortlisted candidate profiles
        </p>
      </div>

      {/* Filter Bar */}
      <GlassCard className="mb-6">
        <div className="p-6">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">Filter by Role:</label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Roles</SelectItem>
                <SelectItem value="Senior Software Engineer">Senior Software Engineer</SelectItem>
                <SelectItem value="Product Manager">Product Manager</SelectItem>
                <SelectItem value="UX Designer">UX Designer</SelectItem>
                <SelectItem value="Data Analyst">Data Analyst</SelectItem>
              </SelectContent>
            </Select>
            <div className="ml-auto text-sm text-muted-foreground">
              Showing {filteredCandidates.length} candidates
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <GlassCard key={candidate.id} className="hover:shadow-2xl">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl mb-1">{candidate.name}</h3>
                  <p className="text-sm text-muted-foreground">{candidate.role}</p>
                </div>
                <Badge
                  className={`${getMatchScoreColor(candidate.matchScore)} text-white`}
                >
                  {candidate.matchScore}% Match
                </Badge>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">Key Skills</p>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-secondary/10 text-secondary px-2 py-1 rounded text-xs"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <a href={`mailto:${candidate.email}`} className="hover:text-secondary">
                    {candidate.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>{candidate.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{candidate.location}</span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-muted-foreground">Progress</p>
                  <p className="text-sm font-medium">
                    {candidate.stepsCompleted}/{candidate.totalSteps} Steps
                  </p>
                </div>
                <Progress
                  value={(candidate.stepsCompleted / candidate.totalSteps) * 100}
                  className="h-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Current: {candidate.currentStage}
                </p>
              </div>

              {/* Actions */}
              <Button
                onClick={() => handleCall(candidate.phone, candidate.name)}
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Candidate
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
