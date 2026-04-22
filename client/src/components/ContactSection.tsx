import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, Linkedin, Github, MapPin, Globe, ExternalLink } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: contact } = trpc.contact.get.useQuery();

  const links = [
    { icon: Mail, label: "Email", value: contact?.email, href: contact?.email ? `mailto:${contact.email}` : null, color: "text-primary" },
    { icon: Phone, label: "Phone", value: contact?.phone, href: contact?.phone ? `tel:${contact.phone}` : null, color: "text-green-400" },
    { icon: Linkedin, label: "LinkedIn", value: contact?.linkedinUrl ? "linkedin.com/in/kritsarat" : null, href: contact?.linkedinUrl, color: "text-blue-400" },
    { icon: Github, label: "GitHub", value: contact?.githubUrl ? "github.com/kritsarat" : null, href: contact?.githubUrl, color: "text-foreground" },
    { icon: Globe, label: "Website", value: contact?.websiteUrl, href: contact?.websiteUrl, color: "text-accent" },
    { icon: MapPin, label: "Location", value: contact?.location, href: null, color: "text-red-400" },
  ].filter((item) => item.value);

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Contact &amp; Social Links
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* CTA banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mb-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
          >
            <h3 className="text-xl font-bold text-foreground mb-2">
              Let's Build Something Amazing Together
            </h3>
            <p className="text-muted-foreground text-sm">
              Whether it's a software project, educational program, or collaboration — I'm always open to exciting opportunities.
            </p>
          </motion.div>

          {/* Contact links grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {links.map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + idx * 0.08, duration: 0.5 }}
              >
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/40 hover:bg-card/80 transition-all group"
                  >
                    <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium text-foreground truncate">{item.value}</div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                    <div className={`w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">{item.label}</div>
                      <div className="text-sm font-medium text-foreground">{item.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {links.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-center py-12 border border-dashed border-border rounded-2xl"
            >
              <Mail className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Contact info will appear here.</p>
              <p className="text-muted-foreground/60 text-xs mt-1">Update via the Admin Panel</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
