'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Sprout, 
  ArrowLeft, 
  MessageSquare, 
  Send, 
  Globe, 
  Activity, 
  TrendingUp, 
  Lock,
  LogIn
} from 'lucide-react';
import Preloader from '@/components/ui/Preloader';

interface ChatMessage {
  id: number;
  author: string;
  location: string;
  tag: string;
  content: string;
  timestamp: string;
}

export default function CommunityPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [userSession, setUserSession] = useState<string | null>(null);
  const [activeLanguage, setActiveLanguage] = useState<string>("en");

  const LANGUAGES = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिंदी (Hindi)" },
    { code: "pa", label: "ਪੰਜਾਬੀ (Punjabi)" },
    { code: "mr", label: "मराठी (Marathi)" },
    { code: "te", label: "తెలుగు (Telugu)" },
    { code: "ta", label: "தமிழ் (Tamil)" },
    { code: "kn", label: "ಕನ್ನಡ (Kannada)" },
    { code: "gu", label: "ગુજરાતી (Gujarati)" },
    { code: "bn", label: "বাংলা (Bengali)" },
    { code: "ml", label: "മലയാളം (Malayalam)" },
    { code: "or", label: "ଓଡ଼ିଆ (Odia)" }
  ];

  // 11-Language localization mapping for Community Chat
  const localization: any = {
    en: {
      tagline: "Public Farmer Community Chat",
      title: "Farmer Community Chat Board",
      desc: "Post query updates and share active farm tips with registered agricultural nodes across India.",
      placeholder: "Post crop updates as node: ",
      placeholderVisitor: "🔒 Please login to participate in the community chat...",
      loginBtn: "Login / Sign Up",
      backBtn: "Dashboard",
      homeBtn: "Portal Home",
      npkTitle: "National Crop Soil Score",
      npkDesc: "Aggregated telemetry averages streamed from 1,200 active farmer nodes. Current calibration:",
      outbreakTitle: "Active Pathology Outbreaks",
      outbreakDesc: "Recent pathogen leaf scan alerts logged across state clusters:",
      mspTitle: "MSP Price Indices",
      mspDesc: "Minimum Support Prices (MSP) established by Govt of India:",
      emptyChats: "No active messages on the public board. Be the first to start a discussion!"
    },
    hi: {
      tagline: "सार्वजनिक किसान सामुदायिक चैट",
      title: "किसान सामुदायिक चैट बोर्ड",
      desc: "पूरे भारत में पंजीकृत कृषि नोड्स के साथ सक्रिय कृषि युक्तियों को साझा करें और प्रश्न पोस्ट करें।",
      placeholder: "नोड के रूप में पोस्ट करें: ",
      placeholderVisitor: "🔒 सामुदायिक चैट में भाग लेने के लिए कृपया लॉगिन करें...",
      loginBtn: "लॉगिन / साइन अप",
      backBtn: "डैशबोर्ड",
      homeBtn: "पोर्टल होम",
      npkTitle: "राष्ट्रीय फसल मिट्टी स्कोर",
      npkDesc: "1,200 सक्रिय किसान नोड्स से स्ट्रीम किए गए एकीकृत टेलीमेट्री औसत।",
      outbreakTitle: "सक्रिय रोग आउटब्रेक",
      outbreakDesc: "राज्य समूहों में लॉग किए गए हालिया पत्ती रोग स्कैन अलर्ट:",
      mspTitle: "एमएसपी मूल्य सूचकांक",
      mspDesc: "भारत सरकार द्वारा स्थापित न्यूनतम समर्थन मूल्य (MSP):",
      emptyChats: "सार्वजनिक बोर्ड पर कोई सक्रिय संदेश नहीं है। चर्चा शुरू करने वाले पहले व्यक्ति बनें!"
    },
    pa: {
      tagline: "ਪਬਲਿਕ ਕਿਸਾਨ ਭਾਈਚਾਰਕ ਚੈਟ",
      title: "ਕਿਸਾਨ ਭਾਈਚਾਰਕ ਚੈਟ ਬੋਰਡ",
      desc: "ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਰਜਿਸਟਰਡ ਖੇਤੀਬਾੜੀ ਨੋਡਾਂ ਨਾਲ ਸਰਗਰਮ ਖੇਤੀ ਸੁਝਾਅ ਸਾਂਝੇ ਕਰੋ।",
      placeholder: "ਨੋਡ ਵਜੋਂ ਪੋਸਟ ਕਰੋ: ",
      placeholderVisitor: "🔒 ਚੈਟ ਵਿੱਚ ਹਿੱਸਾ ਲੈਣ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਲੌਗਇਨ ਕਰੋ...",
      loginBtn: "ਲੌਗਇਨ / ਸਾਈਨ ਅੱਪ",
      backBtn: "ਡੈਸ਼ਬੋਰਡ",
      homeBtn: "ਪੋਰਟਲ ਹੋਮ",
      npkTitle: "ਰਾਸ਼ਟਰੀ ਫਸਲ ਮਿੱਟੀ ਸਕੋਰ",
      npkDesc: "1,200 ਸਰਗਰਮ ਕਿਸਾਨ ਨੋਡਾਂ ਤੋਂ ਸਟ੍ਰੀਮ ਕੀਤੇ ਔਸਤ ਟੈਲੀਮੈਟਰੀ ਅੰਕੜੇ।",
      outbreakTitle: "ਸਰਗਰਮ ਰੋਗ ਆਊਟਬ੍ਰੇਕ",
      outbreakDesc: "ਰਾਜ ਸਮੂਹਾਂ ਵਿੱਚ ਹਾਲ ਹੀ ਵਿੱਚ ਲੌਗ ਕੀਤੇ ਪੱਤੇ ਦੇ ਸਕੈਨ ਅਲਰਟ:",
      mspTitle: "MSP ਕੀਮਤ ਸੂਚਕਾਂਕ",
      mspDesc: "ਭਾਰਤ ਸਰਕਾਰ ਦੁਆਰਾ ਸਥਾਪਿਤ ਘੱਟੋ-ਘੱਟ ਸਮਰਥਨ ਮੁੱਲ (MSP):",
      emptyChats: "ਪਬਲਿਕ ਬੋਰਡ 'ਤੇ ਕੋਈ ਸਰਗਰਮ ਸੁਨੇਹਾ ਨਹੀਂ ਹੈ। ਪਹਿਲਾਂ ਸੁਨੇਹਾ ਪੋਸਟ ਕਰੋ!"
    },
    mr: {
      tagline: "सार्वजनिक शेतकरी समुदाय चॅट",
      title: "शेतकरी समुदाय चॅट बोर्ड",
      desc: "नोंदणीकृत कृषी नोड्ससह पिकांची माहिती आणि शेती सल्ला सामायिक करा.",
      placeholder: "नोड म्हणून पोस्ट करा: ",
      placeholderVisitor: "🔒 चॅटमध्ये सहभागी होण्यासाठी कृपया लॉगिन करा...",
      loginBtn: "लॉगिन / साइन अप",
      backBtn: "डॅशबोर्ड",
      homeBtn: "पोर्टल होम",
      npkTitle: "राष्ट्रीय पीक माती निर्देशांक",
      npkDesc: "१,२०० नोड्सवरून गोळा केलेली सरासरी माती टेलीमेट्री आकडेवारी.",
      outbreakTitle: "सक्रिय पीक रोग चेतावणी",
      outbreakDesc: "विविध राज्यांतून प्राप्त झालेले पानावरील रोगांचे स्कॅन अहवाल:",
      mspTitle: "एमएसपी किंमत दर",
      mspDesc: "भारत सरकारद्वारे जाहीर केलेले किमान आधारभूत मूल्य (MSP):",
      emptyChats: "चॅट बोर्डवर सध्या संदेश नाहीत. चर्चेत सहभाग घेणारे पहिले व्हा!"
    },
    te: {
      tagline: "పబ్లిక్ రైతు కమ్యూనిటీ చాట్",
      title: "రైతు కమ్యూనిటీ చాట్ బోర్డు",
      desc: "భారతదేశవ్యాప్తంగా నమోదైన వ్యవసాయ నోడ్స్‌తో సలహాలు మరియు సమాచారాన్ని పంచుకోండి.",
      placeholder: "నోడ్ పేరుతో పోస్ట్ చేయండి: ",
      placeholderVisitor: "🔒 చాట్‌లో పాల్గొనడానికి దయచేసి లాగిన్ అవ్వండి...",
      loginBtn: "లాగిన్ / సైన్ అప్",
      backBtn: "డాష్‌బోర్డ్",
      homeBtn: "పోర్టల్ హోమ్",
      npkTitle: "జాతీయ పంటల నేల స్కోర్",
      npkDesc: "1,200 క్రియాశీల నోడ్స్ నుండి సేకరించిన టెలిమెట్రీ సగటులు.",
      outbreakTitle: "సక్రియ వ్యాధి హెచ్చరికలు",
      outbreakDesc: "వివిధ ప్రాంతాలలో నమోదైన పంట తెగుళ్ల సమాచారం:",
      mspTitle: "MSP కనీస మద్దతు ధరలు",
      mspDesc: "భారత ప్రభుత్వం నిర్ణయించిన కనీస మద్దతు ధరలు (MSP):",
      emptyChats: "చాట్ బోర్డులో ఎలాంటి సందేశాలు లేవు. మొదటి సందేశాన్ని పోస్ట్ చేయండి!"
    },
    ta: {
      tagline: "பொது விவசாயி சமூக அரட்டை",
      title: "விவசாயி சமூக அரட்டை பலகை",
      desc: "இந்தியாவின் பதிவுசெய்யப்பட்ட விவசாய முனையங்களுடன் ஆலோசனைகள் மற்றும் செய்திகளைப் பகிர்க.",
      placeholder: "முனையமாக பதிவிடவும்: ",
      placeholderVisitor: "🔒 அரட்டையில் பங்கேற்க தயவுசெய்து உள்நுழையவும்...",
      loginBtn: "உள்நுழைவு / பதிவு",
      backBtn: "டாஷ்போர்டு",
      homeBtn: "முகப்பு பக்கம்",
      npkTitle: "தேசிய மண் ஆரோக்கிய குறியீடு",
      npkDesc: "1,200 செயலில் உள்ள முனையங்களிலிருந்து பெறப்பட்ட சராசரி அளவீடுகள்.",
      outbreakTitle: "செயலில் உள்ள நோய் பாதிப்புகள்",
      outbreakDesc: "சமீபத்தில் பதிவான இலை நோய் பாதிப்பு விவரங்கள்:",
      mspTitle: "MSP குறைந்தபட்ச ஆதரவு விலை",
      mspDesc: "இந்திய அரசு நிர்ணயித்த குறைந்தபட்ச ஆதரவு விலைகள் (MSP):",
      emptyChats: "அரட்டை பலகையில் செய்திகள் இல்லை. முதல் நபராக பதிவிடவும்!"
    },
    kn: {
      tagline: "ಸಾರ್ವಜನಿಕ ರೈತ ಸಮುದಾಯ ಚರ್ಚೆ",
      title: "ರೈತ ಸಮುದಾಯ ಚರ್ಚಾ ವೇದಿಕೆ",
      desc: "ನೋಂದಾಯಿತ ಕೃಷಿ ನೋಡ್‌ಗಳೊಂದಿಗೆ ಅಗತ್ಯ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ವಿನಿಮಯ ಮಾಡಿಕೊಳ್ಳಿ.",
      placeholder: "ನೋಡ್ ಆಗಿ ಸಂದೇಶ ಬರೆಯಿರಿ: ",
      placeholderVisitor: "🔒 ಚರ್ಚೆಯಲ್ಲಿ ಪಾಲ್ಗೊಳ್ಳಲು ದಯವಿಟ್ಟು ಲಾಗಿನ್ ಮಾಡಿ...",
      loginBtn: "ಲಾಗಿನ್ / ಸೈನ್ ಅಪ್",
      backBtn: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      homeBtn: "ಮುಖಪುಟ",
      npkTitle: "ರಾಷ್ಟ್ರೀಯ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ",
      npkDesc: "1,200 ಸಕ್ರಿಯ ನೋಡ್‌ಗಳಿಂದ ಸಂಗ್ರಹಿಸಲಾದ ಟೆಲಿಮೆಟ್ರಿ ಸರಾಸರಿಗಳು.",
      outbreakTitle: "ಸಕ್ರಿಯ ಬೆಳೆ ರೋಗ ಹರಡುವಿಕೆ",
      outbreakDesc: "ಇತ್ತೀಚೆಗೆ ದಾಖಲಾದ ಬೆಳೆ ರೋಗಗಳ ಸ್ಕ್ಯಾನ್ ಮಾಹಿತಿ:",
      mspTitle: "MSP ಬೆಂಬಲ ಬೆಲೆ ಸೂಚ್ಯಂಕ",
      mspDesc: "ಭಾರತ ಸರ್ಕಾರ ನಿಗದಿಪಡಿಸಿದ ಕನಿಷ್ಠ ಬೆಂಬಲ ಬೆಲೆಗಳು (MSP):",
      emptyChats: "ಯಾವುದೇ ಸಕ್ರಿಯ ಸಂದೇಶಗಳಿಲ್ಲ. ಮೊದಲ ಸಂದೇಶ ದಾಖಲಿಸಲು ನೀವೇ ಮುನ್ನಡೆಯಿರಿ!"
    },
    gu: {
      tagline: "જાહેર ખેડૂત સમુદાય ચર્ચા",
      title: "ખેડૂત સમુદાય ચર્ચા બોર્ડ",
      desc: "સમગ્ર ભારતમાં નોંધાયેલા કૃષિ નોડ્સ સાથે ખેતી વિષયક સલાહ શેર કરો.",
      placeholder: "નોડ તરીકે પોસ્ટ કરો: ",
      placeholderVisitor: "🔒 ચર્ચા બોર્ડમાં ભાગ લેવા માટે કૃપા કરીને લોગિન કરો...",
      loginBtn: "લોગિન / સાઇન અપ",
      backBtn: "ડેશબોર્ડ",
      homeBtn: "પોર્ટલ હોમ",
      npkTitle: "રાષ્ટ્રીય જમીન ગુણવત્તા આંક",
      npkDesc: "1,200 સક્રિય નોડ્સથી સ્ટ્રીમ કરવામાં આવેલ સરેરાશ ટેલિમેટ્રી.",
      outbreakTitle: "સક્રિય પાક રોગ ચેતવણીઓ",
      outbreakDesc: "તાજેતરમાં નોંધાયેલા પાંદડાના રોગ સ્કેન રિપોર્ટ:",
      mspTitle: "MSP લઘુત્તમ ટેકાના ભાવ",
      mspDesc: "ભારત સરકાર દ્વારા નિર્ધારિત ટેકાના ભાવ (MSP):",
      emptyChats: "કોઈ સક્રિય સંદેશ નથી. ચર્ચા શરૂ કરવા પ્રથમ સંદેશ લખો!"
    },
    bn: {
      tagline: "পাবলিক কৃষক সম্প্রদায় চ্যাট",
      title: "কৃষক সম্প্রদায় চ্যাট বোর্ড",
      desc: "নিবন্ধিত কৃষি নোডের সাথে চাষ সম্পর্কিত পরামর্শ এবং তথ্য শেয়ার করুন।",
      placeholder: "নোড হিসেবে পোস্ট করুন: ",
      placeholderVisitor: "🔒 চ্যাটে অংশ নিতে অনুগ্রহ করে লগইন করুন...",
      loginBtn: "লগইন / সাইন আপ",
      backBtn: "ড্যাশবোর্ড",
      homeBtn: "পোর্টাল হোম",
      npkTitle: "জাতীয় ফসলি মাটির সূচক",
      npkDesc: "১,২০০টি সক্রিয় নোড থেকে প্রাপ্ত গড় টেলিমেট্রি তথ্য।",
      outbreakTitle: "সক্রিয় ফসল রোগ প্রাদুর্ভাব",
      outbreakDesc: "সম্প্রতি নথিভুক্ত পাতার রোগ স্ক্যান অ্যালার্ট:",
      mspTitle: "MSP ন্যূনতম সহায়ক মূল্য",
      mspDesc: "ভারত সরকার নির্ধারিত ন্যূনতম সহায়ক মূল্য (MSP):",
      emptyChats: "কোন সক্রিয় বার্তা নেই। আলোচনা শুরু করতে প্রথম বার্তা লিখুন!"
    },
    ml: {
      tagline: "പൊതു കർഷക കമ്മ്യൂണിറ്റി ചാറ്റ്",
      title: "കർഷക കമ്മ്യൂണിറ്റി ചാറ്റ് ബോർഡ്",
      desc: "രജിസ്റ്റർ ചെയ്ത കർഷക നോഡുകളുമായി കൃഷി നിർദ്ദേശങ്ങളും വിവരങ്ങളും പങ്കുവെക്കുക.",
      placeholder: "നോഡ് ആയി രേഖപ്പെടുത്തുക: ",
      placeholderVisitor: "🔒 ചർച്ചയിൽ പങ്കാളിയാകാൻ ദയവായി ലോഗിൻ ചെയ്യുക...",
      loginBtn: "ലോഗിൻ / സൈൻ അപ്പ്",
      backBtn: "ഡാഷ്‌ബോർഡ്",
      homeBtn: "ഹോം പേജ്",
      npkTitle: "ദേശീയ മണ്ണാരോഗ്യ സൂചിക",
      npkDesc: "1,200 സജീവ കർഷക നോഡുകളിൽ നിന്നുള്ള ശരാശരി ടെലിമെട്രി വിവരങ്ങൾ.",
      outbreakTitle: "സജീവ രോഗബാധകൾ",
      outbreakDesc: "സമീപകാലത്ത് രേഖപ്പെടുത്തിയ വിള രോഗ സൂചനകൾ:",
      mspTitle: "MSP താങ്ങുവില വിവരങ്ങൾ",
      mspDesc: "ഇന്ത്യൻ സർക്കാർ നിശ്ചയിച്ച താങ്ങുവില വിവരങ്ങൾ (MSP):",
      emptyChats: "ചർച്ചാ ബോർഡിൽ സന്ദേശങ്ങൾ ലഭ്യമല്ല. ആദ്യ സന്ദേശം പങ്കുവെക്കൂ!"
    },
    or: {
      tagline: "ସର୍ବସାଧାରଣ କୃଷକ ସମୁଦାୟ ଚାଟ୍",
      title: "କୃଷକ ସମୁଦାୟ ଚାଟ୍ ବୋର୍ଡ",
      desc: "ପଞ୍ଜୀକୃତ କୃଷି ନୋଡ୍ ସହିତ କୃଷି ପରାମର୍ଶ ଏବଂ ସୂଚନା ସେୟାର୍ କରନ୍ତୁ ।",
      placeholder: "ନୋଡ୍ ଭାବେ ପୋଷ୍ଟ କରନ୍ତୁ: ",
      placeholderVisitor: "🔒 ଚାଟ୍‌ରେ ଅଂଶଗ୍ରହଣ କରିବାକୁ ଦୟାକରି ଲଗଇନ୍ କରନ୍ତୁ...",
      loginBtn: "ଲଗଇନ୍ / ସାଇନ୍ ଅପ୍",
      backBtn: "ଡ୍ୟାସବୋର୍ଡ",
      homeBtn: "ପୋର୍ଟାଲ୍ ହୋମ୍",
      npkTitle: "ଜାତୀୟ ଫସଲ ମୃତ୍ତିକା ସ୍ୱାସ୍ଥ୍ୟ ସୂଚକ",
      npkDesc: "୧,୨୦୦ ସକ୍ରିୟ ନୋଡ୍‌ରୁ ପ୍ରାପ୍ତ ହୋଇଥିବା ହାରାହାରି ଟେଲିମେଟ୍ରି ତଥ୍ୟ ।",
      outbreakTitle: "ସକ୍ରିୟ ଫସଲ ରୋଗ ପ୍ରକୋପ",
      outbreakDesc: "ସଦ୍ୟ ରେକର୍ଡ ହୋଇଥିବା ପତ୍ର ରୋଗ ସ୍କାନ୍ ଆଲର୍ଟ:",
      mspTitle: "MSP ସର୍ବନିମ୍ନ ସହାୟକ ମୂଲ୍ୟ",
      mspDesc: "ଭାରତ ସରକାରଙ୍କ ଦ୍ୱାରା ନିର୍ଦ୍ଧାରିତ ସର୍ବନିମ୍ନ ସହାୟକ ମୂଲ୍ୟ (MSP):",
      emptyChats: "ଚାଟ୍ ବୋର୍ଡରେ କୌଣସି ପୋଷ୍ଟ ନାହିଁ । ଆଲୋଚନା ଆରମ୍ਭ କରିବାକୁ ପ୍ରଥମ ପୋଷ୍ଟ କରନ୍ତୁ !"
    }
  };

  const t = localization[activeLanguage] || localization["en"];

  // Initialize and check active session
  useEffect(() => {
    const session = localStorage.getItem("kisaan_session");
    if (session) {
      setUserSession(session);
    }

    // Load messages from localStorage, if empty set to empty array
    const storedChats = localStorage.getItem("kisaan_community_chats");
    if (storedChats) {
      setMessages(JSON.parse(storedChats));
    } else {
      setMessages([]);
    }
  }, []);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userSession) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      author: userSession.toUpperCase(),
      location: "Self Farm Node",
      tag: selectedTag === "All" ? "#General" : selectedTag,
      content: newMessage,
      timestamp: "Just now"
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem("kisaan_community_chats", JSON.stringify(updated));
    setNewMessage("");
  };

  const filteredMessages = selectedTag === "All" 
    ? messages 
    : messages.filter(m => m.tag === selectedTag);

  return (
    <div className="min-h-screen bg-transparent text-[#e6f4ea] relative overflow-hidden font-sans p-4 md:p-6 space-y-4 selection:bg-emerald-500 selection:text-white">
      <Preloader />

      {/* Gridline background overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:44px_44px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Navbar */}
        <nav className="glass-panel px-6 py-2.5 flex justify-between items-center bg-[#090d0a]/80 border border-white/10 rounded-full shadow-lg">
          <div className="flex flex-col text-left">
            <span className="text-sm font-black text-white leading-none tracking-wide flex items-center gap-1">
              <Sprout className="text-emerald-500 animate-pulse" size={16} />
              KisaanMitra
            </span>
            <span className="text-[8px] font-bold text-zinc-400 mt-0.5 uppercase tracking-wide">
              {t.tagline}
            </span>
          </div>

          <div className="flex gap-3 items-center">
            {/* Regional Language Select */}
            <div className="bg-black/45 px-2.5 py-1 flex items-center gap-1.5 text-zinc-400 border border-white/10 rounded-full text-[11px] font-bold">
              <Globe size={12} className="text-emerald-400 animate-pulse" />
              <select 
                value={activeLanguage}
                onChange={(e) => setActiveLanguage(e.target.value)}
                className="bg-transparent outline-none cursor-pointer border-none text-[10.5px] font-bold text-emerald-300 font-sans"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code} className="bg-[#050806] text-white">
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>

            {userSession ? (
              <Link 
                href="/dashboard"
                className="px-4 py-1.5 bg-transparent hover:bg-white/5 border border-white/10 text-white font-bold rounded-full text-[10px] transition-all flex items-center gap-1"
              >
                <ArrowLeft size={10} />
                {t.backBtn}
              </Link>
            ) : (
              <Link 
                href="/auth"
                className="px-4 py-1.5 bg-transparent hover:bg-[#10b981]/15 border border-[#10b981]/30 text-emerald-400 font-bold rounded-full text-[10px] transition-all flex items-center gap-1.5"
              >
                <LogIn size={11} />
                {t.loginBtn}
              </Link>
            )}

            <Link 
              href="/"
              className="px-4 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold rounded-full text-[10px] transition-all flex items-center gap-1 shadow"
            >
              {t.homeBtn}
            </Link>
          </div>
        </nav>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Live Public Chat (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* Header info */}
            <div className="glass-panel p-4 bg-black/60 border border-white/10 rounded-xl text-left">
              <h2 className="text-base font-black text-white flex items-center gap-1.5">
                <MessageSquare size={16} className="text-emerald-500 animate-pulse" />
                {t.title}
              </h2>
              <p className="text-[10px] text-zinc-400 font-semibold mt-1">
                {t.desc}
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2 text-[9px] font-bold font-mono">
              {["All", "#PestAlerts", "#SoilNPK", "#MandiPrices", "#Subsidies", "#General"].map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                    selectedTag === tag 
                      ? 'bg-emerald-600 text-black border-emerald-500 font-black' 
                      : 'bg-black/40 text-zinc-400 border-white/5 hover:border-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Locked Post Input for visitors / active input for logged-in nodes */}
            {userSession ? (
              <form onSubmit={handlePostMessage} className="glass-panel p-3 bg-[#080d09]/80 border border-white/10 rounded-xl flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`${t.placeholder}${userSession.toUpperCase()}...`}
                  className="flex-1 bg-black/50 border border-white/5 rounded-lg px-3 py-2 outline-none text-xs text-white placeholder-zinc-550 font-semibold"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#10b981] hover:bg-emerald-600 text-black rounded-lg transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                >
                  <Send size={14} />
                </button>
              </form>
            ) : (
              <div className="glass-panel p-4 bg-red-950/20 border border-red-500/25 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-2">
                  <Lock className="text-red-400 shrink-0" size={16} />
                  <span className="text-[11px] text-zinc-300 font-semibold leading-normal">
                    {t.placeholderVisitor}
                  </span>
                </div>
                <Link 
                  href="/auth" 
                  className="px-4 py-1.5 bg-[#10b981] hover:bg-emerald-600 text-black font-extrabold rounded-lg text-[10px] transition-all flex items-center gap-1 shadow shrink-0"
                >
                  <LogIn size={11} />
                  {t.loginBtn}
                </Link>
              </div>
            )}

            {/* Message feed stream */}
            <div className="flex-1 space-y-3 max-h-[450px] overflow-y-auto pr-1">
              {filteredMessages.length > 0 ? (
                filteredMessages.map(msg => (
                  <div 
                    key={msg.id}
                    className="glass-panel p-4 bg-black/40 border border-white/10 rounded-xl space-y-2 text-left relative overflow-hidden transition-all hover:border-white/15"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-950/60 border border-emerald-500/20 flex items-center justify-center text-emerald-450 font-mono text-xs font-bold uppercase">
                          {msg.author.slice(0, 2)}
                        </div>
                        <div>
                          <span className="text-xs font-black text-white block leading-none">{msg.author}</span>
                          <span className="text-[8px] text-zinc-500 font-mono font-bold mt-0.5 block">{msg.location}</span>
                        </div>
                      </div>
                      <span className="text-[8px] font-black text-emerald-450 border border-emerald-500/20 bg-emerald-950/40 px-2 py-0.5 rounded font-mono uppercase">
                        {msg.tag}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-300 font-sans leading-relaxed font-semibold">
                      {msg.content}
                    </p>

                    <div className="text-[8px] text-zinc-550 font-mono font-bold text-right">
                      {msg.timestamp}
                    </div>
                  </div>
                ))
              ) : (
                <div className="glass-panel p-8 bg-black/20 border border-white/5 rounded-xl text-center space-y-2 text-zinc-500">
                  <MessageSquare className="mx-auto text-zinc-650" size={24} />
                  <p className="text-[11px] font-semibold">{t.emptyChats}</p>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Public Telemetry Data Metrics */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Aggregated Soil Card */}
            <div className="glass-panel p-5 bg-gradient-to-tr from-emerald-955/15 via-black/40 to-transparent border border-white/10 rounded-xl space-y-4 text-left">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[9px] font-black text-emerald-450 font-mono tracking-widest uppercase">AGGREGATED_NPK</span>
                <Globe size={14} className="text-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-white leading-tight">{t.npkTitle}</h3>
              <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
                {t.npkDesc}
              </p>

              <div className="grid grid-cols-3 gap-2 font-mono text-center">
                <div className="bg-black/60 p-2.5 rounded border border-white/5">
                  <span className="text-[8px] text-zinc-500 block uppercase font-bold">Nitrogen</span>
                  <span className="text-emerald-450 text-xs font-black">172 ppm</span>
                </div>
                <div className="bg-black/60 p-2.5 rounded border border-white/5">
                  <span className="text-[8px] text-zinc-500 block uppercase font-bold">Phosphorus</span>
                  <span className="text-emerald-450 text-xs font-black">44 ppm</span>
                </div>
                <div className="bg-black/60 p-2.5 rounded border border-white/5">
                  <span className="text-[8px] text-zinc-500 block uppercase font-bold">Potassium</span>
                  <span className="text-emerald-450 text-xs font-black">210 ppm</span>
                </div>
              </div>
            </div>

            {/* Disease metrics card */}
            <div className="glass-panel p-5 bg-gradient-to-tr from-fuchsia-955/15 via-black/40 to-transparent border border-white/10 rounded-xl space-y-3 text-left">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[9px] font-black text-fuchsia-400 font-mono tracking-widest uppercase">DISEASE_TRACKER</span>
                <Activity size={14} className="text-fuchsia-400 animate-pulse" />
              </div>
              <h3 className="text-sm font-bold text-white">{t.outbreakTitle}</h3>
              <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
                {t.outbreakDesc}
              </p>

              <div className="space-y-1.5 font-mono text-[9px] font-semibold text-zinc-350">
                <div className="flex justify-between p-2 bg-black/60 rounded border border-white/5">
                  <span>Tomato Early Blight</span>
                  <span className="text-fuchsia-400 font-bold">42 Nodes (Punjab)</span>
                </div>
                <div className="flex justify-between p-2 bg-black/60 rounded border border-white/5">
                  <span>Rice Leaf Blast</span>
                  <span className="text-fuchsia-400 font-bold">18 Nodes (Haryana)</span>
                </div>
              </div>
            </div>

            {/* Mandi trends */}
            <div className="glass-panel p-5 bg-gradient-to-tr from-yellow-955/15 via-black/40 to-transparent border border-white/10 rounded-xl space-y-3 text-left">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-[9px] font-black text-yellow-500 font-mono tracking-widest uppercase">MANDI_MSP_INDEX</span>
                <TrendingUp size={14} className="text-yellow-500" />
              </div>
              <h3 className="text-sm font-bold text-white">{t.mspTitle}</h3>
              <p className="text-[10px] text-zinc-400 font-semibold leading-relaxed">
                {t.mspDesc}
              </p>

              <div className="space-y-1.5 font-mono text-[9px] font-semibold text-zinc-350">
                <div className="flex justify-between p-2 bg-black/60 rounded border border-white/5">
                  <span>Wheat (Kanak)</span>
                  <span className="text-yellow-405 font-bold">₹2,275 / Ql</span>
                </div>
                <div className="flex justify-between p-2 bg-black/60 rounded border border-white/5">
                  <span>Paddy (Dhan)</span>
                  <span className="text-yellow-405 font-bold">₹2,183 / Ql</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="h-[1px] w-full bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-yellow-500 opacity-25 mt-10 mb-6" />
        <footer className="text-center text-[9.5px] text-zinc-550 font-bold py-6 border-t border-white/5 mt-8 font-mono">
          <div className="flex justify-between items-center text-zinc-500 font-mono text-[9px]">
            <span>[COMMUNITY_CHAT_GATED: SECURED]</span>
            <span>© 2026 KISAANMITRA. PUBLIC COMMUNITY DATABASE.</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
