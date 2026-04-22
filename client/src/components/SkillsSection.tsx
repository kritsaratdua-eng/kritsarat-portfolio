import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Python", category: "language", level: 95, color: "from-yellow-400 to-yellow-600" },
  { name: "Java", category: "language", level: 85, color: "from-orange-400 to-red-500" },
  { name: "Lua", category: "language", level: 80, color: "from-blue-400 to-blue-600" },
  { name: "Dart", category: "language", level: 85, color: "from-cyan-400 to-cyan-600" },
  { name: "PHP", category: "language", level: 80, color: "from-purple-400 to-purple-600" },
  { name: "HTML", category: "language", level: 95, color: "from-orange-500 to-red-600" },
  { name: "C", category: "language", level: 75, color: "from-gray-400 to-gray-600" },
  { name: "React", category: "framework", level: 92, color: "from-cyan-300 to-blue-500" },
  { name: "Vue", category: "framework", level: 88, color: "from-green-400 to-emerald-600" },
  { name: "Next", category: "framework", level: 88, color: "from-gray-300 to-gray-500" },
  { name: "Flutter", category: "framework", level: 85, color: "from-blue-300 to-cyan-500" },
  { name: "MongoDB", category: "database", level: 82, color: "from-green-500 to-green-700" },
  { name: "UX/UI", category: "design", level: 88, color: "from-pink-400 to-purple-500" },
];

const categoryColors: Record<string, string> = {
  language: "bg-primary/10 border-primary/30 text-primary",
  framework: "bg-accent/10 border-accent/30 text-accent",
  database: "bg-green-500/10 border-green-500/30 text-green-400",
  design: "bg-pink-500/10 border-pink-500/30 text-pink-400",
};

const categoryLabels: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks & Tools",
  database: "Database",
  design: "Design",
};

export default function SkillsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Expertise</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Skills &amp; Technologies
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        {/* Skill groups */}
        <div className="space-y-10">
          {Object.entries(grouped).map(([category, items], groupIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: groupIdx * 0.1, duration: 0.6 }}
            >
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
                {categoryLabels[category]}
              </h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill, idx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: groupIdx * 0.1 + idx * 0.05, duration: 0.4 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className={`group relative px-5 py-3 rounded-xl border font-semibold text-sm cursor-default transition-all ${categoryColors[skill.category]}`}
                  >
                    <span>{skill.name}</span>
                    {/* Skill level tooltip */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-2 py-1 text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl z-10">
                      {skill.level}% proficiency
                    </div>
                    {/* Progress bar at bottom */}
                    <div className="absolute bottom-0 left-0 h-0.5 rounded-b-xl bg-gradient-to-r opacity-60"
                      style={{
                        width: `${skill.level}%`,
                        backgroundImage: `linear-gradient(to right, ${skill.color.replace("from-", "").replace(" to-", ", ")})`,
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Experience bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 p-6 rounded-2xl bg-card border border-border"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-foreground">10+ Years of Professional Experience</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Full-stack development across web, mobile, and educational technology
              </p>
            </div>
            <div className="flex gap-6 text-center">
              {[
                { value: "Frontend", desc: "React, Vue, Next, Flutter" },
                { value: "Backend", desc: "Python, Java, PHP, Node" },
                { value: "Teaching", desc: "Primary school coding" },
              ].map((item) => (
                <div key={item.value}>
                  <div className="text-primary font-bold text-sm">{item.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
