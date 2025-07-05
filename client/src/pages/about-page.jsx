import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  Users, 
  Target, 
  Lightbulb, 
  Award, 
  Globe, 
  Heart,
  Zap,
  Shield,
  TrendingUp,
  Star,
  Coffee,
  Rocket
} from "lucide-react";

export default function AboutPage() {
  const { user, logoutMutation } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleNavigation = (path) => {
    setLocation(path);
  };

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "We believe everyone deserves the opportunity to showcase their best professional self"
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We leverage cutting-edge AI technology to make resume building effortless and effective"
    },
    {
      icon: Heart,
      title: "Human-Centered",
      description: "Our technology amplifies human potential rather than replacing the human touch"
    },
    {
      icon: Shield,
      title: "Privacy Focused",
      description: "Your personal information is secure and never shared with third parties"
    }
  ];

  const stats = [
    {
      number: "100K+",
      label: "Resumes Created",
      icon: TrendingUp
    },
    {
      number: "50K+",
      label: "Happy Users",
      icon: Users
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: Award
    },
    {
      number: "40+",
      label: "Countries",
      icon: Globe
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      description: "Former Google recruiter with 10+ years of hiring experience",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      description: "AI researcher and former Microsoft engineer",
      image: "👨‍💻"
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      description: "UX designer passionate about accessible and beautiful interfaces",
      image: "👩‍🎨"
    },
    {
      name: "David Thompson",
      role: "Head of Marketing",
      description: "Career coach helping professionals land their dream jobs",
      image: "👨‍🏫"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ResumeAI
              </div>
              <div className="hidden md:flex space-x-6">
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/pricing")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Pricing
                </Button>
                <Button
                  variant="ghost"
                  className="text-blue-600 dark:text-blue-400 font-medium"
                >
                  About
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/support")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  Support
                </Button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              {user && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-slate-600 dark:text-slate-300">
                    {user.name || user.email}
                  </span>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="border-slate-200 dark:border-slate-700"
                  >
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* About Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Empowering careers through AI
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            At ResumeAI, we believe that everyone deserves the opportunity to present their best professional self. 
            Our mission is to democratize career success by making professional resume creation accessible to all.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg text-center">
              <CardContent className="py-8">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-600 dark:text-slate-300">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="py-12">
                <div className="text-center mb-8">
                  <Rocket className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                    Our Story
                  </h2>
                </div>
                <div className="prose prose-lg max-w-none text-slate-600 dark:text-slate-300">
                  <p className="mb-6">
                    ResumeAI was born from a simple observation: creating a compelling resume shouldn't be a barrier to career success. 
                    Our founder, Sarah Johnson, spent years as a recruiter at top tech companies and saw firsthand how talented 
                    individuals were overlooked simply because they couldn't effectively communicate their value on paper.
                  </p>
                  <p className="mb-6">
                    In 2023, we set out to solve this problem by combining artificial intelligence with deep insights from 
                    recruiting professionals. Our AI doesn't just format your resume—it helps you tell your professional story 
                    in a way that resonates with hiring managers and passes through applicant tracking systems.
                  </p>
                  <p>
                    Today, we're proud to have helped over 100,000 professionals across 40+ countries land their dream jobs. 
                    From recent graduates to C-suite executives, our platform adapts to every career stage and industry.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              These core principles guide everything we do at ResumeAI
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              A passionate group of professionals dedicated to your career success
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <div className="text-6xl mb-4">{member.image}</div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <Badge variant="secondary" className="mb-2">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {member.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recognition Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="py-12">
              <div className="text-center mb-8">
                <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
                  Recognition & Awards
                </h2>
              </div>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    TechCrunch Disrupt 2024
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Startup Battlefield Finalist
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Forbes 30 Under 30
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Enterprise Technology Category
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Product Hunt #1
                  </div>
                  <div className="text-slate-600 dark:text-slate-300">
                    Product of the Day
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-lg">
            <CardContent className="py-12">
              <Coffee className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Want to join our mission?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                We're always looking for talented individuals who share our passion for empowering careers. 
                Check out our open positions or get in touch.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  View Open Positions
                </Button>
                <Button size="lg" variant="outline" onClick={() => handleNavigation("/support")}>
                  Get In Touch
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}