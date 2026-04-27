import React, { useEffect, useState, useRef } from 'react';
import { 
  MapPin, ShoppingBag, Heart, Store, Menu, Instagram, Facebook, Twitter, 
  TrendingUp, Award, Globe, Smartphone, CheckCircle, Clock, ArrowRight, 
  BarChart3, Users, ShieldCheck, Zap, Target, Briefcase, Star, QrCode, 
  Download, Loader2
} from 'lucide-react';
import siteIcon from './icon.png';

// --- DATA CONSTANTS ---
const STEPS_DATA = [
  { step: '1', title: 'Publication', desc: 'Le restaurant publie ses invendus du jour.', icon: <Store size={36} /> },
  { step: '2', title: 'Consultation', desc: 'Le client découvre les paniers à proximité.', icon: <MapPin size={36} /> },
  { step: '3', title: 'Réservation', desc: 'Paiement sécurisé en ligne sur l\'app.', icon: <ShoppingBag size={36} /> },
  { step: '4', title: 'Récupération', desc: 'Le client récupère sa commande en boutique.', icon: <CheckCircle size={36} /> }
];

const MOCK_OFFERS = [
  { id: 1, name: "Boulangerie L'Artisan", type: "Panier Viennoiseries", price: "30", oldPrice: "90", distance: "400m", time: "18:00 - 20:00", rating: 4.8, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80" },
  { id: 2, name: "Restaurant Le Médina", type: "Panier Repas Chaud", price: "45", oldPrice: "120", distance: "850m", time: "21:30 - 22:30", rating: 4.5, img: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=400&q=80" }
];

const BMC_DATA = {
  partners: ['Restaurants', 'Boulangeries & Pâtisseries', 'Hôtels', 'Services de paiement'],
  activities: ['Développement App', 'Gestion partenaires', 'Marketing & Acquisition'],
  resources: ['Plateforme digitale', 'Base utilisateurs', 'Équipe tech'],
  relations: ['App simple et rapide', 'Support client réactif', 'Système de reviews'],
  channels: ['Application mobile', 'Réseaux sociaux', 'Notifications push']
};

// --- CUSTOM LOGO COMPONENT ---
const BrandLogo = ({ size = 40, color = "#2ECC71", className = "" }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M49.5 12C36 12 24.5 19.5 18 30.5" stroke={color} strokeWidth="8" strokeLinecap="round"/>
        <polygon points="12,28 25,28 18,40" fill={color} />
        <path d="M14.5 60C18 73.5 29.5 83 43.5 86.5" stroke={color} strokeWidth="8" strokeLinecap="round"/>
        <polygon points="40,93 40,80 55,87" fill={color} />
        <path d="M82.5 56C81 40.5 73.5 27 60.5 19.5" stroke={color} strokeWidth="8" strokeLinecap="round"/>
        <polygon points="63,12 55,23 68,23" fill={color} />
        <path d="M38 38V52C38 56 42 58 46 58V72" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M32 38V48M44 38V48" stroke={color} strokeWidth="4" strokeLinecap="round"/>
        <path d="M68 40C68 40 58 45 58 55C58 65 68 70 68 70" stroke={color} strokeWidth="5" strokeLinecap="round"/>
      </svg>
    );
  }

  return (
    <div 
      style={{ width: size, height: size }} 
      className={`overflow-hidden flex items-center justify-center ${className}`}
    >
      <img 
        src={siteIcon} 
        alt="GastroCycle Logo" 
        className="w-full h-full object-contain"
        onError={() => setHasError(true)}
      />
    </div>
  );
};

// --- SCROLL ANIMATION HOOK ---
const useScrollReveal = (containerRef) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    if (containerRef.current) {
      const elements = containerRef.current.querySelectorAll('.reveal-on-scroll');
      elements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [containerRef]);
};

