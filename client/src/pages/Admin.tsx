import React, { useState, useEffect } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft, Plus, Pencil, Trash2, Save, X, Loader2,
  FolderOpen, BookOpen, Image, FileText, Monitor, Phone, Upload,
  LayoutDashboard, Settings, LogOut, ChevronRight, Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

type Section = "projects" | "teaching" | "gallery" | "plans" | "demos" | "contact";

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "teaching", label: "Teaching", icon: BookOpen },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "plans", label: "Teaching Plans", icon: FileText },
  { id: "demos", label: "Live Demos", icon: Monitor },
  { id: "contact", label: "Contact Info", icon: Phone },
];

export default function Admin() {
  const { user, loading, isAuthenticated } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>("projects");
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center bg-grid">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-6 bg-grid">
        <div className="p-8 glass rounded-3xl text-center max-w-md">
          <Terminal className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">You don't have administrative privileges to access this area.</p>
          <Link href="/">
            <Button className="w-full gap-2">
              <ArrowLeft className="w-4 h-4" /> Return to Portfolio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="w-full lg:w-72 border-r border-border bg-card/30 backdrop-blur-xl flex flex-col z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight">Admin Console</h1>
            <p className="text-[10px] text-muted-foreground code-text uppercase tracking-widest">v2.0.0-stable</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-4 mb-4">Management</div>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === s.id
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <s.icon className={`w-4 h-4 ${activeSection === s.id ? "" : "text-primary/70"}`} />
              <span className="flex-1 text-left">{s.label}</span>
              {activeSection === s.id && <ChevronRight className="w-4 h-4 opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-border">
          <div className="flex items-center gap-3 p-3 glass rounded-2xl mb-4">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold uppercase">
              {user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" /> Exit to Portfolio
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden bg-grid">
        {/* Mobile Header */}
        <header className="lg:hidden p-4 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-primary" />
            <span className="font-bold">Admin Console</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold uppercase">
            {user?.name?.[0] || "A"}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeSection === "projects" && <ProjectsAdmin />}
                {activeSection === "teaching" && <TeachingAdmin />}
                {activeSection === "gallery" && <GalleryAdmin />}
                {activeSection === "plans" && <PlansAdmin />}
                {activeSection === "demos" && <DemosAdmin />}
                {activeSection === "contact" && <ContactAdmin />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

// ── Projects Admin ─────────────────────────────────────────────────────────
function ProjectsAdmin() {
  const utils = trpc.useUtils();
  const { data: projects = [] } = trpc.projects.list.useQuery();
  const createMut = trpc.projects.create.useMutation({ onSuccess: () => { utils.projects.list.invalidate(); toast.success("Project created"); setShowForm(false); setForm(emptyForm); } });
  const updateMut = trpc.projects.update.useMutation({ onSuccess: () => { utils.projects.list.invalidate(); toast.success("Project updated"); setEditing(null); setShowForm(false); } });
  const deleteMut = trpc.projects.delete.useMutation({ onSuccess: () => { utils.projects.list.invalidate(); toast.success("Project deleted"); } });

  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const emptyForm = { title: "", description: "", techStack: "", liveUrl: "", githubUrl: "", imageUrl: "", featured: false, sortOrder: 0 };
  const [form, setForm] = useState(emptyForm);

  const openEdit = (p: typeof projects[0]) => {
    setEditing(p.id);
    setForm({
      title: p.title,
      description: p.description || "",
      techStack: p.techStack || "",
      liveUrl: p.liveUrl || "",
      githubUrl: p.githubUrl || "",
      imageUrl: p.imageUrl || "",
      featured: p.featured || false,
      sortOrder: p.sortOrder || 0,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.title) return toast.error("Title is required");
    const data = { ...form };
    if (editing !== null) updateMut.mutate({ id: editing, ...data });
    else createMut.mutate(data);
  };

  return (
    <AdminSection title="Projects" onAdd={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}>
      {showForm && (
        <AdminForm onCancel={() => setShowForm(false)} onSave={handleSave} loading={createMut.isPending || updateMut.isPending}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField label="Project Title *"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Awesome App" /></FormField>
              <FormField label="Tech Stack"><Input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} placeholder='e.g. ["React", "TypeScript"]' /></FormField>
              <div className="flex items-center gap-3 p-3 glass rounded-xl border-white/5">
                <Switch id="featured" checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                <Label htmlFor="featured" className="cursor-pointer">Featured on homepage</Label>
              </div>
            </div>
            <div className="space-y-4">
              <FormField label="Live URL"><Input value={form.liveUrl} onChange={(e) => setForm({ ...form, liveUrl: e.target.value })} placeholder="https://..." /></FormField>
              <FormField label="GitHub URL"><Input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} placeholder="https://github.com/..." /></FormField>
              <FormField label="Image URL"><Input value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="https://..." /></FormField>
            </div>
          </div>
          <FormField label="Description"><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="What does this project do?" /></FormField>
        </AdminForm>
      )}
      <div className="grid grid-cols-1 gap-4">
        {projects.map((p) => (
          <AdminCard key={p.id} title={p.title} subtitle={p.description || "No description"} featured={!!p.featured} onEdit={() => openEdit(p)} onDelete={() => deleteMut.mutate({ id: p.id })} />
        ))}
        {projects.length === 0 && <EmptyState label="No projects recorded in the system." />}
      </div>
    </AdminSection>
  );
}

// ── Teaching Admin ─────────────────────────────────────────────────────────
function TeachingAdmin() {
  const utils = trpc.useUtils();
  const { data: items = [] } = trpc.teaching.list.useQuery();
  const createMut = trpc.teaching.create.useMutation({ onSuccess: () => { utils.teaching.list.invalidate(); toast.success("Experience created"); setShowForm(false); setForm(emptyForm); } });
  const updateMut = trpc.teaching.update.useMutation({ onSuccess: () => { utils.teaching.list.invalidate(); toast.success("Updated"); setEditing(null); setShowForm(false); } });
  const deleteMut = trpc.teaching.delete.useMutation({ onSuccess: () => { utils.teaching.list.invalidate(); toast.success("Deleted"); } });

  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const emptyForm = { title: "", organization: "", period: "", description: "", topics: "", targetAudience: "", achievements: "" };
  const [form, setForm] = useState(emptyForm);

  const openEdit = (item: typeof items[0]) => {
    setEditing(item.id);
    setForm({ title: item.title, organization: item.organization || "", period: item.period || "", description: item.description || "", topics: item.topics || "", targetAudience: item.targetAudience || "", achievements: item.achievements || "" });
    setShowForm(true);
  };

  return (
    <AdminSection title="Teaching Experience" onAdd={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}>
      {showForm && (
        <AdminForm onCancel={() => setShowForm(false)} onSave={() => editing !== null ? updateMut.mutate({ id: editing, ...form }) : createMut.mutate(form)} loading={createMut.isPending || updateMut.isPending}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField label="Role / Title *"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FormField>
              <FormField label="Organization"><Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} /></FormField>
              <FormField label="Period"><Input value={form.period} onChange={(e) => setForm({ ...form, period: e.target.value })} placeholder="e.g. 2022 - Present" /></FormField>
            </div>
            <div className="space-y-4">
              <FormField label="Target Audience"><Input value={form.targetAudience} onChange={(e) => setForm({ ...form, targetAudience: e.target.value })} /></FormField>
              <FormField label="Topics (JSON array)"><Input value={form.topics} onChange={(e) => setForm({ ...form, topics: e.target.value })} placeholder='e.g. ["Scratch", "Python"]' /></FormField>
              <FormField label="Achievements"><Input value={form.achievements} onChange={(e) => setForm({ ...form, achievements: e.target.value })} /></FormField>
            </div>
          </div>
          <FormField label="Role Description"><Textarea rows={4} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></FormField>
        </AdminForm>
      )}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <AdminCard key={item.id} title={item.title} subtitle={`${item.organization} | ${item.period}`} onEdit={() => openEdit(item)} onDelete={() => deleteMut.mutate({ id: item.id })} />
        ))}
        {items.length === 0 && <EmptyState label="No teaching history found." />}
      </div>
    </AdminSection>
  );
}

