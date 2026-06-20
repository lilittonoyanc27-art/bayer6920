import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCABULARY, VocabularyItem } from './vocabulary';
import { sound } from './sound';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Table } from 'lucide-react';

interface Game2BridgeProps {
  onGameComplete: (score: number) => void;
  teacherSpeech: (text: string) => void;
}

interface BridgeQuestion {
  id: string;
  sentence: string; // "Debemos caminar ___."
  armenianSentence: string; // "Մենք պետք է գնանք ոտքով:"
  missingArmenian: string; // "ոտքով"
  correctSpanish: string; // "a pie"
  item: VocabularyItem;
  bgClass: string;
}

export default function Game2Bridge({ onGameComplete, teacherSpeech }: Game2BridgeProps) {
  // Let's create 3 structured bridge questions
  const [questions] = useState<BridgeQuestion[]>(() => {
    const q1 = VOCABULARY.find(v => v.spanish === "a pie")!;
    const q2 = VOCABULARY.find(v => v.spanish === "con destino a")!;
    const q3 = VOCABULARY.find(v => v.spanish === "en esta zona")!;
    const q4 = VOCABULARY.find(v => v.spanish === "para mí / para ti")!;
    const q5 = VOCABULARY.find(v => v.spanish === "por teléfono")!;

    const pool: BridgeQuestion[] = [
      {
        id: "bq1",
        sentence: "Nosotros viajamos ______ por la ciudad.",
        armenianSentence: "Մենք ճանապարհորդում ենք ոտքով քաղաքով մեկ։",
        missingArmenian: "ոտքով",
        correctSpanish: "a pie",
        item: q1,
        bgClass: "bg-amber-100"
      },
      {
        id: "bq2",
        sentence: "El tren sale hoy ______ Madrid.",
        armenianSentence: "Գնացքն այսօր մեկնում է դեպի նպատակակետ Մադրիդ։",
        missingArmenian: "դեպի նպատակակետ",
        correctSpanish: "con destino a",
        item: q2,
        bgClass: "bg-emerald-100"
      },
      {
        id: "bq3",
        sentence: "El clima es muy agradable ______ .",
        armenianSentence: "Եղանակը շատ հաճելի է այս շրջանում (այս կողմերում)։",
        missingArmenian: "այս շրջանում / այս կողմերում",
        correctSpanish: "en esta zona",
        item: q3,
        bgClass: "bg-teal-100"
      },
      {
        id: "bq4",
        sentence: "______ , este libro es el mejor para aprender español.",
        armenianSentence: "Իմ կարծիքով (ինձ համար) այս գիրքը լավագույնն է իսպաներեն սովորելու համար։",
        missingArmenian: "քո կարծիքով / ինձ համար",
        correctSpanish: "para mí", // customized display helper
        item: q4,
        bgClass: "bg-sky-100"
      },
      {
        id: "bq5",
        sentence: "Ella prefiere hablar ______ .",
        armenianSentence: "Նա նախընտրում է խոսել հեռախոսով ։",
        missingArmenian: "հեռախոսով",
        correctSpanish: "por teléfono",
        item: q5,
        bgClass: "bg-rose-100"
      }
    ];

    // Pick 3 random bridge questions
    return pool.sort(() => 0.5 - Math.random()).slice(0, 3);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);

  const currentQuestion = questions[currentIndex];

  React.useEffect(() => {
    if (!currentQuestion) return;

    teacherSpeech(`Լրացրու բաց թողնված հատվածը։ Կառուցիր ճիշտ իսպաներեն կամուրջը՝ համապատասխանեցնելով շեշտված բառը։`);

    // Wrong options pool
    const wrongAnswers = VOCABULARY
      .filter(v => v.spanish !== currentQuestion.correctSpanish && v.spanish !== currentQuestion.item.spanish)
      .map(v => v.spanish)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const opts = [currentQuestion.correctSpanish, ...wrongAnswers];
    setOptions(opts.sort(() => 0.5 - Math.random()));

    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex, currentQuestion]);

  const handleAnswer = (ans: string) => {
    if (isAnswered) return;
    setSelectedAnswer(ans);
    setIsAnswered(true);

    const isRight = ans === currentQuestion.correctSpanish;
    setIsCorrect(isRight);

    if (isRight) {
      setScore(prev => prev + 1);
      sound.playCorrect();
      teacherSpeech(`Ապրե՛ս: «${currentQuestion.correctSpanish}» նախդիրը հիանալի կերպով լրացրեց նախադասությունը:`);
    } else {
      sound.playError();
      teacherSpeech(`Իրականում ճիշտ պատասխանն է «${currentQuestion.correctSpanish}»` + `:`);
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
    <div id="game-2-container" className="flex flex-col gap-6 relative z-10 font-sans">
      {/* Title block */}
      <div className="flex justify-between items-center bg-[#0c1322]/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg text-white">
        <div>
          <span className="text-xs font-mono py-1 px-2 bg-amber-500/15 text-amber-400 border border-amber-500/20 rounded-md font-semibold font-bold">Խաղ 2 / 6</span>
          <h2 className="text-xl font-bold text-white mt-1 select-none font-display">El Puente de Conectores <span className="text-slate-400 font-normal">| Նախդիրների Կամուրջ</span></h2>
        </div>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-7 h-2.5 rounded-full transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-amber-500' 
                  : idx === currentIndex 
                    ? 'bg-indigo-500 w-10 animate-pulse' 
                    : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left / Upper: 3D Bridge Visualization */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl overflow-hidden p-6 relative border border-white/10 shadow-2xl min-h-[300px]">
          {/* Stars / Sky effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c1322]/40 via-[#1b1936]/40 to-[#070b13]/40 opacity-90 z-0" />
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Դասական 3D Perspectiva</span>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-between">
            {/* The Sentence Box */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl mt-8">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">Իսպաներեն Նախադասություն</span>
              <p className="text-lg md:text-xl text-white font-serif leading-relaxed">
                {currentQuestion.sentence.split('______')[0]}
                <span className={`inline-block border-b-2 px-3 mx-1 font-mono font-bold transition-all duration-300 ${
                  isAnswered 
                    ? isCorrect 
                      ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                      : 'border-rose-500 text-rose-400 bg-rose-500/10'
                    : 'border-amber-400 text-amber-300 animate-pulse font-normal bg-amber-400/5'
                }`}>
                  {isAnswered ? currentQuestion.correctSpanish : ' ? ? ? '}
                </span>
                {currentQuestion.sentence.split('______')[1]}
              </p>
              
              <div className="mt-4 pt-4 border-t border-white/5 flex gap-2 items-start text-xs md:text-sm text-slate-300">
                <span className="text-amber-400 font-bold font-mono">🇦🇲</span>
                <p>
                  {currentQuestion.armenianSentence.split(currentQuestion.missingArmenian)[0]}
                  <span className="text-amber-300 underline font-semibold decoration-wavy decoration-amber-400">
                    {currentQuestion.missingArmenian}
                  </span>
                  {currentQuestion.armenianSentence.split(currentQuestion.missingArmenian)[1]}
                </p>
              </div>
            </div>

            {/* 3D-ish Bridge Planks Rendering */}
            <div className="mt-8 flex justify-between items-end gap-1 px-4 relative h-16 border-b border-white/10">
              {/* Left Pillar */}
              <div className="w-10 h-14 bg-white/5 border border-white/10 rounded-t-lg shadow-lg flex items-center justify-center text-[9px] text-slate-400 font-mono">🇦🇲 START</div>
              
              {/* Planks */}
              <div className="flex-1 flex justify-around items-end h-full px-2 relative z-10">
                {[0, 1, 2].map(plankIndex => {
                  const state = plankIndex < currentIndex 
                    ? 'complete' 
                    : plankIndex === currentIndex 
                      ? isAnswered 
                        ? isCorrect 
                          ? 'success' 
                          : 'failed'
                        : 'active'
                      : 'empty';

                  return (
                    <motion.div
                      key={plankIndex}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      className={`h-4 w-1/4 rounded-md border-t-2 transition-all duration-500 ${
                        state === 'complete' 
                          ? 'bg-amber-600 border-amber-400 shadow shadow-amber-900/50'
                          : state === 'success'
                            ? 'bg-emerald-600 border-emerald-400 shadow shadow-emerald-900/50 h-5'
                            : state === 'failed'
                              ? 'bg-rose-950/50 border-rose-500 shadow'
                              : state === 'active'
                                ? 'bg-white/10 border-dashed border-white/20 animate-pulse'
                                : 'bg-white/5 border-white/5'
                      }`}
                    >
                      {state === 'success' && (
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs">⭐</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Pillar */}
              <div className="w-10 h-14 bg-white/5 border border-white/10 rounded-t-lg shadow-lg flex items-center justify-center text-[9px] text-slate-400 font-mono">SPA GOAL</div>
            </div>
          </div>
        </div>

        {/* Right / Lower: Interactive Block Options */}
        <div className="lg:col-span-6 flex flex-col justify-between bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl text-white">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1 px-2.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-md font-mono text-xs font-bold uppercase">Ընտրանքներ</span>
              <p className="text-xs text-slate-400">Ընտրիր համապատասխան փայտիկը կամուրջը ավարտին հասցնելու համար:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.map((opt, i) => {
                let cardStyle = "border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-400 cursor-pointer shadow-sm text-slate-200";
                if (isAnswered) {
                  if (opt === currentQuestion.correctSpanish) {
                    cardStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-300 pointer-events-none";
                  } else if (opt === selectedAnswer) {
                    cardStyle = "border-rose-500 bg-rose-500/15 text-rose-300 pointer-events-none";
                  } else {
                    cardStyle = "border-white/5 bg-white/5 opacity-50 pointer-events-none text-slate-500";
                  }
                }

                return (
                  <motion.div
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={`py-4 px-4 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${cardStyle}`}
                    whileHover={!isAnswered ? { scale: 1.02, y: -2 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-md bg-amber-500/15 border border-amber-550 text-amber-300 flex items-center justify-center text-xs font-bold font-mono">
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className="font-mono text-sm md:text-base font-bold">{opt}</span>
                    </div>
                    {isAnswered && opt === currentQuestion.correctSpanish && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    {isAnswered && opt === selectedAnswer && opt !== currentQuestion.correctSpanish && <XCircle className="w-5 h-5 text-rose-400" />}
                  </motion.div>
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
                  {currentQuestion.item.explanation}
                </div>

                <button
                  id="game-2-next"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                >
                  <span>Հաջորդ Կառամատույց</span>
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
