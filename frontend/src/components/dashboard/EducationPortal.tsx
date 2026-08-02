'use client';

import React, { useState, useEffect } from 'react';
import { GraduationCap, PlayCircle, BookOpen, CheckCircle, XCircle, Award, HelpCircle } from 'lucide-react';

interface EducationPortalProps {
  tutorials: any[];
  quizQuestions?: any[];
  activeLanguage: string;
}

export default function EducationPortal({ tutorials, quizQuestions, activeLanguage }: EducationPortalProps) {
  const [activeTab, setActiveTab] = useState<string>("tutorials");
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const labels: any = {
    en: {
      title: "Smart Krishi Academy",
      subtitle: "Audio-visual farming tutorials and interactive regional quizzes",
      tutorialsTab: "Regional Tutorials",
      quizTab: "Interactive Quiz",
      readSummary: "Lesson Summary",
      listenVoice: "Listen Audio Guide",
      quizScore: "Your Academy Score",
      questionLabel: "Question",
      nextBtn: "Next Question",
      restartBtn: "Try Again",
      finishBtn: "Finish Quiz",
      badgeTitle: "Award Granted"
    },
    hi: {
      title: "कृषि अकादमी",
      subtitle: "ऑडियो-विजुअल खेती पाठ और कृषि प्रश्नोत्तरी",
      tutorialsTab: "क्षेत्रीय पाठ",
      quizTab: "कृषि प्रश्नोत्तरी",
      readSummary: "पाठ का सारांश",
      listenVoice: "ऑडियो गाइड सुनें",
      quizScore: "आपका अकादमी स्कोर",
      questionLabel: "सवाल",
      nextBtn: "अगला सवाल",
      restartBtn: "फिर से प्रयास करें",
      finishBtn: "प्रश्नोत्तरी समाप्त करें",
      badgeTitle: "पुरस्कार प्रदान किया गया"
    },
    pa: {
      title: "ਸਮਾਰਟ ਕ੍ਰਿਸ਼ੀ ਅਕੈਡਮੀ",
      subtitle: "ਆਡੀਓ-ਵੀਡੀਓ ਖੇਤੀਬਾੜੀ ਪਾਠ ਅਤੇ ਇੰਟਰਐਕਟਿਵ ਕਵਿਜ਼",
      tutorialsTab: "ਖੇਤਰੀ ਟਿਊਟੋਰਿਅਲ",
      quizTab: "ਖੇਤੀਬਾੜੀ ਕਵਿਜ਼",
      readSummary: "ਪਾਠ ਦਾ ਸਾਰ",
      listenVoice: "ਆਡੀਓ ਗਾਈਡ ਸੁਣੋ",
      quizScore: "ਤੁਹਾਡਾ ਅਕੈਡਮੀ ਸਕੋਰ",
      questionLabel: "ਸਵਾਲ",
      nextBtn: "ਅਗਲਾ ਸਵਾਲ",
      restartBtn: "ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
      finishBtn: "ਕਵਿਜ਼ ਖਤਮ ਕਰੋ",
      badgeTitle: "ਅਵਾਰਡ ਪ੍ਰਦਾਨ ਕੀਤਾ ਗਿਆ"
    },
    mr: {
      title: "स्मार्ट कृषी अकॅडमी",
      subtitle: "ऑडिओ-व्हिज्युअल शेतीचे धडे आणि परस्पर प्रश्नमंजुषा",
      tutorialsTab: "प्रादेशिक धडे",
      quizTab: "कृषी प्रश्नमंजुषा",
      readSummary: "धड्याचा गोषवारा",
      listenVoice: "ऑडिओ मार्गदर्शक ऐका",
      quizScore: "तुमचा अकॅडमी स्कोअर",
      questionLabel: "प्रश्न",
      nextBtn: "पुढील प्रश्न",
      restartBtn: "पुन्हा प्रयत्न करा",
      finishBtn: "प्रश्नमंजुषा समाप्त करा",
      badgeTitle: "पुरस्कार प्राप्त"
    },
    te: {
      title: "స్మార్ట్ కృషి అకాడమీ",
      subtitle: "ఆడియో-విజువల్ వ్యవసాయ ట్యుటోరియల్స్ మరియు ఇంటరాక్టివ్ క్విజ్",
      tutorialsTab: "ప్రాంతీయ ట్యుటోరియల్స్",
      quizTab: "వ్యవసాయ క్విజ్",
      readSummary: "పాఠం సారాంశం",
      listenVoice: "ఆడియో గైడ్ వినండి",
      quizScore: "మీ అకాడమీ స్కోర్",
      questionLabel: "ప్రశ్న",
      nextBtn: "తదుపరి ప్రశ్న",
      restartBtn: "మళ్لى ప్రయత్నించండి",
      finishBtn: "క్విజ్ ముగించు",
      badgeTitle: "అవార్డు లభించింది"
    },
    ta: {
      title: "ஸ்மார்ட் கிருஷி அகாடமி",
      subtitle: "ஆடியோ-விஷுவல் விவசாய பயிற்சிகள் மற்றும் வினாடி வினா",
      tutorialsTab: "வட்டார பயிற்சிகள்",
      quizTab: "விவசாய வினாடி வினா",
      readSummary: "பாடத்தின் சுருக்கம்",
      listenVoice: "ஆடியோ வழிகாட்டியை கேளுங்கள்",
      quizScore: "உங்கள் அகாடமி மதிப்பெண்",
      questionLabel: "கேள்வி",
      nextBtn: "அடுத்த கேள்வி",
      restartBtn: "மீண்டும் முயற்சிக்கவும்",
      finishBtn: "முடிவு செய்",
      badgeTitle: "விருது வழங்கப்பட்டது"
    },
    kn: {
      title: "ಸ್ಮಾರ್ಟ್ ಕೃಷಿ ಅಕಾಡೆಮಿ",
      subtitle: "ಆಡಿಯೋ-ವಿಷಯಲ್ ಕೃಷಿ ಪಾಠಗಳು ಮತ್ತು ಸಂವಾದಾತ್ಮಕ ರಸಪ್ರಶ್ನೆ",
      tutorialsTab: "ಪ್ರಾದೇಶಿಕ ಟ್ಯುಟೋರಿಯಲ್ಸ್",
      quizTab: "ಕೃಷಿ ರಸಪ್ರಶ್ನೆ",
      readSummary: "ಪಾಠದ ಸಾರಾಂಶ",
      listenVoice: "ಆಡಿಯೋ ಮಾರ್ಗದರ್ಶಿ ಆಲಿಸಿ",
      quizScore: "ನಿಮ್ಮ ಅಕಾಡೆಮಿ ಸ್ಕೋರ್",
      questionLabel: "ಪ್ರಶ್ನೆ",
      nextBtn: "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
      restartBtn: "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ",
      finishBtn: "ರಸಪ್ರಶ್ನೆ ಮುಗಿಸಿ",
      badgeTitle: "ಪ್ರಶಸ್ತಿ ನೀಡಲಾಗಿದೆ"
    },
    gu: {
      title: "સ્માર્ટ કૃષિ એકેડેમી",
      subtitle: "ઓડિયો-વિઝ્યુઅલ ખેતી પાઠો અને કૃષિ પ્રશ્નોત્તરી",
      tutorialsTab: "પ્રાદેશિક પાઠો",
      quizTab: "કૃષિ પ્રશ્નોત્તરી",
      readSummary: "પાઠનો સારાંશ",
      listenVoice: "ઓડિયો ગાઇડ સાંભળો",
      quizScore: "તમારો એકેડેમી સ્કોર",
      questionLabel: "પ્રશ્ન",
      nextBtn: "આગલો પ્રશ્ન",
      restartBtn: "ફરીથી પ્રયાસ કરો",
      finishBtn: "ક્વિઝ સમાપ્ત કરો",
      badgeTitle: "પુરસ્કાર મળ્યો"
    },
    bn: {
      title: "স্মার্ট কৃষি একাডেমি",
      subtitle: "অডিও-ভিজ্যুয়াল কৃষি টিউটোরিয়াল এবং কুইজ",
      tutorialsTab: "আঞ্চলিক টিউটোরিয়াল",
      quizTab: "কৃষি কুইজ",
      readSummary: "পাঠের সারসংক্ষেপ",
      listenVoice: "অডিও গাইড শুনুন",
      quizScore: "আপনার একাডেমি স্কোর",
      questionLabel: "প্রশ্ন",
      nextBtn: "পরবর্তী প্রশ্ন",
      restartBtn: "আবার চেষ্টা করুন",
      finishBtn: "কুইজ শেষ করুন",
      badgeTitle: "পুরস্কার প্রদান করা হল"
    },
    ml: {
      title: "സ്മാർട്ട് കൃഷി അക്കാദമി",
      subtitle: "ഓഡിയോ-വിഷ്വൽ കാർഷിക പാഠങ്ങളും ക്വിസും",
      tutorialsTab: "പ്രാദേശിക പാഠങ്ങൾ",
      quizTab: "കാർഷിക ക്വിസ്",
      readSummary: "പാഠത്തിന്റെ ചുരുക്കം",
      listenVoice: "ഓഡിയോ ഗൈഡ് കേൾക്കുക",
      quizScore: "നിങ്ങളുടെ അക്കാദമി സ്കോർ",
      questionLabel: "ചോദ്യം",
      nextBtn: "അടുത്ത ചോദ്യം",
      restartBtn: "വീണ്ടും ശ്രമിക്കുക",
      finishBtn: "ക്വിസ് അവസാനിപ്പിക്കുക",
      badgeTitle: "അവാർഡ് നൽകി"
    },
    or: {
      title: "ସ୍ମାର୍ଟ କୃଷି ଏକାଡେମୀ",
      subtitle: "ଅଡିଓ-ଭିଜୁଆଲ୍ କୃଷି ଶିକ୍ଷା ଏବଂ ପ୍ରଶ୍ନୋତ୍ତରୀ",
      tutorialsTab: "ଆଞ୍ଚଳିକ ପାଠ୍ୟକ୍ରମ",
      quizTab: "କୃଷି ପ୍ରଶ୍ନୋତ୍ତରୀ",
      readSummary: "ପାଠ୍ୟ ସାରାଂଶ",
      listenVoice: "ଅଡିଓ ଗାଇଡ୍ ଶୁଣନ୍ତୁ",
      quizScore: "ଆପଣଙ୍କ ଏକାଡେମୀ ସ୍କୋର",
      questionLabel: "ପ୍ରଶ୍ନ",
      nextBtn: "ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ",
      restartBtn: "ପୁନର୍ବାର ଚେଷ୍ଟਾ କରନ୍ତୁ",
      finishBtn: "ପ୍ରଶ୍ନୋତ୍ତରୀ ସମାପ୍ତ କରନ୍ତୁ",
      badgeTitle: "ପୁରସ୍କାର ପ୍ରଦାନ କରାଗଲା"
    }
  };

  const t = labels[activeLanguage] || labels["en"];

  const DEFAULT_TUTORIALS = [
    {
      title: "How to treat yellow spots on Tomato leaves",
      summary: "Yellow spots suggest Early Blight (fungal). Keep soil moisture uniform, prune lower leaves for airflow, and apply Neem oil.",
      duration: "5 mins",
      quiz_id: "quiz_tomato"
    },
    {
      title: "Drip Irrigation & Soil Moisture Management",
      summary: "Drip irrigation saves water by delivering moisture directly to crop root zones. Set the dripper lines close to roots.",
      duration: "7 mins",
      quiz_id: "quiz_irrigation"
    }
  ];

  const DEFAULT_QUIZ_QUESTIONS = [
    {
      question: "What is the primary cause of Early Blight in tomatoes?",
      options: ["Fungus (Alternaria)", "Virus", "Lack of Nitrogen", "Excessive Watering"],
      answer: "Fungus (Alternaria)",
      explanation: "Early blight is caused by the fungus Alternaria solani, which thrives in warm, humid conditions."
    },
    {
      question: "Which organic spray helps control initial fungal leaf spots?",
      options: ["Neem Oil spray", "Salt water", "Sugar syrup", "Kerosene"],
      answer: "Neem Oil spray",
      explanation: "Neem oil contains active limonoids that inhibit fungal spores and deter insect pests naturally."
    },
    {
      question: "How much water can drip irrigation save compared to flood irrigation?",
      options: ["10-20%", "30-50%", "80-90%", "0%"],
      answer: "30-50%",
      explanation: "Drip irrigation delivers water directly to root zones, cutting down evaporation and runoff losses."
    }
  ];

  const activeTutorials = tutorials && tutorials.length > 0 ? tutorials : DEFAULT_TUTORIALS;
  const activeQuestions = quizQuestions && quizQuestions.length > 0 ? quizQuestions : DEFAULT_QUIZ_QUESTIONS;

  useEffect(() => {
    // Reset quiz when questions set changes
    setSelectedAnswer(null);
    setCurrentQuestionIndex(0);
    setQuizFinished(false);
    setQuizStarted(false);
    setScore(0);
  }, [quizQuestions]);

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === activeQuestions[currentQuestionIndex].answer) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < activeQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
    setQuizStarted(false);
  };

  return (
    <div className="glass-panel p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-indigo-950/10 via-black/40 to-transparent border border-white/10 rounded-3xl shadow-inner relative overflow-hidden select-none text-left">
      
      {/* Visual background elements */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

      <div>
        {/* Header Title */}
        <div className="flex justify-between items-start mb-5 border-b border-white/5 pb-3">
          <div>
            <h2 className="text-md font-extrabold flex items-center gap-2 text-white">
              <GraduationCap className="text-indigo-400 animate-pulse animate-blink-slow" size={18} />
              {t.title}
            </h2>
            <p className="text-[10px] text-indigo-300/80 font-medium mt-0.5">{t.subtitle}</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex bg-[#040605] p-1 rounded-xl border border-white/5 mb-5 text-xs font-bold text-indigo-400 font-mono">
          <button 
            onClick={() => setActiveTab("tutorials")}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${activeTab === 'tutorials' ? 'bg-indigo-650 text-white shadow-sm' : 'hover:bg-indigo-955/20 text-zinc-400'}`}
          >
            {t.tutorialsTab}
          </button>
          <button 
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 py-2 rounded-lg transition-all cursor-pointer ${activeTab === 'quiz' ? 'bg-indigo-650 text-white shadow-sm' : 'hover:bg-indigo-955/20 text-zinc-400'}`}
          >
            {t.quizTab}
          </button>
        </div>

        {/* regional tutorials tab */}
        {activeTab === "tutorials" && (
          <div className="space-y-4">
            {activeTutorials.map((item, i) => (
              <div 
                key={i} 
                className="bg-[#050806] border border-white/5 p-4 rounded-2xl relative overflow-hidden hover:border-indigo-500/20 transition-all duration-300 shadow-sm"
              >
                {/* Slanted decoration bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-indigo-500/50" />
                
                <div className="flex justify-between items-start gap-2 mb-2 pl-1">
                  <h4 className="text-xs font-extrabold text-white leading-snug">
                    {item.title}
                  </h4>
                  <span className="text-[9px] font-bold font-mono text-indigo-400 bg-indigo-950/40 border border-indigo-500/20 px-1.5 py-0.5 rounded-md shrink-0">
                    {item.duration}
                  </span>
                </div>

                <p className="text-[10.5px] text-zinc-450 leading-relaxed pl-1 mb-3">
                  {item.summary}
                </p>

                <div className="flex gap-2 pl-1">
                  <button className="flex items-center gap-1.5 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 hover:text-indigo-200 border border-indigo-500/20 rounded-xl px-3 py-1.5 text-[9.5px] font-bold font-mono transition-all cursor-pointer">
                    <BookOpen size={11} />
                    <span>{t.readSummary}</span>
                  </button>
                  <button className="flex items-center gap-1.5 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-300 hover:text-indigo-200 border border-indigo-500/20 rounded-xl px-3 py-1.5 text-[9.5px] font-bold font-mono transition-all cursor-pointer">
                    <PlayCircle size={11} className="animate-pulse" />
                    <span>{t.listenVoice}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* interactive quiz tab */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            
            {!quizStarted && !quizFinished && (
              <div className="bg-[#050806] border border-white/5 p-5 rounded-2xl text-center space-y-4">
                <HelpCircle className="text-indigo-400 mx-auto animate-pulse" size={32} />
                <div className="space-y-1.5">
                  <h4 className="text-xs font-extrabold text-white">Dynamic Crop Knowledge check</h4>
                  <p className="text-[10px] text-zinc-450 leading-normal max-w-xs mx-auto">
                    Take a 3-question adaptive quiz generated on-the-fly from the current crop diagnostics report.
                  </p>
                </div>
                <button 
                  onClick={() => setQuizStarted(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer shadow-md"
                >
                  Start Academy Quiz
                </button>
              </div>
            )}

            {quizStarted && !quizFinished && (
              <div className="bg-[#050806] border border-white/5 p-5 rounded-2xl space-y-4 relative overflow-hidden">
                {/* Cyber corner */}
                <div className="absolute top-0 right-0 w-3 h-3 bg-indigo-500/20 rounded-bl-lg pointer-events-none" />

                <div className="flex justify-between items-center text-[9px] font-mono font-bold text-indigo-400">
                  <span>{t.questionLabel.toUpperCase()} {currentQuestionIndex + 1} / {activeQuestions.length}</span>
                  <span>SCORE: {score}</span>
                </div>

                <h4 className="text-xs font-extrabold text-white leading-normal">
                  {activeQuestions[currentQuestionIndex].question}
                </h4>

                <div className="space-y-2">
                  {activeQuestions[currentQuestionIndex].options.map((option: string) => {
                    const isSelected = selectedAnswer === option;
                    const isCorrect = option === activeQuestions[currentQuestionIndex].answer;
                    
                    let btnClass = "bg-[#0a0f0c] border-white/5 hover:border-indigo-500/20 text-zinc-300";
                    if (selectedAnswer) {
                      if (isCorrect) {
                        btnClass = "bg-emerald-950/40 border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.1)]";
                      } else if (isSelected) {
                        btnClass = "bg-red-950/40 border-red-500/30 text-red-400";
                      } else {
                        btnClass = "bg-[#070b09] border-white/5 text-zinc-600 opacity-50";
                      }
                    }

                    return (
                      <button
                        key={option}
                        disabled={selectedAnswer !== null}
                        onClick={() => handleAnswerClick(option)}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-bold leading-normal transition-all flex items-center justify-between cursor-pointer ${btnClass}`}
                      >
                        <span>{option}</span>
                        {selectedAnswer && isCorrect && <CheckCircle size={12} className="text-emerald-400 shrink-0" />}
                        {selectedAnswer && isSelected && !isCorrect && <XCircle size={12} className="text-red-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer && (
                  <div className="bg-indigo-950/10 border border-indigo-500/10 p-3 rounded-xl space-y-1 animate-fade-in">
                    <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest block">[EXPLANATION]</span>
                    <p className="text-[10px] text-zinc-350 leading-relaxed">
                      {activeQuestions[currentQuestionIndex].explanation}
                    </p>
                  </div>
                )}

                {selectedAnswer && (
                  <button
                    onClick={handleNextQuestion}
                    className="w-full bg-indigo-650 hover:bg-indigo-750 text-white font-bold py-2 rounded-xl text-xs font-mono transition-all cursor-pointer border border-indigo-500/30 text-center"
                  >
                    {currentQuestionIndex + 1 === activeQuestions.length ? t.finishBtn : t.nextBtn}
                  </button>
                )}
              </div>
            )}

            {quizFinished && (
              <div className="bg-[#050806] border border-white/5 p-6 rounded-2xl text-center space-y-4">
                <Award className="text-yellow-500 mx-auto animate-bounce" size={36} />
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-white">{t.quizScore}</h4>
                  <span className="text-3xl font-black text-white block font-mono">{score} / {activeQuestions.length * 10}</span>
                </div>

                {score >= 20 && (
                  <div className="bg-emerald-950/20 border border-emerald-500/10 p-2.5 rounded-xl max-w-xs mx-auto text-[9.5px] text-emerald-400 leading-normal flex items-center gap-2">
                    <Award size={16} className="shrink-0" />
                    <span><strong>{t.badgeTitle}</strong>: Smart Agri Apprentice Certificate unlocked!</span>
                  </div>
                )}

                <button
                  onClick={resetQuiz}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer"
                >
                  {t.restartBtn}
                </button>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
}
