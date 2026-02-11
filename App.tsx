import React, { useState } from 'react';
import { PlanetData } from './types';
import { PLANETS, SUN } from './constants';
import SolarSystemView from './components/SolarSystemView';
import PlanetDetails from './components/PlanetDetails';

const App: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [scaleMode, setScaleMode] = useState(false);

  const navigationItems = [SUN, ...PLANETS];

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-right" dir="rtl">
        <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(30,58,138,0.4)] text-center animate-in fade-in zoom-in duration-500">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-tr from-yellow-400 to-orange-600 rounded-full shadow-[0_0_40px_rgba(234,179,8,0.5)] animate-pulse"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            מסע במערכת השמש
          </h1>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            שלום חוקרים וחוקרות! מוכנים לצאת למסע בין כוכבים? 
            בסימולטור הזה תוכלו לחקור את כוכבי הלכת, להבין את הגדלים המטורפים של היקום ולשאול את ה-AI כל מה שתרצו.
          </p>
          <div className="flex justify-center">
            <button 
              onClick={() => setShowWelcome(false)}
              className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-500 text-2xl shadow-xl hover:scale-105 active:scale-95"
            >
              שיגור! 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-slate-950 text-slate-100 overflow-hidden select-none">
      {/* Header Controls */}
      <header className="absolute top-0 left-0 right-0 z-40 p-4 md:p-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-start">
          <div className="pointer-events-auto bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl">
            <h1 className="text-xl md:text-3xl font-black text-white">
              מערכת השמש
            </h1>
            <p className="text-slate-400 text-xs mt-1">לחצו על כוכב לכת לחקירה</p>
          </div>
          
          <div className="flex flex-col gap-3 pointer-events-auto items-end">
            <button 
              onClick={() => setAnimationEnabled(!animationEnabled)}
              className="px-5 py-2.5 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-3 shadow-lg"
            >
              <div className={`w-2.5 h-2.5 rounded-full ${animationEnabled ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]' : 'bg-red-500'}`}></div>
              {animationEnabled ? 'עצור תנועה' : 'הפעל תנועה'}
            </button>
            <button 
              onClick={() => setScaleMode(!scaleMode)}
              className={`px-5 py-2.5 backdrop-blur border rounded-xl text-xs font-bold transition-all flex items-center gap-3 shadow-lg ${scaleMode ? 'bg-blue-600 border-blue-400 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'}`}
            >
              <span>{scaleMode ? '📏 גדלים: יחסיים (מציאותי)' : '📐 גדלים: תצוגה ברורה'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Simulation Area */}
      <main className="w-full h-screen cursor-grab active:cursor-grabbing">
        <SolarSystemView 
          selectedPlanetId={selectedPlanet?.id || null} 
          onPlanetSelect={(p: PlanetData) => setSelectedPlanet(p)}
          animationEnabled={animationEnabled}
          scaleMode={scaleMode}
        />
      </main>

      {/* Quick Navigation Toolbar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-5xl px-4 pointer-events-none">
        <div className="flex justify-start md:justify-center gap-4 overflow-x-auto py-4 px-8 bg-slate-900/90 backdrop-blur-xl rounded-3xl border border-white/10 pointer-events-auto scrollbar-hide shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {navigationItems.map((planet: PlanetData) => (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet)}
              className={`shrink-0 flex flex-col items-center group transition-all duration-300 ${selectedPlanet?.id === planet.id ? 'scale-110 opacity-100' : 'opacity-50 hover:opacity-100 hover:scale-105'}`}
            >
              <div 
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full mb-2 border-2 transition-all shadow-xl`}
                style={{ 
                  backgroundColor: planet.color,
                  borderColor: selectedPlanet?.id === planet.id ? 'white' : 'transparent',
                  boxShadow: selectedPlanet?.id === planet.id ? `0 0 20px ${planet.color}` : 'none'
                }}
              />
              <span className="text-[10px] md:text-xs font-bold text-white drop-shadow-md">{planet.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Planet Detail Panel */}
      {selectedPlanet && (
        <PlanetDetails 
          planet={selectedPlanet} 
          onClose={() => setSelectedPlanet(null)} 
          onNavigate={(p: PlanetData) => setSelectedPlanet(p)}
        />
      )}
    </div>
  );
};

export default App;