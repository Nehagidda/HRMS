import { useState } from "react";
import { useForm } from "react-hook-form";
import { GlassCard } from "../components/glass-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Edit, Trash2, Eye, X, Plus } from "lucide-react";
import { toast } from "sonner";

interface JobFormData {
  title: string;
  description: string;
  minExperience: string;
  maxExperience: string;
}

interface Job {
  id: string;
  title: string;
  datePosted: string;
  applicants: number;
  status: "active" | "closed";
}

const mockJobs: Job[] = [
  { id: "1", title: "Senior Software Engineer", datePosted: "2026-02-01", applicants: 45, status: "active" },
  { id: "2", title: "Product Manager", datePosted: "2026-02-05", applicants: 32, status: "active" },
  { id: "3", title: "UX Designer", datePosted: "2026-02-08", applicants: 28, status: "active" },
  { id: "4", title: "Data Analyst", datePosted: "2026-01-15", applicants: 67, status: "closed" },
  { id: "5", title: "Marketing Manager", datePosted: "2026-02-10", applicants: 19, status: "active" },
];

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  
  const { register, handleSubmit, reset } = useForm<JobFormData>();

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
        setSkillInput("");
      }
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const onSubmit = (data: JobFormData) => {
    console.log("Job data:", { ...data, skills });
    
    // TODO: Replace with actual API call to your backend
    // Example: await fetch('/api/jobs', { method: 'POST', body: JSON.stringify({ ...data, skills }) });
    
    const newJob: Job = {
      id: String(jobs.length + 1),
      title: data.title,
      datePosted: new Date().toISOString().split('T')[0],
      applicants: 0,
      status: "active",
    };
    
    setJobs([newJob, ...jobs]);
    reset();
    setSkills([]);
    toast.success("Job posted successfully!");
  };

  const handleDelete = (id: string) => {
    // TODO: Replace with actual API call
    setJobs(jobs.filter(job => job.id !== id));
    toast.success("Job deleted successfully!");
  };

  const toggleStatus = (id: string) => {
    // TODO: Replace with actual API call
    setJobs(jobs.map(job => 
      job.id === id 
        ? { ...job, status: job.status === "active" ? "closed" : "active" } 
        : job
    ));
    toast.success("Job status updated!");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Job Management</h1>
        <p className="text-muted-foreground text-lg">
          Create and manage your job postings
        </p>
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="create">Create New Job</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <GlassCard>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Date Posted</TableHead>
                    <TableHead>Applicants</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell className="font-medium">{job.title}</TableCell>
                      <TableCell>{job.datePosted}</TableCell>
                      <TableCell>{job.applicants}</TableCell>
                      <TableCell>
                        <Badge
                          variant={job.status === "active" ? "default" : "secondary"}
                          className={job.status === "active" ? "bg-secondary hover:bg-secondary/90" : ""}
                        >
                          {job.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.info("View job details")}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toast.info("Edit job")}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStatus(job.id)}
                          >
                            {job.status === "active" ? "Close" : "Reopen"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(job.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </GlassCard>
        </TabsContent>

        <TabsContent value="create">
          <GlassCard>
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Role Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior Software Engineer"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed job description..."
                    rows={8}
                    {...register("description", { required: true })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills</Label>
                  <div className="space-y-2">
                    <Input
                      id="skills"
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyDown={addSkill}
                    />
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 bg-secondary/10 text-secondary px-3 py-1 rounded-full"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:bg-secondary/20 rounded-full p-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minExperience">Min Experience (years)</Label>
                    <Input
                      id="minExperience"
                      type="number"
                      placeholder="0"
                      {...register("minExperience")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxExperience">Max Experience (years)</Label>
                    <Input
                      id="maxExperience"
                      type="number"
                      placeholder="15"
                      {...register("maxExperience")}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-secondary hover:bg-secondary/90"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Publish Job
                </Button>
              </form>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