// ── Gallery Admin ─────────────────────────────────────────────────────────
function GalleryAdmin() {
  const utils = trpc.useUtils();
  const { data: images = [] } = trpc.gallery.list.useQuery();
  const createMut = trpc.gallery.create.useMutation({ onSuccess: () => { utils.gallery.list.invalidate(); toast.success("Image added"); setShowForm(false); setForm(emptyForm); } });
  const deleteMut = trpc.gallery.delete.useMutation({ onSuccess: () => { utils.gallery.list.invalidate(); toast.success("Image deleted"); } });
  const uploadMut = trpc.gallery.uploadImage.useMutation();

  const [showForm, setShowForm] = useState(false);
  const emptyForm = { title: "", description: "", imageUrl: "", category: "" };
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const result = await uploadMut.mutateAsync({ fileName: file.name, fileBase64: base64, mimeType: file.type });
        setForm((f) => ({ ...f, imageUrl: result.url }));
        toast.success("Image uploaded successfully");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error("Upload failed");
      setUploading(false);
    }
  };

  return (
    <AdminSection title="Gallery" onAdd={() => { setForm(emptyForm); setShowForm(true); }}>
      {showForm && (
        <AdminForm onCancel={() => setShowForm(false)} onSave={() => { if (form.imageUrl) createMut.mutate(form); else toast.error("Image URL is required"); }} loading={createMut.isPending}>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 space-y-4">
              <FormField label="Image Source">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <label className="flex-1 flex items-center justify-center gap-3 px-6 py-4 bg-primary/10 border border-dashed border-primary/30 rounded-2xl cursor-pointer hover:bg-primary/20 transition-all text-sm font-bold text-primary group">
                      {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />}
                      {uploading ? "Uploading Artifact..." : "Upload New Image"}
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <Input className="pl-10" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} placeholder="Or paste external URL" />
                  </div>
                </div>
              </FormField>
              <FormField label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FormField>
              <FormField label="Category"><Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Event, Workshop, etc." /></FormField>
            </div>
            <div className="w-full md:w-64">
              <Label className="text-xs text-muted-foreground mb-2 block uppercase font-bold tracking-widest">Preview</Label>
              <div className="aspect-square rounded-2xl glass overflow-hidden flex items-center justify-center bg-white/5 relative group">
                {form.imageUrl ? (
                  <img src={form.imageUrl} className="w-full h-full object-cover" alt="Preview" />
                ) : (
                  <Image className="w-12 h-12 text-white/10" />
                )}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
          <FormField label="Description"><Textarea rows={2} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></FormField>
        </AdminForm>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="relative group rounded-2xl overflow-hidden aspect-square glass border-white/5">
            <img src={img.imageUrl} alt={img.title || ""} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">
              <p className="text-xs font-bold text-white truncate mb-2">{img.title || "Untitled"}</p>
              <div className="flex gap-2">
                <button onClick={() => deleteMut.mutate({ id: img.id })} className="flex-1 py-2 bg-destructive/90 text-white rounded-xl hover:bg-destructive text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {images.length === 0 && <div className="col-span-full"><EmptyState label="Gallery is currently empty." /></div>}
      </div>
    </AdminSection>
  );
}

