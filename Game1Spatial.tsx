import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCABULARY, VocabularyItem } from './vocabulary';
import ThreeDCanvas from './ThreeDCanvas';
import { sound } from './sound';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Star } from 'lucide-react';

interface Game1SpatialProps {
  onGameComplete: (score: number) => void;
  teacherSpeech: (text: string) => void;
}

// Select spatial vocab items
const SPATIAL_ITEMS: VocabularyItem[] = VOCABULARY.filter(item => item.category === 'spatial');

export default function Game1Spatial({ onGameComplete, teacherSpeech }: Game1SpatialProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [questions, setQuestions] = useState<VocabularyItem[]>(() => {
    // Pick 3 random spatial items
    const shuffled = [...SPATIAL_ITEMS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  });
  
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [options, setOptions] = useState<string[]>([]);

  // Generate options when current question changes
  const currentQuestion = questions[currentIndex];

  React.useEffect(() => {
    if (!currentQuestion) return;
    
    // Speak question
    teacherSpeech(`Որտե՞ղ է գտնվում կանաչ գնդակը նախշազարդ նարնջագույն տուփի նկատմամբ։ Տեսնու՞մ ես 3D պատկերում։`);

    // Pick 3 wrong answers of category spatial or any matching
    const wrong = SPATIAL_ITEMS.filter(it => it.spanish !== currentQuestion.spanish);
    const shuffledWrong = wrong.sort(() => 0.5 - Math.random()).slice(0, 3);
    const opts = [currentQuestion.spanish, ...shuffledWrong.map(w => w.spanish)];
    setOptions(opts.sort(() => 0.5 - Math.random()));
    
    // Reset answers
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [currentIndex, currentQuestion]);

  const handleAnswer = (ans: string) => {
    if (isAnswered) return;
    setSelectedAnswer(ans);
    setIsAnswered(true);
    
    const correct = ans === currentQuestion.spanish;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      sound.playCorrect();
      teacherSpeech(`Հրաշալի՛ է: Դու ճիշտ ես. «${currentQuestion.spanish}» նշանակում է «${currentQuestion.armenian}»:`);
    } else {
      sound.playError();
      teacherSpeech(`Օ՜, ոչ: Դա սխալ է: Ճիշտ պատասխանն է` + ` «${currentQuestion.spanish}»` + `, որը նշանակում է «${currentQuestion.armenian}»:`);
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

  return (
    <div id="game-1-container" className="flex flex-col gap-6 relative z-10">
      {/* Title section */}
      <div className="flex justify-between items-center bg-[#0c1322]/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg text-white">
        <div>
          <span className="text-xs font-mono py-1 px-2 bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded-md font-semibold font-bold">Խաղ 1 / 6</span>
          <h2 className="text-xl font-bold text-white mt-1 select-none font-display">La Brújula de Posición <span className="text-slate-400 font-normal">| Տարածական Կողմնորոշում</span></h2>
        </div>
        <div className="flex gap-1">
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-7 h-2.5 rounded-full transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-emerald-500' 
                  : idx === currentIndex 
                    ? 'bg-orange-500 w-10 animate-pulse' 
                    : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch font-sans">
        {/* Left column: 3D Workspace */}
        <div className="md:col-span-6 flex flex-col justify-between">
          <ThreeDCanvas positionKey={currentQuestion.spanish as any} />
        </div>

        {/* Right column: Options / Selection */}
        <div className="md:col-span-6 flex flex-col justify-between bg-[#0c1322]/50 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-xl text-white">
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start gap-3">
              <div className="p-2 bg-white/5 text-indigo-400 rounded-lg border border-white/10">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider">Հարցում</p>
                <p className="text-sm font-semibold text-slate-100 leading-relaxed mt-1">Որտե՞ղ է կանաչ գնդակը տուփի նկատմամբ: {`(Հայերեն՝ «${currentQuestion.armenian}»)`}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              {options.map((opt, i) => {
                let btnStyle = "border-white/10 hover:border-indigo-500 hover:bg-white/10 text-slate-200 bg-white/5 shadow-sm";
                if (isAnswered) {
                  const isOptCorrect = opt === currentQuestion.spanish;
                  const isSelected = opt === selectedAnswer;
                  if (isOptCorrect) {
                    btnStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-300 shadow-md";
                  } else if (isSelected) {
                    btnStyle = "border-rose-500 bg-rose-500/15 text-rose-300 shadow-md";
                  } else {
                    btnStyle = "border-white/5 bg-white/5 text-slate-500 opacity-50";
                  }
                }

                return (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    disabled={isAnswered}
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={`w-full text-left font-mono font-medium text-sm md:text-base py-3 px-4 border rounded-xl flex items-center justify-between transition-all relative cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && opt === currentQuestion.spanish && <CheckCircle className="w-5 h-5 text-emerald-400 animate-pulse" />}
                    {isAnswered && opt === selectedAnswer && opt !== currentQuestion.spanish && <XCircle className="w-5 h-5 text-rose-400" />}
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
                  id="game-1-next"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                >
                  <span>Շարունակել</span>
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
