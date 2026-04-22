import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Users, Trophy, Code2 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const defaultExperiences = [
  {
    id: -1,
    title: "Primary School Coding Instructor",
    organization: "School / Institution",
    period: "2020 – Present",
    description: "Teaching programming fundamentals, game development, and web design to primary school students in a fun and engaging way.",
    topics: JSON.stringify(["Programming Basics", "Game Development", "Web Design", "Problem Solving"]),
    targetAudience: "Primary School Students (Grade 1-6)",
    achievements: "Helped 100+ students discover the joy of coding",
    sortOrder: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function TeachingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: experiences = [] } = trpc.teaching.list.useQuery();

  const displayData = experiences.length > 0 ? experiences : defaultExperiences;

  return (
    <section id="teaching" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent text-sm font-semibold uppercase tracking-widest">Education</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Teaching Experience
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-accent to-primary" />
        </motion.div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-accent" />
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-xl font-bold text-foreground mb-1">
                เปลี่ยนตรรกะที่ซับซ้อน ให้เป็นเรื่องสนุกสำหรับเด็กๆ
              </h3>
              <p className="text-muted-foreground text-sm">
                Transforming complex logic into engaging experiences for young minds — making coding accessible and exciting for primary school students.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Teaching topics highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { icon: Code2, label: "Programming", desc: "Basic to intermediate coding concepts", color: "text-primary" },
            { icon: Trophy, label: "Game Development", desc: "Creating fun interactive games", color: "text-accent" },
            { icon: Users, label: "Web Design", desc: "Building websites from scratch", color: "text-green-400" },
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
              className="p-5 bg-card border border-border rounded-2xl text-center hover:border-primary/30 transition-colors"
            >
              <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-3`} />
              <h4 className="font-semibold text-foreground mb-1">{item.label}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Experience cards */}
        <div className="space-y-6">
          {displayData.map((exp, idx) => {
            const topics = (() => {
              try { return JSON.parse(exp.topics || "[]") as string[]; } catch { return []; }
            })();

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.6 }}
                className="p-6 bg-card border border-border rounded-2xl hover:border-accent/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="font-bold text-foreground text-lg">{exp.title}</h3>
                      {exp.period && (
                        <span className="px-2 py-0.5 bg-accent/10 border border-accent/20 text-accent text-xs rounded-full">
                          {exp.period}
                        </span>
                      )}
                    </div>
                    {exp.organization && (
                      <p className="text-primary text-sm font-medium mb-2">{exp.organization}</p>
                    )}
                    {exp.targetAudience && (
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                        <Users className="w-4 h-4" />
                        {exp.targetAudience}
                      </div>
                    )}
                    {exp.description && (
                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">{exp.description}</p>
                    )}
                    {topics.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {topics.map((topic: string) => (
                          <span key={topic} className="px-3 py-1 bg-secondary text-secondary-foreground text-xs rounded-lg border border-border">
                            {topic}
                          </span>
                        ))}
                      </div>
                    )}
                    {exp.achievements && (
                      <div className="flex items-center gap-2 text-sm">
                        <Trophy className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-muted-foreground">{exp.achievements}</span>
                      </div>
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
