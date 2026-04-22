import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, ExternalLink, Monitor } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function LiveDemoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: demos = [] } = trpc.liveDemos.list.useQuery();

  return (
    <section id="demo" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Interactive</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Live Demo
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-accent to-primary" />
          <p className="text-muted-foreground text-sm mt-4 max-w-xl mx-auto">
            Interactive demonstrations of projects and educational tools — designed to showcase real-world applications
          </p>
        </motion.div>

        {demos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center py-20 border border-dashed border-border rounded-2xl"
          >
            <Monitor className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">No live demos yet.</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Add demos via the Admin Panel</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {demos.map((demo, idx) => {
              const techStack = (() => {
                try { return JSON.parse(demo.techStack || "[]") as string[]; } catch { return []; }
              })();

              return (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: idx * 0.15, duration: 0.6 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-accent/30 transition-all"
                >
                  {/* Embed area */}
                  {demo.embedUrl ? (
                    <div className="relative aspect-video bg-secondary">
                      <iframe
                        src={demo.embedUrl}
                        title={demo.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                      />
                    </div>
                  ) : demo.thumbnailUrl ? (
                    <div className="relative aspect-video overflow-hidden">
                      <img src={demo.thumbnailUrl} alt={demo.title} className="w-full h-full object-cover" />
                      {demo.demoUrl && (
                        <a
                          href={demo.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition-colors group"
                        >
                          <div className="w-16 h-16 rounded-full bg-accent/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-7 h-7 text-white ml-1" />
                          </div>
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-secondary to-card flex items-center justify-center">
                      <Monitor className="w-12 h-12 text-muted-foreground/30" />
                    </div>
                  )}

                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-lg mb-2">{demo.title}</h3>
                    {demo.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{demo.description}</p>
                    )}
                    {techStack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {techStack.map((tech: string) => (
                          <span key={tech} className="px-2 py-0.5 bg-accent/10 text-accent text-xs rounded-md border border-accent/20">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {demo.demoUrl && (
                      <a
                        href={demo.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 text-accent text-sm font-medium rounded-xl hover:bg-accent/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Open Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
