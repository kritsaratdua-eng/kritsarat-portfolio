import { motion } from "framer-motion";
import { Code2, Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const { isAuthenticated, user, loading } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if already logged in as admin
  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,oklch(0.22_0.02_260/0.2)_1px,transparent_1px),linear-gradient(to_bottom,oklch(0.22_0.02_260/0.2)_1px,transparent_1px)] bg-[size:60px_60px]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />

      {/* Back to portfolio */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute top-6 left-6"
      >
        <Link href="/">
          <span className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </span>
        </Link>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-black/40">
          {/* Logo + Title */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Code2 className="w-8 h-8 text-primary" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-accent/30 border border-accent/50 flex items-center justify-center">
                <Lock className="w-3 h-3 text-accent" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Kritsarat Duangin — Portfolio CMS
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">Sign in to continue</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Info box */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex gap-3">
            <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium">Owner-only access</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Only the portfolio owner can manage content. Sign in with your Manus account to proceed.
              </p>
            </div>
          </div>

          {/* Login Button */}
          <a
            href={getLoginUrl("/admin")}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:opacity-90 active:scale-95 transition-all duration-150 shadow-lg shadow-primary/25"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
            </svg>
            Sign in with Manus
          </a>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            Not the owner?{" "}
            <Link href="/">
              <span className="text-primary hover:underline cursor-pointer">
                View portfolio instead
              </span>
            </Link>
          </p>
        </div>

        {/* Brand watermark */}
        <p className="text-center text-xs text-muted-foreground/40 mt-6">
          KD Portfolio · Admin Panel v1.0
        </p>
      </motion.div>
    </div>
  );
}
