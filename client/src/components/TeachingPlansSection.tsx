import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FileText, Clock, Target, BookOpen, ChevronDown, ChevronUp, Users } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function TeachingPlansSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: plans = [] } = trpc.teachingPlans.list.useQuery();
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="plans" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Curriculum</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Teaching Plans
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        {plans.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center py-20 border border-dashed border-border rounded-2xl"
          >
            <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">No teaching plans yet.</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Add lesson plans via the Admin Panel</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
              >
                <button
                  onClick={() => setExpanded(expanded === plan.id ? null : plan.id)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{plan.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-1">
                        {plan.subject && (
                          <span className="text-xs text-primary">{plan.subject}</span>
                        )}
                        {plan.gradeLevel && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="w-3 h-3" />
                            {plan.gradeLevel}
                          </span>
                        )}
                        {plan.duration && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {plan.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {expanded === plan.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {expanded === plan.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 border-t border-border pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {plan.objectives && (
                          <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                              <Target className="w-4 h-4 text-primary" />
                              Objectives
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{plan.objectives}</p>
                          </div>
                        )}
                        {plan.materials && (
                          <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                              <BookOpen className="w-4 h-4 text-accent" />
                              Materials
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{plan.materials}</p>
                          </div>
                        )}
                        {plan.activities && (
                          <div className="sm:col-span-2">
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
                              <FileText className="w-4 h-4 text-green-400" />
                              Activities
                            </div>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{plan.activities}</p>
                          </div>
                        )}
                        {plan.assessment && (
                          <div>
                            <div className="text-sm font-semibold text-foreground mb-2">Assessment</div>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{plan.assessment}</p>
                          </div>
                        )}
                        {plan.notes && (
                          <div>
                            <div className="text-sm font-semibold text-foreground mb-2">Notes</div>
                            <p className="text-sm text-muted-foreground whitespace-pre-line">{plan.notes}</p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
