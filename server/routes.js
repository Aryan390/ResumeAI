import { createServer } from "http";
import { setupAuth } from "./auth.js";
import { storage } from "./storage.js";

export function registerRoutes(app) {
  // sets up /api/register, /api/login, /api/logout, /api/user
  setupAuth(app);

  // Resume generation endpoint
  app.post("/api/resumes", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const { prompt, title = "Generated Resume" } = req.body;
      
      if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ message: "Prompt is required" });
      }

      // Mock AI-generated resume content
      const mockResumeContent = generateMockResume(prompt);
      
      const resume = await storage.createResume({
        userId: req.user.id,
        title,
        content: mockResumeContent,
        prompt,
      });

      res.status(201).json(resume);
    } catch (error) {
      res.status(500).json({ message: "Failed to generate resume" });
    }
  });

  // Get user's resumes
  app.get("/api/resumes", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const resumes = await storage.getResumesByUserId(req.user.id);
      res.json(resumes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch resumes" });
    }
  });

  // Delete resume
  app.delete("/api/resumes/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const id = parseInt(req.params.id);
      await storage.deleteResume(id, req.user.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete resume" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function generateMockResume(prompt) {
  // This is a simplified mock implementation
  // In a real application, this would call an AI service
  const sections = {
    header: {
      name: "Alex Thompson",
      title: "Software Engineer",
      email: "alex.thompson@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA"
    },
    summary: `Experienced professional with expertise derived from: ${prompt.substring(0, 200)}...`,
    experience: [
      {
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        period: "2020 - Present",
        achievements: [
          "Led development of scalable applications",
          "Mentored junior developers",
          "Improved system performance by 40%"
        ]
      }
    ],
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "AWS"],
    education: {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Technology",
      period: "2014 - 2018"
    }
  };

  return JSON.stringify(sections, null, 2);
}