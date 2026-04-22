import { Code2, Heart, Lock } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Code2 className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              Kritsarat Duangin
            </span>
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for education &amp; innovation
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Kritsarat Duangin. All rights reserved.
            </p>
            <a href={getLoginUrl("/admin")} className="flex items-center gap-1.5 text-xs text-muted-foreground/60 hover:text-primary transition-colors">
              <Lock className="w-3 h-3" />
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
