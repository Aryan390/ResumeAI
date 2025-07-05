import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { 
  Check, 
  Star, 
  Zap, 
  Crown, 
  FileText, 
  Download, 
  Users, 
  Shield,
  Sparkles,
  Infinity
} from "lucide-react";

export default function PricingPage() {
  const { user, logoutMutation } = useAuth();
  const [location, setLocation] = useLocation();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const handleNavigation = (path) => {
    setLocation(path);
  };

  const pricingPlans = [
    {
      name: "Free",
      price: 0,
      period: "Forever",
      description: "Perfect for getting started with your first resume",
      icon: FileText,
      popular: false,
      features: [
        "1 Resume template",
        "Basic AI assistance",
        "PDF download",
        "Community support",
        "Standard formatting"
      ],
      limitations: [
        "Limited to 3 resumes per month",
        "Basic templates only",
        "No premium features"
      ]
    },
    {
      name: "Professional",
      price: 19,
      period: "per month",
      description: "Best for job seekers and career changers",
      icon: Star,
      popular: true,
      features: [
        "Unlimited resumes",
        "15+ Premium templates",
        "Advanced AI writing",
        "Cover letter generator",
        "Multiple export formats",
        "LinkedIn optimization",
        "ATS compatibility check",
        "Priority support"
      ],
      limitations: []
    },
    {
      name: "Enterprise",
      price: 49,
      period: "per month",
      description: "For teams and recruitment agencies",
      icon: Crown,
      popular: false,
      features: [
        "Everything in Professional",
        "Team collaboration",
        "Custom branding",
        "API access",
        "Bulk resume generation",
        "Analytics dashboard",
        "White-label solution",
        "Dedicated account manager",
        "Custom integrations"
      ],
      limitations: []
    }
  ];

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Writing",
      description: "Generate compelling resume content tailored to your industry"
    },
    {
      icon: Shield,
      title: "ATS Optimized",
      description: "Ensure your resume passes applicant tracking systems"
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description: "Export to PDF, Word, and other professional formats"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work with colleagues and get feedback on your resume"
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
                  className="text-blue-600 dark:text-blue-400 font-medium"
                >
                  Pricing
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => handleNavigation("/about")}
                  className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400"
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

      {/* Pricing Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Choose the plan that best fits your career goals. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative ${
                plan.popular 
                  ? 'ring-2 ring-blue-500 dark:ring-blue-400 scale-105' 
                  : 'hover:scale-105'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                    <Sparkles className="w-4 h-4 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <plan.icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-300">
                  {plan.description}
                </CardDescription>
                <div className="pt-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      ${plan.price}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : 'bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800'
                  }`}
                  size="lg"
                >
                  {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                </Button>
                
                <div className="space-y-3">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    What's included:
                  </h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-300 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">
            Everything you need to build the perfect resume
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I change my plan at any time?",
                answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes, all paid plans come with a 14-day free trial. No credit card required."
              },
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans."
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee on all paid plans."
              }
            ].map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900 dark:text-white">
                    {faq.question}
                  </CardTitle>
                  <CardDescription className="text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="py-12">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Ready to build your perfect resume?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                Join thousands of professionals who have landed their dream jobs with ResumeAI
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Start Free Trial
                </Button>
                <Button size="lg" variant="outline" onClick={() => handleNavigation("/support")}>
                  Talk to Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}