// ── Plans Admin ─────────────────────────────────────────────────────────
function PlansAdmin() {
  const utils = trpc.useUtils();
  const { data: plans = [] } = trpc.teachingPlans.list.useQuery();
  const createMut = trpc.teachingPlans.create.useMutation({ onSuccess: () => { utils.teachingPlans.list.invalidate(); toast.success("Plan created"); setShowForm(false); setForm(emptyForm); } });
  const updateMut = trpc.teachingPlans.update.useMutation({ onSuccess: () => { utils.teachingPlans.list.invalidate(); toast.success("Updated"); setEditing(null); setShowForm(false); } });
  const deleteMut = trpc.teachingPlans.delete.useMutation({ onSuccess: () => { utils.teachingPlans.list.invalidate(); toast.success("Deleted"); } });

  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const emptyForm = { title: "", subject: "", gradeLevel: "", duration: "", objectives: "", materials: "", activities: "", assessment: "", notes: "" };
  const [form, setForm] = useState(emptyForm);

  const openEdit = (p: typeof plans[0]) => {
    setEditing(p.id);
    setForm({ title: p.title, subject: p.subject || "", gradeLevel: p.gradeLevel || "", duration: p.duration || "", objectives: p.objectives || "", materials: p.materials || "", activities: p.activities || "", assessment: p.assessment || "", notes: p.notes || "" });
    setShowForm(true);
  };

  return (
    <AdminSection title="Teaching Plans" onAdd={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}>
      {showForm && (
        <AdminForm onCancel={() => setShowForm(false)} onSave={() => editing !== null ? updateMut.mutate({ id: editing, ...form }) : createMut.mutate(form)} loading={createMut.isPending || updateMut.isPending}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Plan Title *"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FormField>
            <div className="grid grid-cols-3 gap-3">
              <FormField label="Subject"><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></FormField>
              <FormField label="Grade"><Input value={form.gradeLevel} onChange={(e) => setForm({ ...form, gradeLevel: e.target.value })} /></FormField>
              <FormField label="Duration"><Input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} /></FormField>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField label="Objectives"><Textarea rows={4} value={form.objectives} onChange={(e) => setForm({ ...form, objectives: e.target.value })} /></FormField>
            <FormField label="Materials"><Textarea rows={4} value={form.materials} onChange={(e) => setForm({ ...form, materials: e.target.value })} /></FormField>
          </div>
          <FormField label="Step-by-Step Activities"><Textarea rows={6} value={form.activities} onChange={(e) => setForm({ ...form, activities: e.target.value })} /></FormField>
        </AdminForm>
      )}
      <div className="grid grid-cols-1 gap-4">
        {plans.map((p) => (
          <AdminCard key={p.id} title={p.title} subtitle={`${p.subject} | ${p.gradeLevel}`} onEdit={() => openEdit(p)} onDelete={() => deleteMut.mutate({ id: p.id })} />
        ))}
        {plans.length === 0 && <EmptyState label="No teaching plans found." />}
      </div>
    </AdminSection>
  );
}

