import { useState } from "react";
import { useForm } from "react-hook-form";
import { GlassCard } from "../components/glass-card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Sparkles, Download, X } from "lucide-react";
import { toast } from "sonner";

interface JDFormData {
  role: string;
  aboutRole: string;
  experienceLevel: string;
}

export function CreateJDPage() {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [generatedJD, setGeneratedJD] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, watch, setValue } = useForm<JDFormData>();

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

  const onSubmit = async (data: JDFormData) => {
    setIsGenerating(true);
    
    // TODO: Replace with actual API call to your backend
    // Example: const response = await fetch('/api/generate-jd', { method: 'POST', body: JSON.stringify({ ...data, skills }) });
    
    // Mock API call
    setTimeout(() => {
      const mockJD = `# ${data.role}

## About the Role
${data.aboutRole}

## Key Responsibilities
- Lead and manage a team of professionals
- Develop and implement strategic initiatives
- Collaborate with cross-functional teams
- Drive innovation and continuous improvement
- Monitor and report on key performance metrics

## Required Skills
${skills.map(skill => `- ${skill}`).join('\n')}

## Experience Level
${data.experienceLevel}

## Qualifications
- Bachelor's degree in relevant field or equivalent experience
- Proven track record of success in similar role
- Excellent communication and leadership skills
- Strong analytical and problem-solving abilities
- Ability to work in a fast-paced environment

## What We Offer
- Competitive salary and benefits package
- Professional development opportunities
- Collaborative and innovative work environment
- Flexible work arrangements
- Health and wellness programs

To apply, please submit your resume and cover letter through our careers portal.`;
      
      setGeneratedJD(mockJD);
      setIsGenerating(false);
      toast.success("Job Description generated successfully!");
    }, 2000);
  };

  const downloadJD = () => {
    // TODO: Implement PDF generation
    const blob = new Blob([generatedJD], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'job-description.md';
    a.click();
    toast.success("Job Description downloaded!");
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Create Job Description</h1>
        <p className="text-muted-foreground text-lg">
          Generate professional job descriptions using AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <GlassCard>
          <div className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role">Job Role</Label>
                <Select onValueChange={(value) => setValue("role", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                    <SelectItem value="Product Manager">Product Manager</SelectItem>
                    <SelectItem value="UX Designer">UX Designer</SelectItem>
                    <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                    <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                    <SelectItem value="HR Manager">HR Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="aboutRole">About the Role</Label>
                <Textarea
                  id="aboutRole"
                  placeholder="Provide a brief summary of the role..."
                  rows={4}
                  {...register("aboutRole")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Key Skills</Label>
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

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience Level</Label>
                <Select onValueChange={(value) => setValue("experienceLevel", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2 years">0-2 years (Entry Level)</SelectItem>
                    <SelectItem value="2-5 years">2-5 years (Mid Level)</SelectItem>
                    <SelectItem value="5-10 years">5-10 years (Senior Level)</SelectItem>
                    <SelectItem value="10+ years">10+ years (Expert Level)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-secondary hover:bg-secondary/90"
                size="lg"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate JD with AI
                  </>
                )}
              </Button>
            </form>
          </div>
        </GlassCard>

        {/* Output Area */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl">Generated Job Description</h3>
              {generatedJD && (
                <Button
                  onClick={downloadJD}
                  variant="outline"
                  size="sm"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              )}
            </div>
            <div className="bg-background/50 rounded-lg p-4 min-h-[500px] max-h-[600px] overflow-auto">
              {generatedJD ? (
                <pre className="whitespace-pre-wrap font-sans">{generatedJD}</pre>
              ) : (
                <p className="text-muted-foreground text-center mt-20">
                  Fill in the form and click "Generate JD with AI" to create your job description
                </p>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
