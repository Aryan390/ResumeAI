import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  FileText, 
  LogOut, 
  Sparkles, 
  Download, 
  Edit, 
  Trash2,
  Loader2
} from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const resumeSchema = z.object({
  prompt: z.string().min(50, "Please provide at least 50 characters describing your experience"),
  experienceLevel: z.string().min(1, "Please select your experience level"),
  industry: z.string().min(1, "Please select your industry"),
});

export default function Dashboard() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [generatedResume, setGeneratedResume] = useState(null);

  const form = useForm({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      prompt: "",
      experienceLevel: "",
      industry: "",
    },
  });

  // Fetch user's resumes
  const { data: resumes, isLoading: resumesLoading } = useQuery({
    queryKey: ["/api/resumes"],
  });

  // Generate resume mutation
  const generateResumeMutation = useMutation({
    mutationFn: async (data) => {
      const res = await apiRequest("POST", "/api/resumes", {
        prompt: data.prompt,
        title: `${data.industry} Resume`,
      });
      return await res.json();
    },
    onSuccess: (resume) => {
      setGeneratedResume(resume);
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume generated!",
        description: "Your AI-powered resume has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete resume mutation
  const deleteResumeMutation = useMutation({
    mutationFn: async (id) => {
      await apiRequest("DELETE", `/api/resumes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resumes"] });
      toast({
        title: "Resume deleted",
        description: "The resume has been removed successfully.",
      });
    },
  });

  const onSubmit = (data) => {
    generateResumeMutation.mutate(data);
  };

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const formatResumeContent = (content) => {
    try {
      const parsed = JSON.parse(content);
      return parsed;
    } catch {
      return null;
    }
  };

  const displayResume = generatedResume ? formatResumeContent(generatedResume.content) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">Create your perfect resume with AI assistance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Input Form */}
          <div className="space-y-8">
            {/* AI Resume Builder */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">AI Resume Builder</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">Describe your experience and let AI create your resume</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Label htmlFor="prompt">Tell us about your professional background</Label>
                    <Textarea
                      id="prompt"
                      rows={6}
                      placeholder="E.g., I'm a software engineer with 5 years of experience in React and Node.js. I've worked at startups and led teams of 3-5 developers. I'm passionate about clean code and user experience..."
                      className="mt-3 resize-none"
                      {...form.register("prompt")}
                    />
                    {form.formState.errors.prompt && (
                      <p className="text-red-500 text-sm mt-2">{form.formState.errors.prompt.message}</p>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label>Experience Level</Label>
                      <Select onValueChange={(value) => form.setValue("experienceLevel", value)}>
                        <SelectTrigger className="mt-3">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                          <SelectItem value="senior">Senior (6-10 years)</SelectItem>
                          <SelectItem value="executive">Executive (10+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.experienceLevel && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.experienceLevel.message}</p>
                      )}
                    </div>

                    <div>
                      <Label>Industry</Label>
                      <Select onValueChange={(value) => form.setValue("industry", value)}>
                        <SelectTrigger className="mt-3">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.industry && (
                        <p className="text-red-500 text-sm mt-2">{form.formState.errors.industry.message}</p>
                      )}
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                    disabled={generateResumeMutation.isPending}
                  >
                    {generateResumeMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating your resume...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Resume
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Recent Resumes */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Recent Resumes</CardTitle>
              </CardHeader>
              <CardContent>
                {resumesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin" />
                  </div>
                ) : resumes && resumes.length > 0 ? (
                  <div className="space-y-4">
                    {resumes.map((resume) => (
                      <div key={resume.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{resume.title}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {new Date(resume.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => setGeneratedResume(resume)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => deleteResumeMutation.mutate(resume.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No resumes yet. Generate your first one!
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Resume Preview */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Generated Resume</CardTitle>
                  {displayResume && (
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {displayResume ? (
                  <div className="space-y-8">
                    {/* Resume Header */}
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {displayResume.header?.name || "Your Name"}
                      </h1>
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                        {displayResume.header?.title || "Your Title"}
                      </p>
                      <div className="flex justify-center items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <span>{displayResume.header?.email}</span>
                        <span>{displayResume.header?.phone}</span>
                        <span>{displayResume.header?.location}</span>
                      </div>
                    </div>

                    <Separator />

                    {/* Professional Summary */}
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Professional Summary
                      </h2>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {displayResume.summary}
                      </p>
                    </div>

                    <Separator />

                    {/* Experience */}
                    {displayResume.experience && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Experience
                        </h2>
                        <div className="space-y-6">
                          {displayResume.experience.map((exp, index) => (
                            <div key={index}>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                                    {exp.title}
                                  </h3>
                                  <p className="text-blue-500 font-medium">{exp.company}</p>
                                </div>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {exp.period}
                                </span>
                              </div>
                              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                                {exp.achievements?.map((achievement, i) => (
                                  <li key={i}>{achievement}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Skills */}
                    {displayResume.skills && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                          {displayResume.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    {/* Education */}
                    {displayResume.education && (
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                          Education
                        </h2>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {displayResume.education.degree}
                            </h3>
                            <p className="text-blue-500 font-medium">{displayResume.education.school}</p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {displayResume.education.period}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No resume generated yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Fill out the form to generate your first AI-powered resume
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}