// ── Demos Admin ─────────────────────────────────────────────────────────
function DemosAdmin() {
  const utils = trpc.useUtils();
  const { data: demos = [] } = trpc.liveDemos.list.useQuery();
  const createMut = trpc.liveDemos.create.useMutation({ onSuccess: () => { utils.liveDemos.list.invalidate(); toast.success("Demo created"); setShowForm(false); setForm(emptyForm); } });
  const updateMut = trpc.liveDemos.update.useMutation({ onSuccess: () => { utils.liveDemos.list.invalidate(); toast.success("Updated"); setEditing(null); setShowForm(false); } });
  const deleteMut = trpc.liveDemos.delete.useMutation({ onSuccess: () => { utils.liveDemos.list.invalidate(); toast.success("Deleted"); } });

  const [editing, setEditing] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const emptyForm = { title: "", description: "", demoUrl: "", embedUrl: "", techStack: "", thumbnailUrl: "" };
  const [form, setForm] = useState(emptyForm);

  const openEdit = (d: typeof demos[0]) => {
    setEditing(d.id);
    setForm({ title: d.title, description: d.description || "", demoUrl: d.demoUrl || "", embedUrl: d.embedUrl || "", techStack: d.techStack || "", thumbnailUrl: d.thumbnailUrl || "" });
    setShowForm(true);
  };

  return (
    <AdminSection title="Live Demos" onAdd={() => { setEditing(null); setForm(emptyForm); setShowForm(true); }}>
      {showForm && (
        <AdminForm onCancel={() => setShowForm(false)} onSave={() => editing !== null ? updateMut.mutate({ id: editing, ...form }) : createMut.mutate(form)} loading={createMut.isPending || updateMut.isPending}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FormField label="Demo Title *"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></FormField>
              <FormField label="Tech Stack (JSON)"><Input value={form.techStack} onChange={(e) => setForm({ ...form, techStack: e.target.value })} /></FormField>
              <FormField label="Thumbnail URL"><Input value={form.thumbnailUrl} onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })} /></FormField>
            </div>
            <div className="space-y-4">
              <FormField label="Demo URL"><Input value={form.demoUrl} onChange={(e) => setForm({ ...form, demoUrl: e.target.value })} /></FormField>
              <FormField label="Embed URL"><Input value={form.embedUrl} onChange={(e) => setForm({ ...form, embedUrl: e.target.value })} placeholder="iframe src" /></FormField>
            </div>
          </div>
          <FormField label="Description"><Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></FormField>
        </AdminForm>
      )}
      <div className="grid grid-cols-1 gap-4">
        {demos.map((d) => (
          <AdminCard key={d.id} title={d.title} subtitle={d.demoUrl || "No URL"} onEdit={() => openEdit(d)} onDelete={() => deleteMut.mutate({ id: d.id })} />
        ))}
        {demos.length === 0 && <EmptyState label="No live demos available." />}
      </div>
    </AdminSection>
  );
}

