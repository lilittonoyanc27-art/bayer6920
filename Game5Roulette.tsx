import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCABULARY, VocabularyItem } from './vocabulary';
import { sound } from './sound';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCw, Sparkles } from 'lucide-react';

interface Game5RouletteProps {
  onGameComplete: (score: number) => void;
  teacherSpeech: (text: string) => void;
}

interface RouletteQuestion {
  id: string;
  verb: string;
  verbArmenian: string; // Armenian verb definition
  correctPrep: string;
  explanation: string;
}

export default function Game5Roulette({ onGameComplete, teacherSpeech }: Game5RouletteProps) {
  const [questions] = useState<RouletteQuestion[]>([
    {
      id: "rq1",
      verb: "soñar (երազել)",
      verbArmenian: "«երազել ինչ-որ բանի/մեկի մասին» իսպաներենում",
      correctPrep: "con",
      explanation: "Իսպաներենում «երազել» - «soñar» բայը միշտ պահանջում է «con» նախդիրը, ոչ թե 'sobre' կամ 'de': (օրինակ՝ «Sueño con viajar» - Երազում եմ ճանապարհորդելու մասին):"
    },
    {
      id: "rq2",
      verb: "pensar (մտածել)",
      verbArmenian: "«մտածել մի բանի/մեկի մասին» իսպաներենում",
      correctPrep: "en",
      explanation: "«Pensar en algo/alguien» նշանակում է մտածել ինչ-որ բանի/մեկի մասին: (օրինակ՝ «Pienso en ti» - Մտածում եմ քո մասին):"
    },
    {
      id: "rq3",
      verb: "acordarse (հիշել)",
      verbArmenian: "«մտաբերել / հիշել ինչ-որ բան» իսպաներենում",
      correctPrep: "de",
      explanation: "«Acordarse» անդրադարձ բայը պարտադիր պահանջում է «de» նախդիրը: (օրինակ՝ «Me acuerdo de aquel día» - Հիշում եմ այն օրը):"
    },
    {
      id: "rq4",
      verb: "dirigirse (դիմել)",
      verbArmenian: "«դիմել մեկին (խոսքով) կամ ուղղվել դեպի»",
      correctPrep: "a",
      explanation: "«Dirigirse a alguien» նշանակում է դիմել որևէ մեկին կամ ուղղվել որևէ տեղ: (օրինակ՝ «Me dirijo al director» - Դիմում եմ տնօրենին):"
    },
    {
      id: "rq5",
      verb: "servir (ծառայել)",
      verbArmenian: "«ծառայել ինչ-որ բանի համար / պիտանի լինել»",
      correctPrep: "para",
      explanation: "«Servir para» նշանակում է պիտանի լինել որևէ նպատակի համար: (օրինակ՝ «Это служит для письма» - Սա ծառայում է գրելու համար):"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedPrep, setSelectedPrep] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [rotationDegrees, setRotationDegrees] = useState<number>(0);

  const currentQuestion = questions[currentIndex];
  const prepositionOptions = ["con", "en", "de", "a", "para", "por"];

  const handleSpinAndSet = () => {
    if (isSpinning || isAnswered) return;
    setIsSpinning(true);
    sound.playSlide();

    // Random rotation degrees (multiples of 360 to spin at least 3-4 times plus slice offset)
    const extraRot = 720 + Math.floor(Math.random() * 360);
    setRotationDegrees(prev => prev + extraRot);

    setTimeout(() => {
      setIsSpinning(false);
      teacherSpeech(`Ռուլետկան ընտրեց «${currentQuestion.verb}» բայը։ Ո՞ր նախդիրն է պահանջում այս բայը։`);
    }, 1800);
  };

  React.useEffect(() => {
    // Spin initially for first question
    handleSpinAndSet();
  }, [currentIndex]);

  const handleAnswer = (prep: string) => {
    if (isAnswered || isSpinning) return;
    setSelectedPrep(prep);
    setIsAnswered(true);

    const right = prep === currentQuestion.correctPrep;
    setIsCorrect(right);

    if (right) {
      setScore(prev => prev + 1);
      sound.playCorrect();
      teacherSpeech(`Անթերի՛ է: «${currentQuestion.verb.split(' ')[0]} ${currentQuestion.correctPrep}» կառույցը քերականորեն ճիշտ է։`);
    } else {
      sound.playError();
      teacherSpeech(`Օ՜, ոչ։ Իրականում ճիշտ պատասխանն է՝ «${currentQuestion.correctPrep}»։`);
    }
  };

  const handleNext = () => {
    sound.playSlide();
    if (currentIndex < 2) { // Play 3 random questions
      setCurrentIndex(prev => prev + 1);
      setSelectedPrep(null);
      setIsAnswered(false);
    } else {
      onGameComplete(score);
    }
  };

  if (!currentQuestion) return null;

  return (
    <div id="game-5-container" className="flex flex-col gap-6 relative z-10 font-sans">
      {/* Quiz Progress Header */}
      <div className="flex justify-between items-center bg-[#0c1322]/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg text-white">
        <div>
          <span className="text-xs font-mono py-1 px-2 bg-purple-500/15 text-purple-400 border border-purple-500/20 rounded-md font-semibold font-bold">Խաղ 5 / 6</span>
          <h2 className="text-xl font-bold text-white mt-1 select-none font-display">La Ruleta de Verbos <span className="text-slate-400 font-normal">| Բայական Ռուլետկա</span></h2>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2].map((_, idx) => (
            <div 
              key={idx} 
              className={`w-7 h-2.5 rounded-full transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-purple-500' 
                  : idx === currentIndex 
                    ? 'bg-amber-500 w-10 animate-pulse' 
                    : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 1D rotating roulette wheel */}
        <div className="md:col-span-5 flex flex-col justify-center items-center bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl p-6 border border-white/10 relative overflow-hidden min-h-[300px]">
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/50 z-0 animate-pulse" />
          
          <div className="relative w-48 h-48 z-10 flex items-center justify-center">
            {/* The Outer Needle Pin */}
            <div className="absolute top-0 w-4 h-6 bg-amber-400 border border-amber-300 rounded-b-md shadow-lg z-20 animate-pulse" />
            
            {/* Rotating Wheel body */}
            <motion.div
              animate={{ rotate: rotationDegrees }}
              transition={{ type: "spring", stiffness: 40, damping: 11 }}
              className="w-44 h-44 rounded-full border-4 border-amber-400 shadow-2xl relative flex items-center justify-center overflow-hidden"
              style={{
                background: "conic-gradient(#312e81 0deg 60deg, #4c1d95 60deg 120deg, #1e1b4b 120deg 180deg, #581c87 180deg 240deg, #111827 240deg 300deg, #4338ca 300deg 360deg)"
              }}
            >
              {/* Wheel inner cross accents */}
              <div className="absolute w-full h-0.5 bg-amber-400/30" />
              <div className="absolute h-full w-0.5 bg-amber-400/30" />
              
              {/* Center pointer dial */}
              <div className="w-16 h-16 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center z-10 shadow-lg shadow-black/80">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </motion.div>
          </div>

          <div className="text-center mt-6 z-10 flex flex-col items-center gap-1 w-full">
            <span className="text-[10px] font-mono tracking-widest bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full border border-amber-400/30 uppercase font-bold">
              RUEDA GRAMATICAL
            </span>
            <p className="text-xs text-slate-300 mt-2 text-center max-w-[200px] font-bold">
               {isSpinning ? "🔄 Պտտվում է..." : `Բայ՝ ${currentQuestion.verb}`}
            </p>
          </div>
        </div>

        {/* Right Column: Scenario card and Options */}
        <div className="md:col-span-7 flex flex-col justify-between bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl text-white">
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-white/5 text-purple-400 border border-white/10 rounded-lg">
                <RotateCw className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
              <div>
                <p className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest leading-none mb-1">Բայական Պարտադիր Կառույց</p>
                <p className="text-sm font-bold text-slate-100 leading-normal mt-1">
                  Ինչպե՞ս կասենք <span className="text-purple-400 underline font-extra-bold px-1">«{currentQuestion.verbArmenian}»</span> ։ Ընտրիր ճիշտ կապը:
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-2">
              {prepositionOptions.map((opt) => {
                let btnClass = "border-white/10 text-slate-200 hover:border-purple-400 hover:bg-white/10 cursor-pointer";
                if (isAnswered) {
                  if (opt === currentQuestion.correctPrep) {
                    btnClass = "border-emerald-500 bg-emerald-500/15 text-emerald-300 pointer-events-none shadow-md";
                  } else if (opt === selectedPrep) {
                    btnClass = "border-rose-500 bg-rose-500/15 text-rose-300 pointer-events-none shadow-md";
                  } else {
                    btnClass = "border-white/5 bg-white/5 opacity-40 pointer-events-none text-slate-500";
                  }
                }

                return (
                  <motion.button
                    disabled={isAnswered || isSpinning}
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={`py-3 px-2 font-mono font-bold text-sm text-center rounded-xl border flex items-center justify-center transition-all cursor-pointer ${btnClass}`}
                    whileHover={!isAnswered && !isSpinning ? { scale: 1.04 } : {}}
                    whileTap={!isAnswered && !isSpinning ? { scale: 0.96 } : {}}
                  >
                    <span>{opt}</span>
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
                <div className={`p-4 rounded-xl text-xs md:text-sm leading-relaxed ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300' : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'}`}>
                  <p className="font-bold flex items-center gap-1.5 text-xs text-white uppercase tracking-wide mb-1">
                    <span>👩‍🏫 Ուսուցչի Բացատրությունը:</span>
                  </p>
                  {currentQuestion.explanation}
                </div>

                <button
                  id="game-5-next"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                >
                  <span>Հաջորդ Պտույտ</span>
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
