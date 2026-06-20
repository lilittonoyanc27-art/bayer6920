import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Award, 
  RotateCw, 
  Sparkles, 
  Volume2, 
  Play, 
  CheckCircle, 
  GraduationCap, 
  ArrowLeft,
  BookMarked,
  Layers,
  Flame,
  HelpCircle
} from 'lucide-react';
import { sound } from './sound';
import { VOCABULARY } from './vocabulary';

// Game Component Imports
import Game1Spatial from './Game1Spatial';
import Game2Bridge from './Game2Bridge';
import Game3Time from './Game3Time';
import Game4Cafe from './Game4Cafe';
import Game5Roulette from './Game5Roulette';
import Game6States from './Game6States';

type ScreenState = 'WELCOME' | 'CLASSROOM_DASHBOARD' | 'GAME_ACTIVE' | 'RESULTS';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('WELCOME');
  const [activeGameIndex, setActiveGameIndex] = useState<number | null>(null);
  const [gameScores, setGameScores] = useState<Record<number, number>>({});
  
  // Teacher Speech states
  const [teacherSpeechText, setTeacherSpeechText] = useState<string>(
    "Բարև՛, իմ սիրելի ուսանող։ Ես քո իսպաներենի ուսուցիչն եմ։ Այսօր մենք միասին կանցնենք իսպաներենի նախդիրների (Preposiciones) մեծ 3D քննությունը՝ բաղկացած 6 տարբեր խաղ-փուլերից։ Պատրա՞ստ ես ստուգել գիտելիքներդ։"
  );
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Read voice out loud (Armenian text-to-speech using standard browser translation voices)
  const speakVoice = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(teacherSpeechText);
      
      // Try to find Armenian or Russian/Spanish fallback voice, else default
      const voices = window.speechSynthesis.getVoices();
      const armenianVoice = voices.find(v => v.lang.includes('hy') || v.lang.includes('AM'));
      if (armenianVoice) {
        utterance.voice = armenianVoice;
      }
      
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Ձեր բրաուզերը չի աջակցում ձայնային ընթերցումը։");
    }
  };

  const handleSpeechUpdate = (newText: string) => {
    setTeacherSpeechText(newText);
    // Auto speech can be triggered or left for click to respect user actions
  };

  const startExam = () => {
    sound.playCorrect();
    setScreen('CLASSROOM_DASHBOARD');
    handleSpeechUpdate(
      "Ահա մեր 3D աշխատանքային սեղանը։ Յուրաքանչյուր դասագիրք ներկայացնում է քննության առանձին փուլ։ Սեղմի՛ր առաջին գրքին՝ «La Brújula de Posición» խաղը սկսելու համար։"
    );
  };

  const handleGameComplete = (score: number) => {
    if (activeGameIndex !== null) {
      setGameScores(prev => ({ ...prev, [activeGameIndex]: score }));
      
      // Update teacher commentary
      const nextIndex = activeGameIndex + 1;
      if (nextIndex <= 6) {
        handleSpeechUpdate(
          `Հիանալի՜ է։ Դուք ավարտեցիք ${activeGameIndex}-րդ խաղը՝ վաստակելով ${score}/3 միավոր։ Շարունակենք հաջորդ դասագրքով։`
        );
      }
      
      setScreen('CLASSROOM_DASHBOARD');
      setActiveGameIndex(null);
      sound.playVictory();
    }
  };

  const selectGame = (index: number) => {
    sound.playSlide();
    setActiveGameIndex(index);
    setScreen('GAME_ACTIVE');
  };

  const getScoresArray = (): number[] => {
    return Object.keys(gameScores).map(k => (gameScores as any)[k] || 0);
  };

  const finishAllExam = () => {
    sound.playVictory();
    setScreen('RESULTS');
    const total = getScoresArray().reduce((a, b) => a + b, 0);
    let gradeMsg = "";
    if (total >= 15) {
      gradeMsg = "Գերազանց (Sobresaliente)🌟! Դուք կատարյալ տիրապետում եք իսպաներենի բոլոր նախդիրներին: Իրական գիտակ եք:";
    } else if (total >= 10) {
      gradeMsg = "Լավ (Notable)👍! Շատ լավ արդյունք է, բայց որոշ նախնական արտահայտություններ կարիք ունեն կրկնության:";
    } else {
      gradeMsg = "Բավարար (Aprobado)📚! Դուք հաղթահարեցիք շեմը, բայց խորհուրդ եմ տալիս անցնել խաղերը ևս մեկ անգամ:";
    }
    handleSpeechUpdate(
      `Շնորհավորո՜ւմ եմ քննությունն ավարտելու առթիվ։ Քո ընդհանուր միավորն է ${total}։ Քո գնահատականն է՝ ${gradeMsg}`
    );
  };

  const restartExam = () => {
    setGameScores({});
    setActiveGameIndex(null);
    setScreen('WELCOME');
    handleSpeechUpdate(
      "Բարև՛, իմ սիրելի ուսանող։ Ես քո իսպաներենի ուսուցիչն եմ։ Այսօր մենք միասին կանցնենք իսպաներենի նախդիրների (Preposiciones) մեծ 3D քննությունը՝ բաղկացած 6 տարբեր խաղ-փուլերից։"
    );
  };

  const totalScore = getScoresArray().reduce((a, b) => a + b, 0);
  const completedGamesCount = Object.keys(gameScores).length;

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white font-sans antialiased relative overflow-hidden">
      
      {/* Animated Mesh Background Simulation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[150px]"></div>
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-pink-600/10 rounded-full blur-[130px]"></div>
      </div>

      {/* Upper Navigation Ribbon */}
      <header className="bg-[#0c1322]/60 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-12 flex justify-between items-center shadow-lg shadow-black/20 z-30 sticky top-0 relative">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl text-white shadow-md">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-md sm:text-lg font-bold font-display text-white tracking-tight">Español Preposiciones</h1>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider font-semibold uppercase">3D Քննության Հարթակ</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-300 font-medium font-mono hidden sm:inline">Կենդանի Ուսուցում</span>
          </div>

          {screen !== 'WELCOME' && (
            <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-indigo-300">
              <Award className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-mono font-bold">{totalScore} <span className="text-slate-400">/ 18</span></span>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6 relative z-10">
        
        {/* Dynamic Teacher Elena Commentary Bubble (Displays on all views except welcome screen or integrated nicely!) */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-5 md:p-6 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-4 hover:border-white/15 transition-all">
          {/* Teacher portrait with elegant 3D hover scale */}
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden flex items-center justify-center text-3xl font-bold select-none">
                👩‍🏫
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white w-4.5 h-4.5 rounded-full" />
          </div>

          <div className="flex-1 flex flex-col gap-2 text-center sm:text-left">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-xs font-bold font-display text-amber-300 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">👩‍🏫 Սենյորիտա Էլենա (Իսպաներենի Ուսուցչուհի)</span>
              
              <button 
                onClick={speakVoice}
                className="flex items-center gap-1.5 px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-white transition-all cursor-pointer font-mono font-bold"
              >
                <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-bounce text-indigo-400' : ''}`} />
                <span>🔊 {isSpeaking ? "Կարդում է..." : "Լսել խոսքը"}</span>
              </button>
            </div>
            
            <p className="text-sm md:text-base text-slate-100 leading-normal font-sans italic font-medium">
              « {teacherSpeechText} »
            </p>
          </div>
        </div>

        {/* Outer view screens */}
        <AnimatePresence mode="wait">
          
          {/* 1. WELCOME SCREEN */}
          {screen === 'WELCOME' && (
            <motion.div 
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col lg:flex-row gap-8 items-center justify-center my-4 relative z-10"
            >
              <div className="flex-1 max-w-xl text-center lg:text-left flex flex-col gap-6">
                <div>
                  <span className="px-3 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest inline-block mb-3">
                    Բարձրագույն 3D Կրթություն
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white leading-tight tracking-tight">
                    Հանձնիր Իսպաներեն <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Նախդիրների Քննությունը</span>
                  </h2>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Գիտե՞ս, թե երբ օգտագործել <code className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 font-bold">soñar con</code>, <code className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 font-bold">de primero</code> կամ <code className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-indigo-300 font-bold">al lado</code>: 
                  Այս ինտերակտիվ 3D քննության ընթացքում մենք կանցնենք 6 տարբեր թեմատիկ խաղերով։ Սենյորիտա Էլենան կլինի քո կողքին՝ տալով մանրամասն բացատրություններ յուրաքանչյուր հարցի համար։
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button 
                    onClick={startExam}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-95"
                  >
                    <span>Սկսել Քննությունը</span>
                    <Play className="w-5 h-5 fill-current" />
                  </button>
                </div>
              </div>

              {/* Interactive 3D visual card */}
              <div className="flex-1 max-w-sm w-full">
                <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden flex flex-col gap-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
                  
                  <div className="p-3 bg-white/5 text-indigo-300 rounded-2xl w-max border border-white/10">
                    <BookMarked className="w-8 h-8" />
                  </div>
                  
                  <h3 className="font-display font-bold text-xl text-white">Ի՞նչ է սպասվում.</h3>
                  
                  <ul className="text-xs text-slate-300 flex flex-col gap-2.5 font-medium">
                    <li className="flex items-center gap-2">⭐ <b className="text-white">1. Spatial Posición</b> — 3D կողմնորոշման խաղ</li>
                    <li className="flex items-center gap-2">🌉 <b className="text-white">2. Connectores Bridge</b> — նախադասությունների կառուցում</li>
                    <li className="flex items-center gap-2">⏰ <b className="text-white">3. Laberinto de Tiempo</b> — ժամանակային նախդիրներ</li>
                    <li className="flex items-center gap-2">🍽️ <b className="text-white">4. Cafetería del Menú</b> — ուտեստների դասավորում</li>
                    <li className="flex items-center gap-2">🔄 <b className="text-white">5. Ruleta de Verbos</b> — բայական կապակցություններ</li>
                    <li className="flex items-center gap-2">🧠 <b className="text-white">6. Desafío de Estados</b> — հոգեվիճակների վերջնախաղ</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. CLASSROOM DASHBOARD */}
          {screen === 'CLASSROOM_DASHBOARD' && (
            <motion.div 
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col gap-6 relative z-10"
            >
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white select-none">Սենյորիտա Էլենայի 3D Սենյակը</h2>
                  <p className="text-xs text-slate-300 font-semibold font-mono">Ընտրեք համապատասխան դասագիրքը քննության փուլը շարունակելու համար:</p>
                </div>

                {completedGamesCount === 6 && (
                  <button 
                    onClick={finishAllExam}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white font-bold text-sm rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2"
                  >
                    <span>🎯 Ավարտել և ստանալ գնահատականը</span>
                  </button>
                )}
              </div>

              {/* Classroom visual table representation (3D simulated layout) */}
              <div className="bg-[#0c1322]/50 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 relative min-h-[400px] overflow-hidden flex flex-col justify-between shadow-2xl">
                {/* Board area representing lesson notes */}
                <div className="border border-white/15 bg-emerald-950/40 backdrop-blur-xl rounded-2xl p-5 relative z-10 shadow-inner">
                  {/* Subtle chalk board marks */}
                  <div className="absolute inset-0 bg-radial-gradient from-emerald-900/10 to-slate-900/20 pointer-events-none" />
                  
                  <div className="flex justify-between items-start flex-wrap gap-2 text-white">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-emerald-300 font-bold uppercase"> pizarra / Գրատախտակ</span>
                      <h4 className="text-lg font-serif font-semibold text-emerald-100">Examen de Preposiciones</h4>
                    </div>
                    <div className="text-right text-xs font-mono text-emerald-300">
                      <div>Միավոր՝ {totalScore} / 18</div>
                      <div>Փուլեր` {completedGamesCount} / 6</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-4">
                    {[1, 2, 3, 4, 5, 6].map(i => {
                      const completed = gameScores[i] !== undefined;
                      return (
                        <div key={i} className="bg-emerald-900/35 border border-emerald-800/50 rounded-xl p-3 flex flex-col items-center text-center">
                          <span className="text-[10px] font-mono text-emerald-300">ՓՈՒԼ {i}</span>
                          <span className="text-lg mt-1 font-bold">{completed ? "✅" : "📁"}</span>
                          <span className="text-xs text-emerald-100 mt-1 font-mono font-medium">
                            {completed ? `${gameScores[i]}/3` : "Սպասում է"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Desk Bookshelf container (3D Isometric Layout representation) */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10 pb-4">
                  {/* Map over the 6 Games */}
                  {[
                    { idx: 1, title: "La Brújula de Posición", desc: "Տարածական Նախդիրներ", emoji: "🧭", color: "from-emerald-400 to-teal-500" },
                    { idx: 2, title: "El Puente de Conectores", desc: "Նախադասության Կամուրջներ", emoji: "🌉", color: "from-amber-400 to-orange-500" },
                    { idx: 3, title: "El Laberinto de Tiempo", desc: "Ժամանակային Լաբիրինթներ", emoji: "⏱️", color: "from-indigo-400 to-purple-500" },
                    { idx: 4, title: "La Cafetería del Menú", desc: "Խոհարարական Դասակարգում", emoji: "🍽️", color: "from-rose-400 to-pink-500" },
                    { idx: 5, title: "La Ruleta de Verbos", desc: "Բայական Ռուլետկաներ", emoji: "🔄", color: "from-purple-400 to-violet-500" },
                    { idx: 6, title: "El Desafío de los Estados", desc: "Հոգեվիճակների Փորձություն", emoji: "🧠", color: "from-blue-400 to-rose-500" }
                  ].map(game => {
                    const isCompleted = gameScores[game.idx] !== undefined;
                    
                    return (
                      <motion.div
                        key={game.idx}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center justify-between gap-4 cursor-pointer hover:bg-white/10 hover:border-white/25 transition-all text-white shadow-lg relative overflow-hidden group"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => selectGame(game.idx)}
                      >
                        {/* 3D gradient glowing block */}
                        <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${game.color}`} />
                        
                        <div className="flex flex-col gap-1 pr-2">
                          <span className="text-[10px] font-mono text-slate-300">ԳԻՐՔ {game.idx}</span>
                          <h4 className="font-display font-black text-sm md:text-base leading-tight group-hover:text-amber-400 transition-colors">
                            {game.title}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">{game.desc}</p>
                          
                          {isCompleted ? (
                            <span className="text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-0.5 px-2 rounded-full w-max mt-2">
                              Միավոր՝ {gameScores[game.idx]} / 3
                            </span>
                          ) : (
                            <span className="text-[11px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 py-0.5 px-2 rounded-full w-max mt-2">
                              Չանցած
                            </span>
                          )}
                        </div>

                        <div className="text-3xl filter drop-shadow">
                          {game.emoji}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* 3. ACTIVE GAME SCREEN */}
          {screen === 'GAME_ACTIVE' && activeGameIndex !== null && (
            <motion.div 
              key="game-room"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex flex-col gap-4"
            >
              {/* Back navigation button */}
              <button 
                onClick={() => {
                  sound.playSlide();
                  setScreen('CLASSROOM_DASHBOARD');
                  setActiveGameIndex(null);
                  handleSpeechUpdate("Դու վերադարձար գլխավոր դասարան։ Կարող ես շարունակել ցանկացած պահի։");
                }}
                className="w-max flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 rounded-xl transition-all shadow-md text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Վերադառնալ Դասարան</span>
              </button>

              {/* Display specific Game component */}
              {activeGameIndex === 1 && (
                <Game1Spatial onGameComplete={handleGameComplete} teacherSpeech={handleSpeechUpdate} />
              )}
              {activeGameIndex === 2 && (
                <Game2Bridge onGameComplete={handleGameComplete} teacherSpeech={handleSpeechUpdate} />
              )}
              {activeGameIndex === 3 && (
                <Game3Time onGameComplete={handleGameComplete} teacherSpeech={handleSpeechUpdate} />
              )}
              {activeGameIndex === 4 && (
                <Game4Cafe onGameComplete={handleGameComplete} teacherSpeech={handleSpeechUpdate} />
              )}
              {activeGameIndex === 5 && (
                <Game5Roulette onGameComplete={handleGameComplete} teacherSpeech={handleSpeechUpdate} />
              )}
              {activeGameIndex === 6 && (
                <Game6States onGameComplete={handleGameComplete} teacherSpeech={handleSpeechUpdate} />
              )}
            </motion.div>
          )}

          {/* 4. RESULTS SCREEN */}
          {screen === 'RESULTS' && (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-1 flex flex-col justify-center items-center py-6"
            >
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-2xl max-w-2xl w-full text-center flex flex-col gap-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 via-indigo-500 to-rose-400" />
                
                <p className="text-4xl">🎓🎉</p>
                
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-display text-white leading-tight">
                    Իսպաներենի Նախդիրների Քննություն
                  </h2>
                  <p className="text-xs font-mono text-slate-400 tracking-widest font-semibold uppercase mt-1">Tarjeta de Calificaciones / Գնահատագիր</p>
                </div>

                <div className="flex justify-center items-center gap-6 my-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">ԸՆԴՀԱՆՈՒՐ ՄԻԱՎՈՐ</span>
                    <span className="text-3xl font-mono font-bold text-indigo-300 mt-1">{totalScore} <span className="text-xs text-slate-500">/ 18</span></span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center">
                    <span className="text-[10px] font-mono text-slate-400 font-semibold">ԳՆԱՀԱՏԱԿԱՆ</span>
                    <span className="text-lg font-bold text-emerald-400 mt-1.5 uppercase font-sans">
                      {totalScore >= 15 ? "Sobresaliente" : totalScore >= 10 ? "Notable" : "Aprobado"}
                    </span>
                  </div>
                </div>

                <div className="border border-white/10 rounded-2xl p-4 text-left bg-white/5">
                  <h4 className="text-xs font-mono font-bold text-slate-400 mb-2 uppercase">Մանրամասն արդյունքներ ըստ փուլերի.</h4>
                  <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                    <div>🧭 1. La Brújula de Posición: <b>{gameScores[1] || 0} / 3</b></div>
                    <div>🌉 2. El Puente de Conectores: <b>{gameScores[2] || 0} / 3</b></div>
                    <div>⏱️ 3. El Laberinto de Tiempo: <b>{gameScores[3] || 0} / 3</b></div>
                    <div>🍽️ 4. La Cafetería del Menú: <b>{gameScores[4] || 0} / 3</b></div>
                    <div>🔄 5. La Ruleta de Verbos: <b>{gameScores[5] || 0} / 3</b></div>
                    <div>🧠 6. El Desafío de los Estados: <b>{gameScores[6] || 0} / 3</b></div>
                  </div>
                </div>

                <button
                  onClick={restartExam}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-sm"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Վերսկսել քննությունը (Restart Exam)</span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Footer copyright */}
      <footer className="bg-[#0c1322]/85 backdrop-blur-md border-t border-white/10 py-6 text-center text-xs text-slate-400 font-mono">
        <div>Spanish Prepositional Expressions Class Exam</div>
        <div className="mt-1 text-[10px]">🇦🇲 Armenian to 🇪🇸 Spanish Dynamic Interactive 3D Suite</div>
      </footer>

    </div>
  );
}
