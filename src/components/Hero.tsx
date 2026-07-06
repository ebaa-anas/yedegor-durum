import { Star, MapPin, Globe, ChevronDown, Flame } from "lucide-react";
import { motion } from "framer-motion";

interface HeroProps {
  lang: string;
  setLang: (lang: string) => void;
}

export default function Hero({ lang, setLang }: HeroProps) {
  return (
    <div className="relative w-full h-[90vh] flex flex-col justify-between overflow-hidden bg-stone-950">
      
      {/* --- CINEMATIC BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-stone-950 flex items-center justify-center">
        <motion.img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Grilling Meat"
          animate={{ scale: [1, 1.15] }}
          transition={{ duration: 25, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute min-w-full min-h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-stone-50"></div>
      </div>

      {/* --- ELITE FLOATING NAVBAR --- */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full pt-8 px-6 flex justify-between items-center text-white max-w-7xl mx-auto"
      >
        <div className="flex items-center space-x-3 bg-white/10 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl">
          <MapPin size={18} className="text-orange-500" />
          <span className="text-sm font-bold tracking-widest uppercase">Bahçekent</span>
        </div>
        
        <button 
          onClick={() => setLang(lang === "TR" ? "EN" : "TR")}
          className="flex items-center space-x-2 bg-white/10 hover:bg-orange-500 px-5 py-2.5 rounded-full backdrop-blur-md border border-white/10 shadow-2xl transition-all duration-300"
        >
          <Globe size={18} />
          <span className="text-sm font-bold uppercase">{lang === "TR" ? "EN" : "TR"}</span>
        </button>
      </motion.div>

      {/* --- ANIMATED CENTER CONTENT --- */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center px-4 mt-8">
        
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30 px-6 py-2.5 rounded-full text-sm font-extrabold mb-8 shadow-[0_0_30px_rgba(249,115,22,0.2)] backdrop-blur-sm text-orange-400"
        >
          <Flame size={18} className="animate-pulse" />
          <span className="uppercase tracking-widest">{lang === "TR" ? "Ateşten Gelen Lezzet" : "Flavor from the Fire"}</span>
        </motion.div>
        
        <motion.h1 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-stone-200 to-stone-500 tracking-tighter mb-6 drop-shadow-2xl"
        >
          YEDEGÖR <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">DÜRÜM</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-stone-300 text-lg md:text-xl max-w-2xl font-light mb-12 drop-shadow-xl"
        >
          {lang === "TR" 
            ? "Gerçek et, kusursuz baharat ve ustalık. Şehrin en iyi dürüm deneyimine hazır olun." 
            : "Real meat, perfect spices, and mastery. Get ready for the city's best wrap experience."}
        </motion.p>

        <motion.a 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          href="https://maps.app.goo.gl/BunVqgDcGdyCwK9ZA"
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full p-4 px-10 font-bold bg-white/5 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-orange-500 hover:border-orange-400 transition-all duration-500"
        >
          <div className="flex items-center space-x-4 relative z-10">
            <div className="flex space-x-1 text-yellow-400">
              <Star size={22} fill="currentColor" />
              <Star size={22} fill="currentColor" />
              <Star size={22} fill="currentColor" />
              <Star size={22} fill="currentColor" />
              <Star size={22} fill="currentColor" />
            </div>
            <span className="text-white text-lg tracking-wide uppercase">
              {lang === "TR" ? "Google'da İnceleyin" : "Review on Google"}
            </span>
          </div>
        </motion.a>
      </div>

      {/* --- ANIMATED SCROLL INDICATOR --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 flex justify-center pb-10"
      >
        <div className="flex flex-col items-center text-stone-400">
          <span className="text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-70">
            {lang === "TR" ? "Menüyü Keşfet" : "Explore Menu"}
          </span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
            <ChevronDown size={32} className="text-orange-500" />
          </motion.div>
        </div>
      </motion.div>

    </div>
  );
}