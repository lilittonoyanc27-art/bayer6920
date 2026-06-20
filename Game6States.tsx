import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { VOCABULARY, VocabularyItem } from './vocabulary';
import { sound } from './sound';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, Heart, Smile } from 'lucide-react';

interface Game6StatesProps {
  onGameComplete: (score: number) => void;
  teacherSpeech: (text: string) => void;
}

interface StateChallenge {
  id: string;
  contextSentence: string;
  armenianHelper: string; // Armenian helper state text
  correctOption: string;
  options: string[];
  vocabularyItem: VocabularyItem;
}

export default function Game6States({ onGameComplete, teacherSpeech }: Game6StatesProps) {
  const [challenges] = useState<StateChallenge[]>(() => {
    const itemEnamorado = VOCABULARY.find(v => v.spanish === "estar enamorado de")!;
    const itemEnParo = VOCABULARY.find(v => v.spanish === "estar en paro")!;
    const itemBuenHumor = VOCABULARY.find(v => v.spanish === "estar de buen humor")!;
    const itemListoPara = VOCABULARY.find(v => v.spanish === "estar listo para")!;
    const itemDeCompras = VOCABULARY.find(v => v.spanish === "estar de compras")!;

    const pool: StateChallenge[] = [
      {
        id: "sc1",
        contextSentence: "María sonríe mucho porque ella ______ Carlos.",
        armenianHelper: "Մարիան շատ է ժպտում, որովհետև նա սիրահարված է Կառլոսին։",
        correctOption: "está enamorada de",
        options: ["está enamorada de", "está en paro de", "está de buen humor con", "está lista para"],
        vocabularyItem: itemEnamorado
      },
      {
        id: "sc2",
        contextSentence: "Ellos no tienen trabajo por ahora, ______ .",
        armenianHelper: "Նրանք այս պահին աշխատանք չունեն, նրանք գործազուրկ են ։",
        correctOption: "están en paro",
        options: ["están en paro", "están de Erasmus", "están de compras", "están de paso"],
        vocabularyItem: itemEnParo
      },
      {
        id: "sc3",
        contextSentence: "Hoy canto y bailo porque ______ .",
        armenianHelper: "Այսօր ես երգում ու պարում եմ, որովհետև լավ տրամադրություն ունեմ ։",
        correctOption: "estoy de buen humor",
        options: ["estoy de buen humor", "estoy de mal humor", "estoy de paso", "estoy acostumbrado a"],
        vocabularyItem: itemBuenHumor
      },
      {
        id: "sc4",
        contextSentence: "Nosotros tenemos las maletas hechas, ______ viajar.",
        armenianHelper: "Մեր ճամպրուկները պատրաստ են, մենք պատրաստ ենք ճանապարհորդելու։",
        correctOption: "estamos listos para",
        options: ["estamos listos para", "estamos de compras en", "estamos de paso por", "estamos acostumbrados a"],
        vocabularyItem: itemListoPara
      },
      {
        id: "sc5",
        contextSentence: "Ella va al centro comercial porque ______ .",
        armenianHelper: "Նա գնում է առևտրի կենտրոն, որովհետև գնումներ անելիս է ։",
        correctOption: "está de compras",
        options: ["está de compras", "está en paro", "está de paso", "está de Erasmus"],
        vocabularyItem: itemDeCompras
      }
    ];

    return pool.sort(() => 0.5 - Math.random()).slice(0, 3);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentChallenge = challenges[currentIndex];

  React.useEffect(() => {
    if (!currentChallenge) return;

    teacherSpeech(`Սա վերջին փուլն է՝ մարդկային հոգեվիճակների և կարգավիճակների նախդիրները։ Ընտրի՛ր ճիշտ տարբերակը։`);

    setSelectedOption(null);
    setIsAnswered(false);
  }, [currentIndex, currentChallenge]);

  const handleAnswer = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const right = opt === currentChallenge.correctOption;
    setIsCorrect(right);

    if (right) {
      setScore(prev => prev + 1);
      sound.playCorrect();
      teacherSpeech(`Հրաշալի պատասխան: Հոգեվիճակն արտահայտված է կատարյալ կերպով`);
    } else {
      sound.playError();
      teacherSpeech(`Ցավոք սխալ է: Ճիշտ ձևն էր «${currentChallenge.correctOption}»։`);
    }
  };

  const handleNext = () => {
    sound.playSlide();
    if (currentIndex < challenges.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onGameComplete(score);
    }
  };

  if (!currentChallenge) return null;

  return (
    <div id="game-6-container" className="flex flex-col gap-6 relative z-10 font-sans">
      {/* Quiz Progress Header */}
      <div className="flex justify-between items-center bg-[#0c1322]/60 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 shadow-lg text-white">
        <div>
          <span className="text-xs font-mono py-1 px-2 bg-rose-500/15 text-rose-400 border border-rose-500/20 rounded-md font-semibold font-bold">Խաղ 6 / 6 (Վերջին Փուլ)</span>
          <h2 className="text-xl font-bold text-white mt-1 select-none font-display">El Desafío de los Estados <span className="text-slate-400 font-normal">| Հոգեվիճակների Մարտահրավեր</span></h2>
        </div>
        <div className="flex gap-1">
          {challenges.map((_, idx) => (
            <div 
              key={idx} 
              className={`w-7 h-2.5 rounded-full transition-all duration-300 ${
                idx < currentIndex 
                  ? 'bg-rose-500' 
                  : idx === currentIndex 
                    ? 'bg-red-500 w-10 animate-pulse' 
                    : 'bg-white/10'
              }`} 
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: 3D rotating flippable state card */}
        <div className="md:col-span-5 flex flex-col justify-center items-center bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl p-6 relative border border-white/10 overflow-hidden min-h-[300px]">
          <div className="absolute inset-0 bg-grid-white/[0.1] z-0" />
          
          <motion.div 
            style={{ perspective: 1000 }}
            className="w-44 h-56 rounded-2xl bg-slate-900/40 shadow-2xl border border-white/15 flex flex-col items-center justify-between p-5 relative z-10 text-center"
            animate={{ rotateY: isAnswered ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
          >
            {/* Card Front face / Back face rendering depending on twist */}
            {!isAnswered ? (
              <div className="flex-1 flex flex-col justify-between items-center h-full">
                <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">Estado Actual</span>
                <Heart className="w-12 h-12 text-rose-500 animate-pulse my-4" />
                <p className="text-xs font-serif text-slate-200 leading-normal line-clamp-4">
                  {currentChallenge.contextSentence}
                </p>
                <span className="text-[10px] font-mono text-rose-400 font-bold">ESTAR + PREP</span>
              </div>
            ) : (
              <div 
                className="flex-1 flex flex-col justify-between items-center h-full"
                style={{ transform: 'rotateY(180deg)' }}
              >
                <span className="text-[9px] font-mono tracking-widest text-emerald-400 font-bold uppercase">Resultado</span>
                <Smile className="w-12 h-12 text-emerald-400 my-4" />
                <p className="text-xs font-bold text-slate-250 leading-normal">
                  {isCorrect ? "✨ ՃԻՇՏ Է!" : "❌ ՍԽԱԼ Է!"}
                </p>
                <span className="text-[10px] text-slate-400 font-mono italic">
                  {currentChallenge.correctOption}
                </span>
              </div>
            )}
          </motion.div>

          <div className="text-center mt-6 z-10">
            <span className="px-3 py-1 bg-white/5 backdrop-blur rounded-full text-white text-[10px] font-mono border border-white/10 uppercase">
              Desafío Final
            </span>
          </div>
        </div>

        {/* Right Column: Challenge detail and Options */}
        <div className="md:col-span-7 flex flex-col justify-between bg-[#0c1322]/50 backdrop-blur-xl rounded-3xl border border-white/10 p-6 shadow-xl text-white">
          <div className="flex flex-col gap-4">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-widest block mb-1">Իրավիճակ</span>
              <p className="text-sm font-bold text-slate-100 leading-relaxed mb-2">
                {currentChallenge.contextSentence.split('______')[0]}
                <span className="text-rose-400 font-mono underline underline-offset-4 decoration-wavy px-1">______</span>
                {currentChallenge.contextSentence.split('______')[1]}
              </p>
              <div className="text-xs text-slate-300 border-t border-white/10 pt-2.5 mt-2 flex gap-1.5 items-start">
                <span>🇦🇲</span>
                <p>{currentChallenge.armenianHelper}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              {currentChallenge.options.map((opt) => {
                let btnStyle = "border-white/10 bg-white/5 hover:border-rose-400 text-slate-200 cursor-pointer";
                if (isAnswered) {
                  if (opt === currentChallenge.correctOption) {
                    btnStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-300 pointer-events-none shadow-lg";
                  } else if (opt === selectedOption) {
                    btnStyle = "border-rose-500 bg-rose-500/15 text-rose-300 pointer-events-none shadow-lg";
                  } else {
                    btnStyle = "border-white/5 bg-white/5 opacity-40 pointer-events-none text-slate-500";
                  }
                }

                return (
                  <motion.button
                    disabled={isAnswered}
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className={`py-3 px-4 font-mono font-semibold text-sm text-left rounded-xl border transition-all cursor-pointer ${btnStyle}`}
                    whileHover={!isAnswered ? { scale: 1.02 } : {}}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
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
                  {currentChallenge.vocabularyItem.explanation}
                </div>

                <button
                  id="game-6-next"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer text-sm"
                >
                  <span>Ավարտել Քննությունը</span>
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
