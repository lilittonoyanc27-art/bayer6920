import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCABULARY, VocabularyItem } from './vocabulary';
import { sound } from './sound';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Clock, ShieldAlert } from 'lucide-react';

interface Game3TimeProps {
  onGameComplete: (score: number) => void;
  teacherSpeech: (text: string) => void;
}

interface TimeQuestion {
  id: string;
  scenarioArmenian: string; // Armenian task description
  clockValue: string; // e.g. "12:00" or "Calendar: June 1st"
  correctSpanish: string; // e.g. "al mediodía"
  displayOptions: string[];
  vocabularyItem: VocabularyItem;
}

export default function Game3Time({ onGameComplete, teacherSpeech }: Game3TimeProps) {
  const [questions] = useState<TimeQuestion[]>(() => {
    const itemMediodia = VOCABULARY.find(v => v.spanish === "al mediodía")!;
    const itemAntelacion = VOCABULARY.find(v => v.spanish === "con antelación")!;
    const itemDesdeHace = VOCABULARY.find(v => v.spanish === "desde hace")!;
    const itemPrincipios = VOCABULARY.find(v => v.spanish === "a principios de")!;
    const itemDeVezEnCuando = VOCABULARY.find(v => v.spanish === "de vez en cuando")!;

    const pool: TimeQuestion[] = [
      {
        id: "tq1",
        scenarioArmenian: "Ընտրիր այն նախդիրը, որը համապատասխանում է ցերեկային ժամը 12:00-ին՝ «կեսօրին»։",
        clockValue: "12:00 PM ☀️",
        correctSpanish: "al mediodía",
        displayOptions: ["al mediodía", "a finales de", "antes de", "dentro de"],
        vocabularyItem: itemMediodia,
      },
      {
        id: "tq2",
        scenarioArmenian: "Երբ դու նախօրոք (ժամանակից շուտ) պատվիրում ես հյուրանոցային համար, ո՞ր արտահայտությունն ես կիրառում։",
        clockValue: "Booking: -5 Days 🗓️",
        correctSpanish: "con antelación",
        displayOptions: ["con antelación", "hasta que", "desde hace", "después de"],
        vocabularyItem: itemAntelacion,
      },
      {
        id: "tq3",
        scenarioArmenian: "Ցանկանում ես ասել՝ «Ես սովորում եմ իսպաներեն արդեն 3 տարի է» (ժամանակային տևողությունը՝ սկսած անցյալից)։",
        clockValue: "3 Years continuous",
        correctSpanish: "desde hace",
        displayOptions: ["desde hace", "desde", "hasta ahora", "al principio"],
        vocabularyItem: itemDesdeHace,
      },
      {
        id: "tq4",
        scenarioArmenian: "Ինչպե՞ս կթարգմանես «ամսվա սկզբին» իսպաներեն տարբերակը։",
        clockValue: "Calendar: June 1st 📅",
        correctSpanish: "a principios de",
        displayOptions: ["a principios de", "a finales de", "al mediodía", "dentro de"],
        vocabularyItem: itemPrincipios,
      },
      {
        id: "tq5",
        scenarioArmenian: "Յուրաքանչյուր շաբաթ մի քանի անգամ` «ժամանակ առ ժամանակ» գործողություն անելիս:",
        clockValue: "Sometimes 🔄",
        correctSpanish: "de vez en cuando",
        displayOptions: ["de vez en cuando", "en absoluto", "cuanto antes", "todavía"],
        vocabularyItem: itemDeVezEnCuando,
      }
    ];

    return pool.sort(() => 0.5 - Math.random()).slice(0, 3);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentQuestion = questions[currentIndex];

  React.useEffect(() => {
    if (!currentQuestion) return;
    
    // Voice output
    teacherSpeech(`Ժամանակը թանկ է։ Ուշադի՛ր նայիր ժամացույցին և ընտրիր համապատասխան ժամանակային նախդիրը։`);
    
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex, currentQuestion]);

  const handleAnswer = (ans: string) => {
    if (isAnswered) return;
    setSelectedAnswer(ans);
    setIsAnswered(true);

    const right = ans === currentQuestion.correctSpanish;
    setIsCorrect(right);

    if (right) {
      setScore(prev => prev + 1);
      sound.playCorrect();
      teacherSpeech(`Փայլո՛ւն է: Դու ճիշտ ես. «${currentQuestion.correctSpanish}» արտահայտությունը ճիշտ է։`);
    } else {
      sound.playError();
      teacherSpeech(`Ո՛չ, ճիշտ պատասխանն էր «${currentQuestion.correctSpanish}»`);
    }
  };

  const handleNext = () => {
    sound.playSlide();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onGameComplete(score);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div id="game-3-container" className="flex flex-col gap-6 relative z-10 font-sans">
      {/* Quiz Progress Header */}
      <div className="flex justify-between items-center bg-[#0c1322]/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg text-white">
        <div>
          <span className="text-xs font-mono py-1 px-2 bg-indigo-500/15 text-indigo-400 border border-indigo-500/20 rounded-md font-semibold font-bold">Խաղ 3 / 6</span>
          <h2 className="text-xl font-bold text-white mt-1 select-none font-display">El Laberinto de Tiempo <span className="text-slate-400 font-normal">| Ժամանակային Լաբիրինթ</span></h2>
        </div>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-7 h-2.5 rounded-full transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-indigo-500' 
                  : idx === currentIndex 
                    ? 'bg-pink-500 w-10 animate-pulse' 
                    : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 3D interactive clock with dynamic rotation */}
        <div className="md:col-span-5 flex flex-col justify-center items-center bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl p-6 relative border border-white/10 overflow-hidden min-h-[300px]">
          <div className="absolute inset-0 bg-grid-white/[0.08] z-0" />
          
          {/* Animated Perspective Dial */}
          <motion.div 
            style={{ perspective: 600 }}
            className="w-40 h-40 rounded-full bg-slate-950/80 border-2 border-indigo-400/50 shadow-2xl flex flex-col items-center justify-center relative z-10 p-4"
            animate={{ rotateY: isAnswered ? (isCorrect ? 360 : -18) : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            <Clock className="w-10 h-10 text-indigo-400 mb-2 animate-bounce" />
            <span className="text-white font-mono font-bold text-sm text-center leading-tight tracking-wider">
              {currentQuestion.clockValue}
            </span>
            <div className="absolute w-1 bg-amber-400/80 rounded-full h-12 top-6 origin-bottom animate-spin" style={{ animationDuration: '10s' }} />
          </motion.div>

          <div className="text-center mt-6 z-10 w-full">
            <span className="px-3 py-1 bg-white/5 backdrop-blur rounded-full text-white/95 text-xs font-mono border border-white/10">
              Chronos Laberinto
            </span>
          </div>
        </div>

        {/* Right Column: Scenario card and Options */}
        <div className="md:col-span-7 flex flex-col justify-between bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl text-white">
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
              <span className="text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-widest block mb-1">Ժամանակային Իրավիճակ</span>
              <p className="text-sm md:text-base font-semibold text-slate-100 leading-relaxed">
                {currentQuestion.scenarioArmenian}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {currentQuestion.displayOptions.map((opt, i) => {
                let badgeStyle = "border-white/10 bg-white/5 hover:border-indigo-400 text-slate-200 cursor-pointer";
                if (isAnswered) {
                  if (opt === currentQuestion.correctSpanish) {
                    badgeStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-300 pointer-events-none shadow-md";
                  } else if (opt === selectedAnswer) {
                    badgeStyle = "border-rose-500 bg-rose-500/15 text-rose-300 pointer-events-none shadow-md";
                  } else {
                    badgeStyle = "border-white/5 bg-white/5 opacity-40 pointer-events-none text-slate-500";
                  }
                }

                return (
                  <motion.button
                    disabled={isAnswered}
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={`py-3.5 px-4 font-mono font-semibold text-sm rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${badgeStyle}`}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  >
                    <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center text-[11px] font-bold">{i + 1}</span>
                    <span className="truncate">{opt}</span>
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
                <div className={`p-4 rounded-2xl text-xs md:text-sm leading-relaxed ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'}`}>
                  <p className="font-bold text-white flex items-center gap-1 mb-1">
                    <span>👩‍🏫 Ուսուցչի Բացատրությունը:</span>
                  </p>
                  {currentQuestion.vocabularyItem.explanation}
                </div>

                <button
                  id="game-3-next"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                >
                  <span>Հաջորդ Տիրույթ</span>
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
