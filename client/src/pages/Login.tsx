import { motion, AnimatePresence } from "framer-motion";
import { Code2, Lock, ShieldCheck, ArrowLeft, User, Key, AlertCircle, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const { isAuthenticated, user, loading, login } = useAuth();
  const [, navigate] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if admin setup is needed
  const { data: systemInfo } = trpc.system.getInfo.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const [isSetupMode, setIsSetupMode] = useState(false);
  const setupAdmin = trpc.auth.setupAdmin.useMutation();
  const loginWithSupabase = trpc.auth.loginWithSupabase.useMutation();

  // Handle Supabase OAuth redirection and token exchange
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token && !isAuthenticated && !isSubmitting) {
        setIsSubmitting(true);
        try {
          await loginWithSupabase.mutateAsync({ accessToken: session.access_token });
          toast.success("Google login successful!");
          // Navigation will be handled by the "isAuthenticated" useEffect below
        } catch (err: any) {
          console.error("Google login failed:", err);
          setError("Failed to sync Google account with local session");
          setIsSubmitting(false);
        }
      }
    };
    checkAuth();
  }, [isAuthenticated, loginWithSupabase, isSubmitting]);

  // Automatically switch to setup mode if needed
  useEffect(() => {
    if (systemInfo?.setupNeeded) {
      setIsSetupMode(true);
    }
  }, [systemInfo]);

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (isSetupMode) {
        await setupAdmin.mutateAsync({ username, password });
        toast.success("Admin setup successful!");
      } else {
        await login({ username, password });
        toast.success("Logged in successfully");
      }
      navigate("/admin");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
      toast.error(err.message || "Failed to authenticate");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl shadow-black/40 backdrop-blur-sm bg-card/80">
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
              <h1 className="text-2xl font-bold text-foreground">
                {isSetupMode ? "Setup Admin" : "Admin Console"}
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Kritsarat Duangin — Portfolio Management
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-xl flex items-center gap-2 mb-2"
                >
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <User className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Key className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3.5 font-bold text-sm shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                isSetupMode ? "Create Admin Account" : "Access Console"
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/50"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium tracking-wider">Or secure login via</span>
              </div>
            </div>

            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({
                  provider: "google",
                  options: {
                    redirectTo: window.location.origin + "/login",
                  },
                });
              }}
              className="w-full bg-secondary/50 border border-border hover:bg-secondary/80 text-foreground rounded-xl py-3.5 font-semibold text-sm transition-all flex items-center justify-center gap-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </button>
          </form>

          {/* Toggle Setup Mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSetupMode(!isSetupMode)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {isSetupMode ? "Already have an account? Login" : "Need to setup initial admin?"}
            </button>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-muted-foreground mt-6 pt-6 border-t border-border/50">
            Securely stored on Supabase
          </p>
        </div>

        {/* Brand watermark */}
        <p className="text-center text-xs text-muted-foreground/40 mt-6">
          KD Portfolio · Admin Panel v2.0
        </p>
      </motion.div>
    </div>
  );
}
