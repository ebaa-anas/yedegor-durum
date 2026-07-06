import { Clock, MapPin, Phone, Camera, Flame, Truck } from "lucide-react";

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  return (
    <div className="w-full mt-12">
      
      {/* --- TRUST & FEATURES BANNER --- */}
      <div className="bg-stone-900 border-t border-stone-800 py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-stone-800">
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 flex items-center justify-center mb-3 text-orange-500"><Flame size={32} /></div>
            <h4 className="font-bold text-white text-lg mb-1">{lang === "TR" ? "100% Odun Ateşi" : "100% Wood Fire"}</h4>
            <p className="text-stone-400 text-sm">{lang === "TR" ? "Gerçek közde pişen eşsiz lezzet" : "Unique flavor cooked over real embers"}</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 flex items-center justify-center mb-3 text-orange-500"><Truck size={32} /></div>
            <h4 className="font-bold text-white text-lg mb-1">{lang === "TR" ? "Hızlı Teslimat" : "Fast Delivery"}</h4>
            <p className="text-stone-400 text-sm">{lang === "TR" ? "Siparişiniz sıcacık kapınızda" : "Your order arrives piping hot"}</p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="w-12 h-12 flex items-center justify-center mb-3 text-orange-500"><Clock size={32} /></div>
            <h4 className="font-bold text-white text-lg mb-1">{lang === "TR" ? "Gece Açık" : "Open Late Night"}</h4>
            <p className="text-stone-400 text-sm">{lang === "TR" ? "Gece krizleri için buradayız" : "We are here for your late-night cravings"}</p>
          </div>
        </div>
      </div>

      {/* --- MAIN DARK FOOTER --- */}
      <footer className="bg-stone-950 text-stone-300 py-16 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand Info */}
          <div>
            <h2 className="text-2xl font-black text-white tracking-tighter mb-4">
              YEDEGÖR <span className="text-orange-500">DÜRÜM</span>
            </h2>
            <p className="text-stone-500 mb-6 leading-relaxed">
              {lang === "TR" 
                ? "Bahçekent'in en sevilen dürümcüsü. Özenle seçilmiş etler, günlük taze lavaş ve usta ellerden çıkan benzersiz tatlar."
                : "Bahçekent's favorite wrap shop. Carefully selected meats, daily fresh lavash, and unique flavors from master hands."}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors border border-stone-800">
                <Camera size={20} />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider">{lang === "TR" ? "İletişim" : "Contact"}</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="text-stone-500 text-sm leading-relaxed">
                  Bahçeşehir 2. Kısım Mah. Mercedes Bulvarı Cad. 1. Blok AAO, 68 Noter Yanı, Başakşehir/İstanbul 34488
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-orange-500 shrink-0" />
                <span className="text-stone-500 font-medium">+90 530 615 46 77</span>
              </li>
              <li className="pt-2">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Bahçeşehir+2.Kısım+Mah.+Mercedes+Bulvarı+No:1+Başakşehir" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-stone-800 hover:bg-orange-500 text-white text-xs font-bold py-2 px-4 rounded-lg transition-all"
                >
                  {lang === "TR" ? "Haritada Göster" : "View on Map"}
                </a>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-bold text-base mb-6 uppercase tracking-wider">{lang === "TR" ? "Çalışma Saatleri" : "Working Hours"}</h3>
            <ul className="space-y-3 bg-stone-900/50 p-6 rounded-2xl border border-stone-800">
              <li className="flex justify-between items-center pb-3 border-b border-stone-800">
                <span className="text-stone-500">{lang === "TR" ? "Hafta İçi" : "Weekdays"}</span>
                <span className="text-stone-300 font-bold">11:00 - 02:00</span>
              </li>
              <li className="flex justify-between items-center pt-3">
                <span className="text-stone-500">{lang === "TR" ? "Hafta Sonu" : "Weekends"}</span>
                <span className="text-orange-400 font-bold">11:00 - 04:00</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-stone-900 text-center flex flex-col md:flex-row justify-between items-center">
          <p className="text-stone-600 text-sm mb-4 md:mb-0">
            {lang === "TR" ? "© 2026 Yedegör Dürüm. Tüm hakları saklıdır." : "© 2026 Yedegör Dürüm. All rights reserved."}
          </p>
          <p className="text-stone-700 text-sm font-medium">Powered by Eiba Anas</p>
        </div>
      </footer>
    </div>
  );
}