// ── Contact Admin ─────────────────────────────────────────────────────────
function ContactAdmin() {
  const utils = trpc.useUtils();
  const { data: contact } = trpc.contact.get.useQuery();
  const updateMut = trpc.contact.update.useMutation({ onSuccess: () => { utils.contact.get.invalidate(); toast.success("Settings updated"); } });

  const [form, setForm] = useState({
    email: "", phone: "", linkedinUrl: "", githubUrl: "", twitterUrl: "", websiteUrl: "", location: ""
  });

  useEffect(() => {
    if (contact) {
      setForm({
        email: contact.email || "",
        phone: contact.phone || "",
        linkedinUrl: contact.linkedinUrl || "",
        githubUrl: contact.githubUrl || "",
        twitterUrl: contact.twitterUrl || "",
        websiteUrl: contact.websiteUrl || "",
        location: contact.location || "",
      });
    }
  }, [contact]);

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-primary">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Contact Settings</h2>
          <p className="text-sm text-muted-foreground">Global contact information and social links.</p>
        </div>
      </div>
      
      <div className="glass border-white/5 rounded-3xl p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Public Email"><Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></FormField>
          <FormField label="Phone Number"><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></FormField>
          <FormField label="LinkedIn URL"><Input value={form.linkedinUrl} onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })} /></FormField>
          <FormField label="GitHub Profile"><Input value={form.githubUrl} onChange={(e) => setForm({ ...form, githubUrl: e.target.value })} /></FormField>
          <FormField label="X / Twitter"><Input value={form.twitterUrl} onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })} /></FormField>
          <FormField label="Personal Website"><Input value={form.websiteUrl} onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })} /></FormField>
        </div>
        <FormField label="Physical Location"><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Bangkok, Thailand" /></FormField>
        
        <div className="pt-4">
          <Button onClick={() => updateMut.mutate(form)} disabled={updateMut.isPending} className="w-full sm:w-auto px-8 gap-2 h-12 rounded-2xl shadow-lg shadow-primary/20">
            {updateMut.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Sync System Configuration
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Shared UI components ─────────────────────────────────────────────────────
function AdminSection({ title, onAdd, children }: { title: string; onAdd: () => void; children: React.ReactNode }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage and update your {title.toLowerCase()} list.</p>
        </div>
        <Button onClick={onAdd} className="gap-2 h-12 rounded-2xl shadow-xl shadow-primary/20">
          <Plus className="w-5 h-5" /> Add New Entry
        </Button>
      </div>
      <div className="pb-20">
        {children}
      </div>
    </div>
  );
}

function AdminForm({ onCancel, onSave, loading, children }: { onCancel: () => void; onSave: () => void; loading: boolean; children: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass border-primary/30 rounded-[2rem] p-8 mb-12 shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Pencil className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-bold">Edit System Record</h3>
      </div>
      
      <div className="space-y-6">
        {children}
      </div>

      <div className="flex flex-wrap gap-4 pt-10 border-t border-white/5 mt-8">
        <Button onClick={onSave} disabled={loading} className="px-10 h-12 rounded-2xl shadow-xl shadow-primary/20 gap-2">
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Commit Changes
        </Button>
        <Button variant="outline" onClick={onCancel} className="px-10 h-12 rounded-2xl border-white/10 hover:bg-white/5 gap-2">
          <X className="w-4 h-4" /> Discard
        </Button>
      </div>
    </motion.div>
  );
}

function AdminCard({ title, subtitle, featured, onEdit, onDelete }: { title: string; subtitle: string; featured?: boolean; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="group flex items-center gap-4 p-5 glass border-white/5 rounded-3xl hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        <FileText className="w-6 h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h4 className="font-bold truncate">{title}</h4>
          {featured && <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest border border-emerald-400/20">Featured</span>}
        </div>
        <p className="text-xs text-muted-foreground truncate mt-1">{subtitle}</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-2xl transition-all">
          <Pencil className="w-5 h-5" />
        </button>
        <button onClick={onDelete} className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-2xl transition-all">
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">{label}</Label>
      {children}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="text-center py-20 glass border-dashed border-white/10 rounded-[2rem] bg-white/[0.02]">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
        <Terminal className="w-8 h-8 text-white/20" />
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
      <p className="text-[10px] text-muted-foreground/50 uppercase tracking-widest mt-2">awaiting_input...</p>
    </div>
  );
}