// --- MAIN APP COMPONENT ---
export default function App() {
  const appRef = useRef(null);
  useScrollReveal(appRef);

  useEffect(() => {
    if (!document.getElementById('gastro-website-styles')) {
      const style = document.createElement('style');
      style.id = 'gastro-website-styles';
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800;900&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        html { scroll-behavior: smooth; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        
        @keyframes float-delayed { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out infinite; animation-delay: 1s; }

        .reveal-on-scroll { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-revealed { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: 100ms; }
        .delay-200 { transition-delay: 200ms; }
        .delay-300 { transition-delay: 300ms; }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div ref={appRef} className="min-h-screen font-inter text-[#34495E] bg-[#FAFAFA] overflow-x-hidden selection:bg-[#2ECC71] selection:text-white">
      
      {/* 1. NAVIGATION */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-lg px-6 py-4 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BrandLogo size={36} color="#2ECC71" />
            <h1 className="text-2xl font-outfit font-black tracking-tight text-[#111]">
              Gastro<span className="text-[#2ECC71]">Cycle</span>
            </h1>
          </div>
          <div className="hidden lg:flex gap-10 font-bold text-[15px] text-[#34495E]">
            <a href="#concept" className="hover:text-[#2ECC71] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ECC71] rounded px-2">Concept</a>
            <a href="#impact" className="hover:text-[#2ECC71] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ECC71] rounded px-2">Impact</a>
            <a href="#business" className="hover:text-[#2ECC71] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ECC71] rounded px-2">Business Model</a>
            <a href="#vision" className="hover:text-[#2ECC71] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ECC71] rounded px-2">Vision</a>
          </div>
          <div className="hidden md:flex gap-4">
            <button className="px-6 py-2.5 rounded-full font-bold text-sm text-[#34495E] hover:bg-gray-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ECC71]">
              Espace Client
            </button>
            <button className="px-6 py-2.5 rounded-full text-white font-bold text-sm bg-[#111] hover:bg-gray-800 active:scale-95 transition-all shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ECC71]">
              Devenir Partenaire
            </button>
          </div>
          <button className="md:hidden text-[#34495E] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2ECC71] rounded"><Menu size={28} /></button>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="pt-40 pb-20 px-6 relative overflow-hidden bg-[#FAFAFA]">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2ECC71]/10 rounded-full blur-[100px] -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#E67E22]/10 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative z-10 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold bg-[#2ECC71]/10 text-[#2ECC71] border border-[#2ECC71]/20">
              <span className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse"></span>
              Lancement au Maroc
            </div>
            <h1 className="text-5xl md:text-7xl font-outfit font-black leading-[1.05] mb-6 text-[#111] tracking-tight">
              Gaspiller est <br/>
              <span className="text-[#E67E22] relative">
                révolu.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#E67E22]/30" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none"/></svg>
              </span><br/>
              La valeur reste.
            </h1>
            <p className="text-xl mb-10 text-gray-500 max-w-lg leading-relaxed">
              La plateforme marocaine qui transforme les invendus des commerçants en opportunités pour les citoyens. Mangez mieux, payez moins, sauvez la planète.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => window.location.href = "https://gastro-cycle-app.vercel.app/"}
                className="px-8 py-4 rounded-full text-white font-bold text-lg flex justify-center items-center gap-3 bg-[#2ECC71] hover:bg-[#27ae60] active:scale-95 transition-all shadow-xl shadow-[#2ECC71]/30 hover:-translate-y-1"
              >
                <Smartphone size={24}/> Obtenir l'App
              </button>
              <button 
                onClick={() => window.location.href = "https://gastro-cycle-app.vercel.app/"}
                className="px-8 py-4 rounded-full font-bold text-lg flex justify-center items-center gap-2 bg-white text-[#111] border-2 border-gray-200 hover:border-[#111] active:scale-95 transition-all"
              >
                Je suis professionnel
              </button>
            </div>
          </div>
          
          <div className="relative z-10 flex justify-center h-[600px] lg:h-[700px] items-center reveal-on-scroll delay-200">
            <div className="relative z-20 animate-float">
               <AppMockup />
            </div>
            
            <div className="absolute top-[15%] -left-10 bg-white p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-3 animate-float-delayed">
              <div className="bg-[#E67E22]/10 p-2 rounded-full text-[#E67E22]"><TrendingUp size={24} /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold">Économie moy.</p>
                <p className="text-xl font-outfit font-black text-[#111]">-70%</p>
              </div>
            </div>

            <div className="absolute bottom-[25%] -right-12 bg-white p-4 rounded-2xl shadow-2xl z-30 flex items-center gap-3 animate-float" style={{ animationDelay: '2s' }}>
              <div className="bg-[#2ECC71]/10 p-2 rounded-full text-[#2ECC71]"><CheckCircle size={24} /></div>
              <div>
                <p className="text-xs text-gray-400 font-bold">Panier sauvé à</p>
                <p className="text-xl font-outfit font-black text-[#111]">Rabat</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. STATS BAR */}
      <section className="py-16 bg-[#111] relative z-20 border-y-8 border-[#2ECC71]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/10 text-center">
          <div className="reveal-on-scroll">
            <h3 className="text-5xl md:text-6xl font-outfit font-black text-[#2ECC71] mb-2">3.3M</h3>
            <p className="text-white/80 font-bold text-lg uppercase tracking-wider">Tonnes gaspillées/an</p>
          </div>
          <div className="pt-10 md:pt-0 reveal-on-scroll delay-100">
            <h3 className="text-5xl md:text-6xl font-outfit font-black text-white mb-2">73 000</h3>
            <p className="text-white/80 font-bold text-lg uppercase tracking-wider">Restaurants cibles</p>
          </div>
          <div className="pt-10 md:pt-0 reveal-on-scroll delay-200">
            <h3 className="text-5xl md:text-6xl font-outfit font-black text-[#E67E22] mb-2">-50%</h3>
            <p className="text-white/80 font-bold text-lg uppercase tracking-wider">De prix minimum</p>
          </div>
        </div>
      </section>

      {/* 3 PHONES SHOWCASE */}
      <section className="py-32 px-6 relative overflow-hidden bg-[#111]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#2ECC71] rounded-full blur-[150px] opacity-10"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#E67E22] rounded-full blur-[150px] opacity-10"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-6xl font-outfit font-black mb-6 text-white tracking-tight">Une expérience <br/><span className="text-[#2ECC71]">fluide et intuitive</span></h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed">De la découverte du panier à la récupération en boutique, l'application GastroCycle est conçue pour simplifier la lutte contre le gaspillage au quotidien.</p>
          </div>

          <ThreePhonesShowcase />
        </div>
      </section>

      {/* 4. LE PROBLÈME & IMPACT */}
      <section id="impact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-outfit font-black mb-6 text-[#111]">Un problème aux enjeux multiples</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Le gaspillage alimentaire n'est pas qu'une question écologique. C'est une perte financière pour les professionnels et un manque à gagner pour le pouvoir d'achat.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100 reveal-on-scroll hover:border-[#2ECC71] transition-colors group">
              <div className="w-16 h-16 bg-[#2ECC71]/10 rounded-2xl flex items-center justify-center text-[#2ECC71] mb-6 group-hover:scale-110 transition-transform"><Globe size={32} /></div>
              <h3 className="text-2xl font-outfit font-bold mb-4 text-[#111]">Impact Écologique</h3>
              <p className="text-gray-500">Chaque repas sauvé évite l'émission inutile de CO2 liée à la production et destruction des aliments.</p>
            </div>
            <div className="bg-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100 reveal-on-scroll delay-100 hover:border-[#E67E22] transition-colors group">
              <div className="w-16 h-16 bg-[#E67E22]/10 rounded-2xl flex items-center justify-center text-[#E67E22] mb-6 group-hover:scale-110 transition-transform"><TrendingUp size={32} /></div>
              <h3 className="text-2xl font-outfit font-bold mb-4 text-[#111]">Impact Économique</h3>
              <p className="text-gray-500">Les restaurants récupèrent leur coût de revient. Le modèle génère de la valeur sur ce qui était destiné à la perte.</p>
            </div>
            <div className="bg-[#FAFAFA] p-8 rounded-[2rem] border border-gray-100 reveal-on-scroll delay-200 hover:border-[#34495E] transition-colors group">
              <div className="w-16 h-16 bg-[#111]/5 rounded-2xl flex items-center justify-center text-[#111] mb-6 group-hover:scale-110 transition-transform"><Users size={32} /></div>
              <h3 className="text-2xl font-outfit font-bold mb-4 text-[#111]">Impact Social</h3>
              <p className="text-gray-500">Démocratisation de l'accès à une nourriture de qualité pour les étudiants et les familles à budget limité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMMENT ÇA MARCHE */}
      <section id="concept" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-outfit font-black mb-6 text-[#111]">Un processus simple et rapide</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Conçu pour s'intégrer parfaitement dans le quotidien des commerçants et des utilisateurs.</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-[45px] left-[10%] right-[10%] h-1 bg-gray-200 z-0">
               <div className="absolute top-0 left-0 h-full bg-[#2ECC71] w-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
              {STEPS_DATA.map((item, i) => (
                <div key={i} className={`flex flex-col items-center text-center reveal-on-scroll delay-${i*100}`}>
                  <div className="w-24 h-24 bg-white rounded-full border-4 border-[#2ECC71] flex items-center justify-center text-[#111] mb-6 shadow-xl relative z-10">
                    {item.icon}
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#E67E22] text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-outfit font-bold mb-3 text-[#111]">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROPOSITION DE VALEUR */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-outfit font-black mb-6 text-[#111]">Un modèle <span className="text-[#E67E22]">Gagnant-Gagnant</span></h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Card Client */}
            <div className="bg-[#FAFAFA] p-10 rounded-[3rem] border border-gray-100 reveal-on-scroll">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-[#2ECC71] text-white rounded-2xl flex items-center justify-center"><Users size={32} /></div>
                <h3 className="text-3xl font-outfit font-black text-[#111]">Pour les clients</h3>
              </div>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-[#2ECC71] shrink-0 mt-1" />
                  <p className="text-lg font-medium text-gray-700">Manger à prix réduit (jusqu'à -70%)</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-[#2ECC71] shrink-0 mt-1" />
                  <p className="text-lg font-medium text-gray-700">Découvrir de nouveaux lieux et artisans locaux</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-[#2ECC71] shrink-0 mt-1" />
                  <p className="text-lg font-medium text-gray-700">Consommer de manière éco-responsable</p>
                </li>
              </ul>
              <div className="mt-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-50 flex items-center gap-4">
                 <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&q=80" className="w-14 h-14 rounded-full object-cover" alt="Ziad"/>
                 <div>
                   <p className="font-bold text-[#111]">Ziad, 22 ans</p>
                   <p className="text-sm text-gray-500">"Idéal pour mon budget étudiant."</p>
                 </div>
              </div>
            </div>

            {/* Card Partenaire */}
            <div className="bg-[#111] p-10 rounded-[3rem] text-white reveal-on-scroll delay-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#E67E22] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-center gap-4 mb-8 relative z-10">
                <div className="w-16 h-16 bg-[#E67E22] text-white rounded-2xl flex items-center justify-center"><Store size={32} /></div>
                <h3 className="text-3xl font-outfit font-black text-white">Pour les restaurants</h3>
              </div>
              <ul className="space-y-6 relative z-10">
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-[#E67E22] shrink-0 mt-1" />
                  <p className="text-lg font-medium text-gray-300">Réduire les pertes financières liées aux invendus</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-[#E67E22] shrink-0 mt-1" />
                  <p className="text-lg font-medium text-gray-300">Valoriser la production du jour</p>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="text-[#E67E22] shrink-0 mt-1" />
                  <p className="text-lg font-medium text-gray-300">Améliorer l'image de marque (éco-responsabilité)</p>
                </li>
              </ul>
              <div className="mt-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center gap-4 relative z-10">
                 <div className="bg-[#E67E22] text-white px-4 py-2 rounded-xl font-bold text-sm">Zéro stock</div>
                 <p className="text-sm text-gray-300 font-medium">Chaque partenaire augmente sa marge directe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BUSINESS MODEL CANVAS */}
      <section id="business" className="py-24 px-6 bg-[#FAFAFA]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-outfit font-black mb-6 text-[#111]">Business Model Canvas</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Une structure conçue pour la scalabilité et l'impact direct.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:grid-rows-[auto_auto] reveal-on-scroll">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 lg:row-span-2 shadow-sm">
              <h3 className="font-outfit font-bold text-lg mb-4 text-[#111] flex items-center gap-2"><Briefcase size={20} className="text-[#E67E22]"/> Partenaires Clés</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {BMC_DATA.partners.map((p, i) => (
                  <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#2ECC71]"></span> {p}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-outfit font-bold text-lg mb-4 text-[#111] flex items-center gap-2"><Zap size={20} className="text-[#E67E22]"/> Activités Clés</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {BMC_DATA.activities.map((a, i) => <li key={i}>• {a}</li>)}
              </ul>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl lg:row-span-2 shadow-xl text-white transform hover:scale-[1.02] transition-transform relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#2ECC71] rounded-full blur-[50px] opacity-20"></div>
              <h3 className="font-outfit font-bold text-lg mb-6 text-[#2ECC71] flex items-center gap-2 relative z-10"><Award size={20}/> Proposition Valeur</h3>
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="font-bold text-[#E67E22] mb-2 text-sm uppercase tracking-wider">Pour les clients</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Repas à prix réduit</li>
                    <li>• Action écologique</li>
                  </ul>
                </div>
                <div className="w-full h-px bg-white/20"></div>
                <div>
                  <h4 className="font-bold text-[#E67E22] mb-2 text-sm uppercase tracking-wider">Pour les partenaires</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li>• Réduction du gaspillage</li>
                    <li>• Revenus additionnels</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-outfit font-bold text-lg mb-4 text-[#111] flex items-center gap-2"><Heart size={20} className="text-[#E67E22]"/> Relations Clients</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {BMC_DATA.relations.map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 lg:row-span-2 shadow-sm">
              <h3 className="font-outfit font-bold text-lg mb-4 text-[#111] flex items-center gap-2"><Target size={20} className="text-[#E67E22]"/> Segments Clients</h3>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="font-bold text-[#111] mb-1">B2C</p>
                  <p>Étudiants, Jeunes actifs, Familles</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <p className="font-bold text-[#111] mb-1">B2B</p>
                  <p>Restaurants, Boulangeries</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-start-2">
              <h3 className="font-outfit font-bold text-lg mb-4 text-[#111] flex items-center gap-2"><ShieldCheck size={20} className="text-[#E67E22]"/> Ressources Clés</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {BMC_DATA.resources.map((r, i) => <li key={i}>• {r}</li>)}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm lg:col-start-4">
              <h3 className="font-outfit font-bold text-lg mb-4 text-[#111] flex items-center gap-2"><Globe size={20} className="text-[#E67E22]"/> Canaux</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {BMC_DATA.channels.map((c, i) => <li key={i}>• {c}</li>)}
              </ul>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-4 mt-4 reveal-on-scroll delay-100">
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <h3 className="font-outfit font-bold text-lg mb-4 text-red-800">Structure des Coûts</h3>
              <ul className="flex flex-wrap gap-4 text-sm text-red-600 font-medium">
                <li className="bg-white px-3 py-1 rounded-full shadow-sm border border-red-100">Développement App</li>
                <li className="bg-white px-3 py-1 rounded-full shadow-sm border border-red-100">Marketing</li>
                <li className="bg-white px-3 py-1 rounded-full shadow-sm border border-red-100">Serveurs</li>
              </ul>
            </div>
            <div className="bg-[#2ECC71]/10 p-6 rounded-2xl border border-[#2ECC71]/20">
              <h3 className="font-outfit font-bold text-lg mb-4 text-[#1E8449]">Sources de Revenus</h3>
              <ul className="flex flex-wrap gap-4 text-sm text-[#1E8449] font-medium">
                <li className="bg-white px-3 py-1 rounded-full shadow-sm border border-[#2ECC71]/20 flex items-center gap-2"><CheckCircle size={14}/> Commission par vente</li>
                <li className="bg-white px-3 py-1 rounded-full shadow-sm border border-[#2ECC71]/20 flex items-center gap-2"><Star size={14}/> Abonnements B2B</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PRÉVISIONS FINANCIÈRES */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-outfit font-black mb-6 text-[#111]">Un modèle scalable et rentable</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Sans coût d'inventaire, chaque nouvelle inscription impacte directement la marge.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Phase Pilote */}
            <div className="bg-[#FAFAFA] p-10 rounded-[3rem] border border-gray-200 reveal-on-scroll relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#111] text-white py-2 px-6 rounded-bl-2xl font-bold text-sm">Réaliste</div>
              <h3 className="text-3xl font-outfit font-black mb-8 text-[#111]">Phase Pilote</h3>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Partenaires</span>
                  <span className="font-bold text-xl text-[#111]">30</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Ventes/jour/rest.</span>
                  <span className="font-bold text-xl text-[#111]">8</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-500 font-medium">Panier moyen</span>
                  <span className="font-bold text-xl text-[#111]">30 DH</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-[#E67E22]">Commission (20%)</span>
                  <span className="font-black text-xl text-[#E67E22]">6 DH / vente</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                <p className="text-sm text-gray-400 font-bold uppercase tracking-widest mb-2">Revenu Mensuel Estimé</p>
                <p className="text-4xl font-outfit font-black text-[#111]">~43 000 DH</p>
              </div>
            </div>

            {/* Croissance */}
            <div className="bg-[#2ECC71] p-10 rounded-[3rem] text-white reveal-on-scroll delay-100 shadow-xl shadow-[#2ECC71]/20 relative overflow-hidden">
               <div className="absolute -right-20 -bottom-20 opacity-10">
                 <BrandLogo size={400} color="#FFFFFF" />
               </div>
              <div className="absolute top-0 right-0 bg-[#1E8449] text-white py-2 px-6 rounded-bl-2xl font-bold text-sm">Projection</div>
              <h3 className="text-3xl font-outfit font-black mb-8">Croissance</h3>
              
              <div className="mb-12">
                <p className="text-green-50 font-medium mb-2">Objectif à court terme</p>
                <div className="text-7xl font-outfit font-black mb-2">100<span className="text-3xl font-bold"> rest.</span></div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center mb-8 relative z-10">
                <p className="text-sm text-green-50 font-bold uppercase tracking-widest mb-2">Revenu Mensuel Projeté</p>
                <p className="text-4xl font-outfit font-black">~144 000 DH</p>
              </div>

              <p className="text-sm font-medium text-green-50 relative z-10">
                * Croissance scalable : ajout de revenus additionnels via l'abonnement Premium pour la visibilité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. VISION FUTURE */}
      <section id="vision" className="py-24 px-6 bg-[#111] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 reveal-on-scroll">
            <h2 className="text-4xl md:text-5xl font-outfit font-black mb-6 text-white">Notre vision pour demain</h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">GastroCycle n'est que le début d'un écosystème circulaire complet.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 reveal-on-scroll hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-[#2ECC71]/20 text-[#2ECC71] rounded-2xl flex items-center justify-center mb-6"><Globe size={32} /></div>
              <h3 className="text-2xl font-outfit font-bold mb-4">Développement National</h3>
              <p className="text-gray-400">Expansion de Casablanca vers Rabat, Marrakech et Tanger pour devenir le leader anti-gaspi au Maroc.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 reveal-on-scroll delay-100 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-[#E67E22]/20 text-[#E67E22] rounded-2xl flex items-center justify-center mb-6"><BarChart3 size={32} /></div>
              <h3 className="text-2xl font-outfit font-bold mb-4">Intégration de l'IA</h3>
              <p className="text-gray-400">Algorithmes prédictifs pour aider les restaurateurs à anticiper et ajuster leur production.</p>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10 reveal-on-scroll delay-200 hover:-translate-y-2 hover:bg-white/10 transition-all duration-300">
              <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6"><Briefcase size={32} /></div>
              <h3 className="text-2xl font-outfit font-bold mb-4">Partenariats Stratégiques</h3>
              <p className="text-gray-400">Collaborations avec les grandes surfaces et les associations pour redistribuer massivement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. CTA + FOOTER */}
      <section className="bg-[#2ECC71] pt-24 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto text-center reveal-on-scroll relative z-10">
          <BrandLogo size={80} color="#2ECC71" className="mx-auto mb-8 shadow-2xl" />
          <h2 className="text-4xl md:text-6xl font-outfit font-black text-white mb-8">Prêt à faire la différence ?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={() => window.location.href = "https://gastro-cycle-app.vercel.app/"}
              className="px-10 py-4 rounded-2xl font-bold text-lg text-[#2ECC71] bg-white hover:bg-gray-50 active:scale-95 transition-all shadow-xl"
            >
              Rejoindre en tant que citoyen
            </button>
            <button 
              onClick={() => window.location.href = "https://gastro-cycle-app.vercel.app/"}
              className="px-10 py-4 rounded-2xl font-bold text-lg text-white border-2 border-white hover:bg-white/10 active:scale-95 transition-all mb-24"
            >
              Inscrire mon commerce
            </button>
          </div>

          {/* Footer content */}
          <div className="border-t border-white/30 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <BrandLogo size={32} color="#FFFFFF" className="shadow-none" />
              <span className="text-2xl font-outfit font-black">GastroCycle</span>
            </div>
            
            <div className="flex gap-6 font-bold text-sm uppercase tracking-wider">
              <a href="#" className="hover:text-[#111] transition-colors">À propos</a>
              <a href="#" className="hover:text-[#111] transition-colors">Contact</a>
            </div>

            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#2ECC71] transition-all"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#2ECC71] transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white hover:text-[#2ECC71] transition-all"><Twitter size={20} /></a>
            </div>
          </div>
          <div className="mt-8 text-white/70 text-sm font-medium">
            © 2026 GastroCycle. Présenté par Tibche Othman.
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// MOCKUPS COMPONENTS (For the Web Landing Page)
// ==========================================
function AppMockup() {
  return (
    <div className="w-[300px] h-[600px] bg-white rounded-[3rem] p-2 relative shadow-2xl border-[8px] border-white/50 backdrop-blur-sm">
      <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
        <div className="w-28 h-6 bg-gray-100 rounded-b-2xl"></div>
      </div>
      
      <div className="w-full h-full bg-[#FAFAFA] rounded-[2.5rem] overflow-hidden relative flex flex-col font-inter border border-gray-100">
        <div className="bg-white pt-10 pb-4 px-5 z-10 sticky top-0 shadow-sm border-b border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <Menu size={20} color="#111" />
            <div className="font-outfit font-black text-lg text-[#2ECC71]">GastroCycle</div>
            <div className="w-5"></div>
          </div>
          <div className="relative">
            <div className="w-full bg-gray-100 rounded-xl py-2.5 px-10 text-xs font-bold text-gray-400 flex items-center">
              Chercher par quartier...
            </div>
            <MapPin size={14} className="absolute left-4 top-3 text-gray-400" />
          </div>
        </div>

        <div className="h-32 bg-[#2ECC71]/10 relative border-b border-gray-200 flex justify-center items-center overflow-hidden shrink-0">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#2ECC71 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }}></div>
            <div className="absolute top-4 left-10 p-1.5 rounded-full bg-white shadow-md border border-[#2ECC71] text-[#2ECC71]"><BrandLogo size={16}/></div>
            <div className="absolute bottom-6 right-12 p-1.5 rounded-full bg-white shadow-md border border-[#2ECC71] text-[#2ECC71]"><BrandLogo size={16}/></div>
            <div className="absolute top-8 right-8 p-1.5 rounded-full bg-[#2ECC71] shadow-md border border-white text-white"><BrandLogo size={16} color="#FFFFFF"/></div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 hide-scrollbar bg-[#FAFAFA]">
          <h3 className="font-bold text-[#111] mb-3 text-xs uppercase tracking-wider">Offres à proximité</h3>
          
          {MOCK_OFFERS.map((offer, idx) => (
            <div key={offer.id} className={`bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 ${idx > 0 ? 'opacity-70 mt-3' : 'mb-3'}`}>
              <img src={offer.img} alt="" className="w-20 h-20 rounded-xl object-cover" />
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-outfit font-bold text-sm leading-tight text-[#111]">{offer.name}</h4>
                  <p className="text-[11px] text-gray-500 font-medium mt-0.5">{offer.type}</p>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <span className="font-black text-base text-[#2ECC71]">{offer.price} DH</span>
                    {offer.oldPrice && <span className="text-[9px] text-gray-400 line-through ml-1 font-bold">{offer.oldPrice} DH</span>}
                  </div>
                  {idx === 0 && <div className="text-[10px] bg-[#2ECC71] text-white px-3 py-1.5 rounded-lg font-bold">Réserver</div>}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-50">
          <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

function ThreePhonesShowcase() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center min-h-[650px] py-12 lg:h-[700px] w-full max-w-5xl mx-auto relative mt-4">
        
        {/* LEFT PHONE: MAP VIEW */}
        <div className="hidden md:flex absolute left-0 lg:left-12 z-10 transform -rotate-[10deg] scale-90 translate-y-12 opacity-80 hover:opacity-100 hover:rotate-0 hover:z-40 hover:scale-100 transition-all duration-500 w-[280px] h-[580px] bg-white rounded-[3rem] p-2 shadow-2xl border-[8px] border-[#111] flex-col overflow-hidden group cursor-pointer">
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
            <div className="w-28 h-6 bg-[#111] rounded-b-2xl"></div>
          </div>
          <div className="w-full h-full bg-[#E8F8F5] rounded-[2.25rem] overflow-hidden relative flex flex-col font-inter">
            <div className="absolute top-0 inset-x-0 pt-10 pb-4 px-5 z-20 bg-gradient-to-b from-white via-white to-transparent">
               <div className="bg-white p-3 rounded-2xl shadow-lg flex items-center gap-3">
                 <MapPin size={18} className="text-[#2ECC71]" />
                 <p className="text-sm font-bold text-gray-700 flex-1">Rabat, Agdal</p>
               </div>
            </div>
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#2ECC71 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
            <div className="absolute top-[35%] left-[20%] p-2.5 rounded-full bg-white shadow-xl border-2 border-[#2ECC71] text-[#2ECC71] transform group-hover:scale-110 transition-transform"><ShoppingBag size={18}/></div>
            <div className="absolute top-[45%] right-[20%] p-2.5 rounded-full bg-white shadow-xl border-2 border-[#E67E22] text-[#E67E22] transform group-hover:scale-110 transition-transform"><ShoppingBag size={18}/></div>
            <div className="absolute bottom-[40%] left-[45%] p-3 rounded-full bg-[#2ECC71] shadow-2xl border-2 border-white text-white transform scale-125 group-hover:scale-150 transition-transform z-10"><ShoppingBag size={20}/></div>
            <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl p-5 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform">
               <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-4"></div>
               <h4 className="font-outfit font-bold text-[#111] text-base mb-1">Boulangerie Artisanale</h4>
               <p className="text-xs text-gray-500 mb-4"><span className="text-[#2ECC71] font-bold">Ouvert</span> • À 400m</p>
               <div className="w-full py-3.5 bg-[#2ECC71] text-white text-center rounded-xl font-black text-sm">Voir les paniers</div>
            </div>
          </div>
        </div>

        {/* CENTER PHONE: LIST VIEW */}
        <div className="relative z-30 transform scale-105 shadow-[0_30px_60px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-500 w-[300px] h-[620px] bg-white rounded-[3rem] p-2 border-[8px] border-[#111] flex flex-col overflow-hidden cursor-pointer">
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
            <div className="w-28 h-6 bg-[#111] rounded-b-2xl"></div>
          </div>
          <div className="w-full h-full bg-[#FAFAFA] rounded-[2.25rem] overflow-hidden relative flex flex-col font-inter border border-gray-100">
            <div className="bg-white pt-10 pb-4 px-5 z-10 sticky top-0 shadow-sm border-b border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><Menu size={16} color="#111" /></div>
                <div className="font-outfit font-black text-lg text-[#2ECC71]">GastroCycle</div>
                <div className="w-8 h-8"></div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-100 rounded-xl py-3 px-10 text-xs font-bold text-gray-400 flex items-center">Que voulez-vous sauver ?</div>
                <MapPin size={14} className="absolute left-4 top-3.5 text-gray-400" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
              <h3 className="font-black text-[#111] mb-3 text-xs uppercase tracking-wider">Près de vous</h3>
              {MOCK_OFFERS.map(offer => (
                <div key={offer.id} className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex gap-3 mb-4">
                  <img src={offer.img} alt="" className="w-20 h-20 rounded-xl object-cover" />
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-outfit font-bold text-[14px] leading-tight text-[#111]">{offer.name}</h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-1">{offer.type}</p>
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="font-black text-base text-[#2ECC71]">{offer.price} DH</span>
                        <span className="text-[10px] text-gray-400 line-through ml-1 font-bold">{offer.oldPrice} DH</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute bottom-2 inset-x-0 flex justify-center z-50">
              <div className="w-24 h-1 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* RIGHT PHONE: SUCCESS VIEW */}
        <div className="hidden md:flex absolute right-0 lg:right-12 z-10 transform rotate-[10deg] scale-90 translate-y-12 opacity-80 hover:opacity-100 hover:rotate-0 hover:z-40 hover:scale-100 transition-all duration-500 w-[280px] h-[580px] bg-white rounded-[3rem] p-2 shadow-2xl border-[8px] border-[#111] flex-col overflow-hidden group cursor-pointer">
          <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
            <div className="w-28 h-6 bg-[#111] rounded-b-2xl"></div>
          </div>
          <div className="w-full h-full bg-[#2ECC71] rounded-[2.25rem] overflow-hidden relative flex flex-col font-inter items-center pt-20 px-5 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#2ECC71] mb-5 shadow-xl transform group-hover:scale-110 transition-transform">
              <CheckCircle size={40} />
            </div>
            <h2 className="text-3xl font-outfit font-black mb-2">Réservé !</h2>
            <p className="text-green-50 font-bold text-sm mb-10 opacity-90">Votre panier vous attend.</p>
            
            <div className="bg-white text-[#111] p-6 rounded-3xl w-full shadow-2xl relative">
               <div className="absolute -top-3 left-0 w-full h-3 bg-[radial-gradient(circle_at_50%_0,transparent_3px,#ffffff_4px)] bg-[length:12px_12px]"></div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 mt-2">Code de retrait</p>
               <div className="w-28 h-28 mx-auto bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center mb-5 text-gray-400 group-hover:text-[#2ECC71] group-hover:border-[#2ECC71]/30 transition-colors">
                  <QrCode size={48} strokeWidth={1.5} />
               </div>
               <p className="text-3xl font-outfit font-black tracking-widest text-[#111]">G849</p>
            </div>
          </div>
        </div>
        
      </div>
      
      {/* Mobile Legend */}
      <div className="md:hidden text-center mt-6 space-y-3 reveal-on-scroll">
        <p className="text-white font-bold text-sm flex items-center justify-center gap-2">
          <MapPin size={18} className="text-[#2ECC71]"/> Carte interactive des partenaires
        </p>
        <p className="text-white font-bold text-sm flex items-center justify-center gap-2">
          <ShoppingBag size={18} className="text-[#E67E22]"/> Paniers surprises mis à jour
        </p>
        <p className="text-white font-bold text-sm flex items-center justify-center gap-2">
          <CheckCircle size={18} className="text-[#2ECC71]"/> Retrait facile avec QR Code
        </p>
      </div>
    </div>
  );
}