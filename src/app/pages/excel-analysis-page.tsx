import { useState, useCallback } from "react";
import { useNavigate } from "react-router";
import { GlassCard } from "../components/glass-card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Slider } from "../components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Upload, FileSpreadsheet, FileText, Zap, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export function ExcelAnalysisPage() {
  const [candidateFile, setCandidateFile] = useState<File | null>(null);
  const [jdSource, setJdSource] = useState<"upload" | "select">("select");
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [selectedJob, setSelectedJob] = useState("");
  const [threshold, setThreshold] = useState([70]);
  const [isMatching, setIsMatching] = useState(false);
  const [matchComplete, setMatchComplete] = useState(false);
  const navigate = useNavigate();

  const handleCandidateFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
        setCandidateFile(file);
        toast.success(`Uploaded: ${file.name}`);
      } else {
        toast.error("Please upload a .xlsx or .csv file");
      }
    }
  }, []);

  const handleJDFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setJdFile(file);
      toast.success(`Uploaded: ${file.name}`);
    }
  }, []);

  const handleRunMatch = async () => {
    if (!candidateFile) {
      toast.error("Please upload candidate profiles");
      return;
    }
    if (jdSource === "upload" && !jdFile) {
      toast.error("Please upload a job description");
      return;
    }
    if (jdSource === "select" && !selectedJob) {
      toast.error("Please select an active job");
      return;
    }

    setIsMatching(true);
    
    // TODO: Replace with actual API call to your backend
    // Example: 
    // const formData = new FormData();
    // formData.append('candidates', candidateFile);
    // formData.append('threshold', threshold[0].toString());
    // if (jdSource === "upload" && jdFile) formData.append('jd', jdFile);
    // if (jdSource === "select") formData.append('jobId', selectedJob);
    // const response = await fetch('/api/match-candidates', { method: 'POST', body: formData });

    // Mock API call
    setTimeout(() => {
      setIsMatching(false);
      setMatchComplete(true);
      toast.success("Matching Successful!", {
        description: "Top 20 candidates have been shortlisted based on your criteria"
      });
    }, 3000);
  };

  const viewCandidates = () => {
    navigate("/dashboard/candidates", { 
      state: { 
        filtered: true, 
        matchThreshold: threshold[0],
        job: selectedJob 
      } 
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Excel Analysis</h1>
        <p className="text-muted-foreground text-lg">
          Match candidate profiles against job requirements using AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Column 1 - Candidate Data */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileSpreadsheet className="w-6 h-6 text-secondary" />
              <h3 className="text-xl">Candidate Profiles</h3>
            </div>

            <div className="space-y-4">
              <Label>Upload Candidate Data</Label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-secondary transition-colors cursor-pointer"
                onClick={() => document.getElementById('candidate-upload')?.click()}
              >
                <input
                  id="candidate-upload"
                  type="file"
                  accept=".xlsx,.csv"
                  onChange={handleCandidateFileUpload}
                  className="hidden"
                />
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                {candidateFile ? (
                  <div>
                    <p className="text-secondary mb-1">{candidateFile.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Click to change file
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="mb-1">Drop your Excel file here or click to browse</p>
                    <p className="text-sm text-muted-foreground">
                      Accepts .xlsx or .csv files
                    </p>
                  </div>
                )}
              </div>

              {candidateFile && (
                <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4">
                  <p className="text-sm text-secondary">
                    ✓ File uploaded successfully
                  </p>
                </div>
              )}
            </div>
          </div>
        </GlassCard>

        {/* Column 2 - Job Requirement */}
        <GlassCard>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-6 h-6 text-secondary" />
              <h3 className="text-xl">Job Description</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>JD Source</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={jdSource === "select" ? "default" : "outline"}
                    className={jdSource === "select" ? "bg-secondary hover:bg-secondary/90" : ""}
                    onClick={() => setJdSource("select")}
                  >
                    Select Active Job
                  </Button>
                  <Button
                    type="button"
                    variant={jdSource === "upload" ? "default" : "outline"}
                    className={jdSource === "upload" ? "bg-secondary hover:bg-secondary/90" : ""}
                    onClick={() => setJdSource("upload")}
                  >
                    Upload JD
                  </Button>
                </div>
              </div>

              {jdSource === "select" ? (
                <div className="space-y-2">
                  <Label>Select Active Job</Label>
                  <Select onValueChange={setSelectedJob} value={selectedJob}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a job posting" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="job-1">Senior Software Engineer</SelectItem>
                      <SelectItem value="job-2">Product Manager</SelectItem>
                      <SelectItem value="job-3">UX Designer</SelectItem>
                      <SelectItem value="job-4">Data Analyst</SelectItem>
                      <SelectItem value="job-5">Marketing Manager</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-secondary transition-colors cursor-pointer"
                  onClick={() => document.getElementById('jd-upload')?.click()}
                >
                  <input
                    id="jd-upload"
                    type="file"
                    onChange={handleJDFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  {jdFile ? (
                    <div>
                      <p className="text-secondary mb-1">{jdFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Click to change file
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-1">Drop your JD file here</p>
                      <p className="text-sm text-muted-foreground">
                        PDF, DOCX, or TXT
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Matching Controls */}
      <GlassCard>
        <div className="p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Minimum Match Score</Label>
                <span className="text-2xl text-secondary">{threshold[0]}%</span>
              </div>
              <Slider
                value={threshold}
                onValueChange={setThreshold}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>

            <Button
              onClick={handleRunMatch}
              disabled={isMatching}
              className="w-full bg-secondary hover:bg-secondary/90"
              size="lg"
            >
              {isMatching ? (
                <>Analyzing...</>
              ) : (
                <>
                  <Zap className="w-5 h-5 mr-2" />
                  Run AI Match
                </>
              )}
            </Button>

            {matchComplete && (
              <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6 text-center space-y-4">
                <CheckCircle className="w-16 h-16 text-secondary mx-auto" />
                <div>
                  <h3 className="text-xl mb-2">Matching Successful!</h3>
                  <p className="text-muted-foreground mb-4">
                    20 candidates have been shortlisted based on {threshold[0]}% match threshold
                  </p>
                  <Button
                    onClick={viewCandidates}
                    className="bg-secondary hover:bg-secondary/90"
                  >
                    View Shortlisted Candidates
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
