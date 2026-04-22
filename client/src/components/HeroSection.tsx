import { motion, type Transition } from "framer-motion";
import { ChevronDown, Sparkles, MapPin, Terminal } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: "easeOut" } as Transition,
  }),
};

export default function HeroSection() {
  const scrollToSkills = () => {
    document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-grid"
    >
      {/* Animated background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-primary text-sm font-medium mb-6 border-primary/20"
            >
              <Terminal className="w-4 h-4" />
              <span className="code-text tracking-tight">system.status: "Ready for Build"</span>
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-4"
            >
              <span className="text-foreground">Kritsarat</span>
              <br />
              <span
                className="glow-text"
                style={{
                  background: "linear-gradient(135deg, oklch(0.78 0.14 195), oklch(0.70 0.22 300))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Duangin
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg sm:text-xl text-muted-foreground font-medium mb-6 code-text"
            >
              &gt; Senior Software Developer &amp; Tech Educator
            </motion.p>

            {/* Bilingual tagline */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-8 space-y-2"
            >
              <p className="text-base sm:text-lg text-foreground/90 font-medium">
                เปลี่ยนตรรกะที่ซับซ้อน ให้เป็นเรื่องสนุกสำหรับเด็กๆ
              </p>
              <p className="text-sm sm:text-base text-muted-foreground italic">
                Transforming complex logic into engaging experiences for young minds.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-6 justify-center lg:justify-start mb-8"
            >
              {[
                { value: "10+", label: "Years Experience" },
                { value: "Full", label: "Stack Developer" },
                { value: "100+", label: "Students Taught" },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-2xl font-bold text-primary transition-transform group-hover:scale-110">{stat.value}</div>
                  <div className="text-xs text-muted-foreground code-text">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 transition-all hover:scale-105 shadow-xl shadow-primary/30 relative overflow-hidden group"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button
                onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 glass text-foreground font-bold rounded-2xl hover:border-primary hover:text-primary transition-all hover:scale-105"
              >
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Profile photo with developer effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/30 blur-2xl animate-pulse" />
              
              {/* Profile Image Container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-1 bg-gradient-to-br from-primary/50 via-white/10 to-accent/50 glass">
                <div className="w-full h-full rounded-[1.4rem] overflow-hidden">
                  <img
                    src="/manus-storage/profile_43ce6d65.jpg"
                    alt="Kritsarat Duangin"
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110"
                  />
                </div>
                
                {/* Overlay decorative elements */}
                <div className="absolute top-4 right-4 p-1.5 rounded-lg glass border-primary/20">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 glass border border-primary/30 rounded-2xl px-4 py-2.5 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_oklch(0.82_0.12_160)]" />
                  <span className="text-xs font-bold text-foreground code-text">AVAILABLE_NOW</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 glass border border-white/10 rounded-2xl px-4 py-2.5 shadow-2xl"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold text-foreground code-text">TH_BKK</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={scrollToSkills}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </section>
  );
}
