import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Code2, Layers } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ProjectsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: projects = [], isLoading } = trpc.projects.list.useQuery();

  const placeholders = [
    {
      id: -1, title: "Web Application Project", description: "A full-stack web application built with modern technologies. Add your projects via the Admin Panel.",
      techStack: JSON.stringify(["React", "Node.js", "MongoDB"]), liveUrl: null, githubUrl: null, featured: true, imageUrl: null, sortOrder: 0, createdAt: new Date(), updatedAt: new Date(),
    },
    {
      id: -2, title: "Mobile App Project", description: "Cross-platform mobile application using Flutter. Manage all projects from the Admin Panel.",
      techStack: JSON.stringify(["Flutter", "Dart", "Firebase"]), liveUrl: null, githubUrl: null, featured: false, imageUrl: null, sortOrder: 1, createdAt: new Date(), updatedAt: new Date(),
    },
    {
      id: -3, title: "Educational Game", description: "Interactive coding game designed to teach programming concepts to primary school students.",
      techStack: JSON.stringify(["Python", "Pygame", "Lua"]), liveUrl: null, githubUrl: null, featured: false, imageUrl: null, sortOrder: 2, createdAt: new Date(), updatedAt: new Date(),
    },
  ];

  const displayProjects = projects.length > 0 ? projects : placeholders;

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Portfolio</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Projects &amp; Work
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
          {projects.length === 0 && (
            <p className="text-muted-foreground text-sm mt-4">
              Showing placeholder projects — add real ones via the Admin Panel
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project, idx) => {
            const techStack = (() => {
              try { return JSON.parse(project.techStack || "[]") as string[]; } catch { return []; }
            })();

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
                className="group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-300"
                style={{ boxShadow: "0 0 0 0 transparent" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 30px oklch(0.72 0.19 195 / 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 transparent";
                }}
              >
                {/* Project image / placeholder */}
                <div className="h-44 bg-gradient-to-br from-secondary to-card flex items-center justify-center relative overflow-hidden">
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Layers className="w-10 h-10 opacity-30" />
                      <span className="text-xs opacity-50">No image</span>
                    </div>
                  )}
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-primary/20 border border-primary/40 rounded-full text-primary text-xs font-medium">
                      Featured
                    </div>
                  )}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-foreground text-lg mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
                    {project.description || "No description provided."}
                  </p>

                  {/* Tech stack */}
                  {techStack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 bg-secondary text-secondary-foreground text-xs rounded-md border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-3.5 h-3.5" />
                        Source
                      </a>
                    )}
                    {!project.liveUrl && !project.githubUrl && (
                      <span className="text-xs text-muted-foreground/50 italic">Links coming soon</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
