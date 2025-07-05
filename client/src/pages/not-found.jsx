import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileQuestion, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-8 max-w-md mx-auto px-6">
        <div className="space-y-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto">
            <FileQuestion className="w-10 h-10 text-white" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Page not found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}