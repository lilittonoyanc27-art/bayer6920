import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCABULARY, VocabularyItem } from './vocabulary';
import { sound } from './sound';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Soup, Utensils, Cake, Coffee } from 'lucide-react';

interface Game4CafeProps {
  onGameComplete: (score: number) => void;
  teacherSpeech: (text: string) => void;
}

interface MenuPlacementItem {
  id: string;
  nameArmenian: string;
  nameSpanish: string;
  courseArmenian: string; // "որպես առաջին ուտեստ"
  courseSpanish: string; // "de primero"
  icon: any;
  explanation: string;
}

export default function Game4Cafe({ onGameComplete, teacherSpeech }: Game4CafeProps) {
  // 3 dishes order
  const [plates, setPlates] = useState<MenuPlacementItem[]>([
    {
      id: "dish1",
      nameArmenian: "Սխտորով իսպանական ապուր (Sopa de ajo)",
      nameSpanish: "Sopa de ajo",
      courseArmenian: "որպես առաջին ուտեստ",
      courseSpanish: "de primero",
      icon: Soup,
      explanation: "Իսպանիայում թեթև ապուրները կամ աղցանները մատուցվում են որպես առաջին ուտեստ, որը կոչվում է «de primero»:"
    },
    {
      id: "dish2",
      nameArmenian: "Տապակած կովկասյան իշխան (Trucha frita)",
      nameSpanish: "Trucha frita",
      courseArmenian: "որպես հիմնական ուտեստ",
      courseSpanish: "de segundo",
      icon: Utensils,
      explanation: "Տաք մսային կամ ձկնային ուտեստները, որոնք կազմում են ճաշի հիմնական մասը, կոչվում են «de segundo»:"
    },
    {
      id: "dish3",
      nameArmenian: "Կատալոնյան կրեմ (Crema catalana)",
      nameSpanish: "Crema catalana",
      courseArmenian: "որպես աղանդեր",
      courseSpanish: "de postre",
      icon: Cake,
      explanation: "Քաղցրավենիքը, պաղպաղակը կամ թխվածքը ճաշի վերջում մատուցվում է որպես աղանդեր` «de postre»:"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentDish = plates[currentIndex];

  React.useEffect(() => {
    if (!currentDish) return;
    
    teacherSpeech(`Բարի ախորժա՛կ։ Մեր առջև հայտնի ավանդական ուտեստներն են։ Ընտրիր ճիշտ իսպաներեն դասակարգումը։`);
    
    setSelectedCourse(null);
    setIsAnswered(false);
  }, [currentIndex, currentDish]);

  const courseOptions = ["de primero", "de segundo", "de postre", "a la hora de"];

  const handleAnswer = (course: string) => {
    if (isAnswered) return;
    setSelectedCourse(course);
    setIsAnswered(true);

    const right = course === currentDish.courseSpanish;
    setIsCorrect(right);

    if (right) {
      setScore(prev => prev + 1);
      sound.playCorrect();
      teacherSpeech(`Շատ ճիշտ է: «${currentDish.nameSpanish}»-ը մատուցվում է «${currentDish.courseSpanish}» (որպես ${currentDish.courseArmenian}):`);
    } else {
      sound.playError();
      teacherSpeech(`Ո՛չ, սա սխալ է։ Այս ուտեստը պետք է լինի «${currentDish.courseSpanish}»:`);
    }
  };

  const handleNext = () => {
    sound.playSlide();
    if (currentIndex < plates.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onGameComplete(score);
    }
  };

  if (!currentDish) return null;

  const IconComponent = currentDish.icon;

  return (
    <div id="game-4-container" className="flex flex-col gap-6 relative z-10 font-sans">
      {/* Title */}
      <div className="flex justify-between items-center bg-[#0c1322]/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg text-white">
        <div>
          <span className="text-xs font-mono py-1 px-2 bg-rose-500/15 text-rose-400 border border-rose-500/20 rounded-md font-semibold font-bold">Խաղ 4 / 6</span>
          <h2 className="text-xl font-bold text-white mt-1 select-none font-display">La Cafetería del Menú <span className="text-slate-400 font-normal">| Ճաշացանկի Սրճարան</span></h2>
        </div>
        <div className="flex gap-1">
          {plates.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-7 h-2.5 rounded-full transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-rose-500' 
                  : idx === currentIndex 
                    ? 'bg-amber-500 w-10 animate-pulse' 
                    : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Interactive Spanish Menu & Table Rendering */}
        <div className="md:col-span-5 flex flex-col justify-center items-center bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 relative overflow-hidden min-h-[300px]">
          <div className="absolute top-2 right-2 opacity-[0.03]">
            <Coffee className="w-48 h-48 text-white animate-pulse" />
          </div>

          <div className="text-center mb-4 z-10">
            <span className="text-[10px] font-mono tracking-widest bg-white/5 text-amber-300 px-3 py-1 rounded-full border border-white/10 uppercase font-bold">
              PLATILLOS LOCALES
            </span>
          </div>

          {/* 3D Looking Plate with Motion */}
          <motion.div 
            initial={{ scale: 0.8, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            key={currentIndex}
            className="w-44 h-44 rounded-full bg-slate-900/40 shadow-2xl border-4 border-white/10 flex flex-col items-center justify-center p-6 relative z-10"
          >
            {/* Shaded plate outer rim */}
            <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
            <div className="p-3 bg-white/5 text-rose-400 rounded-2xl mb-2 border border-white/10">
              <IconComponent className="w-10 h-10 animate-pulse" />
            </div>
            <p className="text-sm font-bold text-white text-center leading-tight">{currentDish.nameSpanish}</p>
            <p className="text-[10px] text-slate-400 font-mono mt-1">Plato de España</p>
          </motion.div>

          <p className="text-xs text-amber-300 font-semibold bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mt-5 leading-normal text-center z-10 max-w-[240px]">
            🍽️ {currentDish.nameArmenian}
          </p>
        </div>

        {/* Right Column: Choices */}
        <div className="md:col-span-7 flex flex-col justify-between bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl text-white">
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Ռեստորանային Պահանջ</p>
              <p className="text-sm md:text-base font-bold text-slate-100 leading-normal">
                Մենք ուզում ենք պատվիրել սա <span className="text-rose-400 decoration-wavy underline font-extrabold px-1">«{currentDish.courseArmenian}»</span> ։ Ո՞րն է իսպաներեն նախդիրը։
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {courseOptions.map((opt) => {
                let btnClass = "border-white/10 text-slate-200 hover:border-rose-400 hover:bg-white/10 cursor-pointer";
                if (isAnswered) {
                  if (opt === currentDish.courseSpanish) {
                    btnClass = "border-emerald-500 bg-emerald-500/15 text-emerald-300 pointer-events-none shadow-md";
                  } else if (opt === selectedCourse) {
                    btnClass = "border-rose-500 bg-rose-500/15 text-rose-300 pointer-events-none shadow-md";
                  } else {
                    btnClass = "border-white/5 bg-white/5 opacity-40 pointer-events-none text-slate-500";
                  }
                }

                return (
                  <motion.button
                    disabled={isAnswered}
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={`py-3.5 px-4 font-mono font-bold text-sm text-left rounded-xl border flex items-center justify-between transition-all cursor-pointer ${btnClass}`}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  >
                    <span>{opt}</span>
                    <span className="text-xs text-slate-400 font-normal">
                      {opt === "de primero" ? "1-ին ուտեստ" : opt === "de segundo" ? "Հիմնական" : opt === "de postre" ? "Աղանդեր" : "Ուտելիս"}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isAnswered && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-4"
              >
                <div className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'}`}>
                  <p className="font-bold flex items-center gap-1.5 text-xs text-white uppercase tracking-wide mb-1">
                    <span>👩‍🏫 Ուսուցչի Բացատրությունը:</span>
                  </p>
                  {currentDish.explanation}
                </div>

                <button
                  id="game-4-next"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                >
                  <span>Հաջորդ Ուտեստ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
