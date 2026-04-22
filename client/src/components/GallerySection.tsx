import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { data: images = [] } = trpc.gallery.list.useQuery();
  const [lightbox, setLightbox] = useState<number | null>(null);

  const openLightbox = (idx: number) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i !== null ? Math.max(0, i - 1) : null));
  const next = () => setLightbox((i) => (i !== null ? Math.min(images.length - 1, i + 1) : null));

  return (
    <section id="gallery" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold uppercase tracking-widest">Moments</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-4">
            Activity Gallery
          </h2>
          <div className="w-16 h-1 mx-auto rounded-full bg-gradient-to-r from-primary to-accent" />
        </motion.div>

        {images.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center py-20 border border-dashed border-border rounded-2xl"
          >
            <Image className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">No gallery images yet.</p>
            <p className="text-muted-foreground/60 text-xs mt-1">Add photos via the Admin Panel</p>
          </motion.div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
            {images.map((img, idx) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="break-inside-avoid cursor-pointer group relative overflow-hidden rounded-xl"
                onClick={() => openLightbox(idx)}
              >
                <img
                  src={img.imageUrl}
                  alt={img.title || "Gallery image"}
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  {img.title && (
                    <p className="text-white text-xs font-medium">{img.title}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && images[lightbox] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              {lightbox > 0 && (
                <button
                  onClick={(e) => { e.stopPropagation(); prev(); }}
                  className="absolute left-4 p-2 text-white/70 hover:text-white"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              )}
              {lightbox < images.length - 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); next(); }}
                  className="absolute right-4 p-2 text-white/70 hover:text-white"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              )}
              <motion.img
                key={lightbox}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                src={images[lightbox].imageUrl}
                alt={images[lightbox].title || ""}
                className="max-w-full max-h-[85vh] object-contain rounded-xl"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
