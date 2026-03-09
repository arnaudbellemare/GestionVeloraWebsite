import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const HERO_VIDEO = "/videos/hero-bg-720.mp4"; // 26MB 720p — good quality, fast load
const HERO_POSTER = "/hero-poster.jpg"; // 351KB — shows while video buffers

// Tiny 32px base64 blur placeholder — renders instantly, zero network request
const BLUR_PLACEHOLDER =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAARACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAAAAIDBQT/xAAiEAACAQMEAgMAAAAAAAAAAAABAgADERIEITFRIkETMsH/xAAWAQEBAQAAAAAAAAAAAAAAAAABAAL/xAAXEQEBAQEAAAAAAAAAAAAAAAAAIQER/9oADAMBAAIRAxEAPwDiDgqp4a+3U1qGuZlJqKMQLePczxTX4sVwPu45MFSqqEAHE9G+8weO6tqXKB1bHfgR01l0BZfI9cTPuxTGxB23I/ZJmdRsbW6jTFElafMIRGH9xNT9YQkn/9k=";

const partnerLogos = [
  "Groupe Velora",
  "Atlas Immobilier",
  "Crown Properties",
  "Pinnacle Gestion",
  "Vertex Capital",
  "Sendoso",
];

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  // Preload poster image eagerly
  useEffect(() => {
    const img = new Image();
    img.onload = () => setPosterLoaded(true);
    img.src = HERO_POSTER;
  }, []);

  const handleCanPlay = useCallback(() => {
    setVideoReady(true);
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex flex-col justify-between items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Layer 1: Instant blur placeholder (base64 inline, zero latency) */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${BLUR_PLACEHOLDER})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
        aria-hidden
      />

      {/* Layer 2: Poster image (351KB, loads in <1s) */}
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          backgroundImage: posterLoaded ? `url(${HERO_POSTER})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: posterLoaded ? 1 : 0,
        }}
        aria-hidden
      />

      {/* Layer 3: Video (720p, 26MB — fades in when ready to play) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        style={{ opacity: videoReady ? 1 : 0 }}
        aria-hidden
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-[2] max-w-4xl px-6 lg:px-16 w-full text-center flex flex-col items-center flex-1 justify-center pt-24">
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-playfair font-bold text-[clamp(2.5rem,6vw,4.5rem)] lg:text-[clamp(3.5rem,7vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-white mb-5"
        >
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Votre tranquillité.
          </motion.span>
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Notre affaire.
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="font-sans text-lg lg:text-xl text-white/75 max-w-xl mb-8 mx-auto"
        >
          Syndicat de copropriété et gestion locative à Montréal
        </motion.p>

        <motion.a
          href="#specification"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-neutral-700 text-white mb-10 transition-colors duration-300"
        >
          <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-flash-green bg-velora-green" aria-hidden />
          <span className="font-sans text-xs font-medium uppercase tracking-wider">
            Découvrez nos services
          </span>
          <span className="text-white text-sm" aria-hidden>→</span>
        </motion.a>

        <motion.a
          href="#contact"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center gap-2 px-10 py-4 rounded-full bg-white/95 text-black font-sans font-semibold text-base hover:bg-white transition-colors duration-300 shadow-lg shadow-black/20"
        >
          Contactez-nous
          <span className="text-sm" aria-hidden="true">→</span>
        </motion.a>
      </div>

      <div className="relative z-[2] w-full pb-12 lg:pb-16 px-6 lg:px-16">
        <div className="max-w-[90rem] mx-auto flex flex-wrap justify-center items-center gap-8 lg:gap-12 opacity-80">
          {partnerLogos.map((name, i) => (
            <motion.span
              key={name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.9, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.05 }}
              className="font-sans text-sm lg:text-base font-semibold text-white/90 tracking-wide"
            >
              {name}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
