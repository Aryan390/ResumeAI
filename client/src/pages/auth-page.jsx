import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText, UserPlus, User, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signInForm = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect if already logged in
  if (user) {
    setLocation("/");
    return null;
  }

  const onSignIn = (data) => {
    loginMutation.mutate(data);
  };

  const onSignUp = (data) => {
    registerMutation.mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[conic-gradient(from_45deg,transparent,rgba(168,85,247,0.05),transparent)] dark:bg-[conic-gradient(from_45deg,transparent,rgba(168,85,247,0.02),transparent)]"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Hero Section */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-semibold text-gray-900 dark:text-white">ResumeAI</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 dark:text-white leading-tight">
                Build your perfect resume with AI
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Create professional, ATS-friendly resumes in minutes. Our AI understands what recruiters are looking for and helps you stand out.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">AI-Powered Content</h3>
                <p className="text-gray-600 dark:text-gray-400">Let AI write compelling content based on your experience</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Professional Templates</h3>
                <p className="text-gray-600 dark:text-gray-400">Choose from beautifully designed, industry-specific templates</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mt-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Instant Download</h3>
                <p className="text-gray-600 dark:text-gray-400">Download your resume as PDF or share it with a link</p>
              </div>
            </div>
          </div>
        </div>

        {/* Auth Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-gray-200/50 dark:border-gray-700/50 shadow-2xl">
            <CardContent className="p-10">
              <div className="text-center mb-10">
                <div className={`w-16 h-16 ${isSignUp ? 'bg-gradient-to-br from-green-500 to-green-600' : 'bg-gradient-to-br from-blue-500 to-blue-600'} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {isSignUp ? (
                    <UserPlus className="w-8 h-8 text-white" />
                  ) : (
                    <User className="w-8 h-8 text-white" />
                  )}
                </div>
                <h1 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {isSignUp ? "Create account" : "Welcome back"}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {isSignUp 
                    ? "Join us to start building your perfect resume" 
                    : "Sign in to your account to continue"
                  }
                </p>
              </div>

              {isSignUp ? (
                <form onSubmit={signUpForm.handleSubmit(onSignUp)} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-gray-900 dark:text-white">Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      className="mt-3 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      {...signUpForm.register("name")}
                    />
                    {signUpForm.formState.errors.name && (
                      <p className="text-red-500 text-sm mt-2">{signUpForm.formState.errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="signup-email" className="text-gray-900 dark:text-white">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-3 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      {...signUpForm.register("email")}
                    />
                    {signUpForm.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-2">{signUpForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="signup-password" className="text-gray-900 dark:text-white">Password</Label>
                    <div className="relative mt-3">
                      <Input
                        id="signup-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 pr-12"
                        {...signUpForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {signUpForm.formState.errors.password && (
                      <p className="text-red-500 text-sm mt-2">{signUpForm.formState.errors.password.message}</p>
                    )}
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Must be at least 8 characters long</p>
                  </div>

                  <div>
                    <Label htmlFor="confirm-password" className="text-gray-900 dark:text-white">Confirm Password</Label>
                    <div className="relative mt-3">
                      <Input
                        id="confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 pr-12"
                        {...signUpForm.register("confirmPassword")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {signUpForm.formState.errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-2">{signUpForm.formState.errors.confirmPassword.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={signInForm.handleSubmit(onSignIn)} className="space-y-6">
                  <div>
                    <Label htmlFor="email" className="text-gray-900 dark:text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="mt-3 h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                      {...signInForm.register("email")}
                    />
                    {signInForm.formState.errors.email && (
                      <p className="text-red-500 text-sm mt-2">{signInForm.formState.errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-gray-900 dark:text-white">Password</Label>
                    <div className="relative mt-3">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="h-12 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 pr-12"
                        {...signInForm.register("password")}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {signInForm.formState.errors.password && (
                      <p className="text-red-500 text-sm mt-2">{signInForm.formState.errors.password.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </form>
              )}

              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                  <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
                  >
                    {isSignUp ? "Sign in" : "Sign up"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}