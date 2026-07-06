import { useState } from "react";
import Hero from "./components/Hero";
import MenuContainer from "./components/MenuContainer";
import Footer from "./components/Footer";

export default function App() {
  // Global Language State: Controls the entire website
  const [lang, setLang] = useState("TR");

  return (
    <div className="min-h-screen bg-stone-50 font-sans">
      <Hero lang={lang} setLang={setLang} />
      <MenuContainer lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}