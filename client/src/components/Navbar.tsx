import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2, Lock } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

const navLinks = [
  { label: "About", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Teaching", href: "#teaching" },
  { label: "Gallery", href: "#gallery" },
  { label: "Plans", href: "#plans" },
  { label: "Demo", href: "#demo" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#hero")}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <Code2 className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-sm text-foreground hidden sm:block">
              KD<span className="text-primary">.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/10"
              >
                {link.label}
              </button>
            ))}
            {user?.role === "admin" ? (
              <Link href="/admin">
                <span className="ml-2 px-3 py-1.5 text-sm bg-primary/20 text-primary border border-primary/30 rounded-md hover:bg-primary/30 transition-colors flex items-center gap-1.5">
                  <Lock className="w-3 h-3" />
                  Admin
                </span>
              </Link>
            ) : (
              <a href={getLoginUrl("/admin")} className="ml-2 px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity flex items-center gap-1.5 font-medium">
                <Lock className="w-3 h-3" />
                Admin Login
              </a>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-b border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-2.5 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                >
                  {link.label}
                </button>
              ))}
              {user?.role === "admin" ? (
                <Link href="/admin">
                  <span className="flex items-center gap-2 px-4 py-2.5 text-sm text-primary bg-primary/10 rounded-md">
                    <Lock className="w-3.5 h-3.5" />
                    Admin Panel
                  </span>
                </Link>
              ) : (
                <a href={getLoginUrl("/admin")} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium bg-primary text-primary-foreground rounded-md">
                  <Lock className="w-3.5 h-3.5" />
                  Admin Login
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
