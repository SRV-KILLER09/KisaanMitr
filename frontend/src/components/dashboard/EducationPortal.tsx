'use client';

import React, { useState } from 'react';
import { GraduationCap, PlayCircle, BookOpen, CheckCircle, XCircle, Award } from 'lucide-react';

interface EducationPortalProps {
  tutorials: any[];
  activeLanguage: string;
}

export default function EducationPortal({ tutorials, activeLanguage }: EducationPortalProps) {
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
      restartBtn: "మళ్లీ ప్రయత్నించండి",
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
      subtitle: "ಆಡಿಯೋ-ವಿಷುಯಲ್ ಕೃಷಿ ಪಾಠಗಳು ಮತ್ತು ಸಂವಾದಾತ್ಮक ರಸಪ್ರಶ್ನೆ",
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
      quizScore: "আপনার একাডেमी স্কোর",
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
      restartBtn: "ପୁନର୍ବାର ଚେଷ୍ଟା କରନ୍ତୁ",
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

  const QUIZ_QUESTIONS = [
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

  const handleAnswerClick = (option: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === QUIZ_QUESTIONS[currentQuestionIndex].answer) {
      setScore(score + 10);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex + 1 < QUIZ_QUESTIONS.length) {
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
    <div className="glass-panel p-6 flex flex-col justify-between h-full bg-gradient-to-tr from-indigo-950/15 via-black/40 to-transparent border border-white/10">
      <div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <GraduationCap className="text-indigo-400 animate-pulse" size={20} />
              {t.title}
            </h2>
            <p className="text-xs text-indigo-300/80">{t.subtitle}</p>
          </div>
        </div>

        {/* Tab Row */}
        <div className="flex bg-[#040605] p-1 rounded-lg border border-white/5 mb-4 text-xs font-bold text-indigo-400 font-mono">
          <button 
            onClick={() => setActiveTab("tutorials")}
            className={`flex-1 py-1.5 rounded transition-all ${activeTab === 'tutorials' ? 'bg-indigo-650 text-white shadow-sm' : 'hover:bg-indigo-955/20 text-zinc-400'}`}
          >
            {t.tutorialsTab}
          </button>
          <button 
            onClick={() => setActiveTab("quiz")}
            className={`flex-1 py-1.5 rounded transition-all ${activeTab === 'quiz' ? 'bg-indigo-650 text-white shadow-sm' : 'hover:bg-indigo-955/20 text-zinc-400'}`}
          >
            {t.quizTab}
          </button>
        </div>

        {/* Tutorials tab content */}
        {activeTab === "tutorials" && (
          <div className="space-y-4">
            {activeTutorials.map((tut, i) => (
              <div key={i} className="bg-[#040605] border border-white/5 rounded-lg p-3 space-y-2 font-mono">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <BookOpen size={12} className="text-indigo-400" />
                    {tut.title}
                  </h4>
                  <span className="text-[9px] bg-indigo-950/40 text-indigo-300 border border-white/5 font-bold px-1.5 py-0.5 rounded-full shrink-0">
                    {tut.duration}
                  </span>
                </div>
                
                <p className="text-[11px] leading-relaxed text-zinc-350 font-semibold font-sans">
                  {tut.summary}
                </p>

                <div className="flex gap-2 pt-1 border-t border-white/5">
                  <button 
                    onClick={() => {
                      const synth = window.speechSynthesis;
                      const utter = new SpeechSynthesisUtterance(tut.summary);
                      utter.lang = activeLanguage === "hi" ? "hi-IN" : activeLanguage === "pa" ? "pa-IN" : "en-US";
                      synth.speak(utter);
                    }}
                    className="flex-1 bg-indigo-950/40 hover:bg-indigo-900/60 text-indigo-400 font-bold py-1.5 rounded text-[10px] border border-white/5 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <PlayCircle size={12} />
                    {t.listenVoice}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive Quiz tab content */}
        {activeTab === "quiz" && (
          <div className="space-y-4">
            
            {!quizStarted && !quizFinished && (
              <div className="bg-[#040605] border border-white/5 rounded-lg p-6 text-center space-y-4">
                <Award size={48} className="text-yellow-500 mx-auto animate-pulse" />
                <div>
                  <h4 className="font-bold text-white text-sm">Test Your Agriculture Knowledge</h4>
                  <p className="text-xs text-indigo-400 mt-1">Earn points, unlock rewards badges, and test your regional farming skills.</p>
                </div>
                <button
                  onClick={() => setQuizStarted(true)}
                  className="bg-indigo-650 hover:bg-indigo-750 text-white font-bold py-2 px-6 rounded-lg text-xs transition-colors shadow-sm border border-indigo-500 font-mono"
                >
                  Start Farming Quiz
                </button>
              </div>
            )}

            {quizStarted && !quizFinished && (
              <div className="bg-[#040605] border border-white/5 rounded-lg p-4 space-y-4 font-mono">
                <div className="flex justify-between items-center text-[10px] text-indigo-400 font-bold border-b border-white/5 pb-2">
                  <span>{t.questionLabel} {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</span>
                  <span className="text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded-full border border-white/10">{score} Pts</span>
                </div>

                <p className="text-xs font-bold text-white">
                  {QUIZ_QUESTIONS[currentQuestionIndex].question}
                </p>

                <div className="flex flex-col gap-2">
                  {QUIZ_QUESTIONS[currentQuestionIndex].options.map((opt) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = opt === QUIZ_QUESTIONS[currentQuestionIndex].answer;
                    
                    return (
                      <button
                        key={opt}
                        onClick={() => handleAnswerClick(opt)}
                        disabled={!!selectedAnswer}
                        className={`text-left p-3 rounded-lg text-xs font-semibold transition-all border flex justify-between items-center ${
                          selectedAnswer 
                            ? isCorrect
                              ? 'bg-emerald-600 text-white border-emerald-555'
                              : isSelected
                                ? 'bg-red-650 text-white border-red-555'
                                : 'bg-zinc-950 text-zinc-600 border-zinc-900'
                            : 'bg-black hover:bg-indigo-950/20 text-indigo-300 border-white/5'
                        }`}
                      >
                        <span>{opt}</span>
                        {selectedAnswer && isCorrect && <CheckCircle size={14} className="text-white" />}
                        {selectedAnswer && isSelected && !isCorrect && <XCircle size={14} className="text-white" />}
                      </button>
                    );
                  })}
                </div>

                {selectedAnswer && (
                  <div className="bg-black border border-white/5 rounded p-2.5 space-y-1">
                    <span className="text-[10px] font-bold text-indigo-400 block uppercase">explanation</span>
                    <p className="text-[11px] text-zinc-350 font-semibold leading-relaxed font-sans">
                      {QUIZ_QUESTIONS[currentQuestionIndex].explanation}
                    </p>
                    <button
                      onClick={handleNextQuestion}
                      className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-1.5 rounded text-[10px] transition-colors"
                    >
                      {currentQuestionIndex + 1 < QUIZ_QUESTIONS.length ? t.nextBtn : t.finishBtn}
                    </button>
                  </div>
                )}

              </div>
            )}

            {quizFinished && (
              <div className="bg-[#040605] border border-white/5 rounded-lg p-6 text-center space-y-4">
                <Award size={48} className="text-yellow-500 mx-auto animate-pulse" />
                <div>
                  <h4 className="font-bold text-white text-sm">Quiz Finished!</h4>
                  <p className="text-xs text-indigo-400 mt-1">Total score accumulated: <strong>{score} out of 30 points</strong>.</p>
                </div>

                {score >= 20 && (
                  <div className="inline-flex items-center gap-1.5 bg-indigo-950/40 text-indigo-300 font-bold px-3 py-1 rounded-full text-[10px] border border-white/5 font-mono">
                    <Award size={12} />
                    {t.badgeTitle}: Krishi Master Badge 🏅
                  </div>
                )}

                <button
                  onClick={resetQuiz}
                  className="w-full bg-indigo-650 hover:bg-indigo-750 text-white font-bold py-2 rounded-lg text-xs transition-colors shadow-sm font-mono"
                >
                  {t.restartBtn}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
      <div className="mt-4 flex items-center gap-2 bg-[#040605] border border-white/5 p-2.5 rounded-lg text-[10px] text-indigo-400 font-semibold font-mono">
        <Award size={14} className="text-yellow-500 shrink-0 animate-pulse" />
        <span className="font-sans">Completed lesson summaries unlock certificates endorsed by regional Krishi Vigyan Kendras (KVK).</span>
      </div>
    </div>
  );
}
