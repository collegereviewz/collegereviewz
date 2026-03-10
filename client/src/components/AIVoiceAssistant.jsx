import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, X, Sparkles, Navigation, BrainCircuit, Waves, Smile, Ghost } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AIVoiceAssistant = ({ isOpen, onClose }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [response, setResponse] = useState('How can I help you?');
    const [isThinking, setIsThinking] = useState(false);
    const [showLaughter, setShowLaughter] = useState(false);

    const navigate = useNavigate();
    const recognitionRef = useRef(null);
    const synthRef = useRef(window.speechSynthesis);
    const hasGreetedRef = useRef(false);
    const isDeafRef = useRef(false);
    const lastProcessedRef = useRef('');
    const processingFlagRef = useRef(false);

    // Site Knowledge Base
    const knowledgeBase = {
        navigation: [
            { keywords: ['home', 'main', 'landing'], path: '/', response: "I'm taking you back to the home page. It's the best place to get an overview of everything we offer at CollegeReviewZ." },
            { keywords: ['college', 'explore', 'find'], path: '/ExploreColleges/', response: "I'm opening our college exploration tool. You can filter colleges by state, course, and category to find the perfect fit for your academic goals." },
            { keywords: ['course', 'study'], path: '/Courses/', response: "I'm navigating to our courses listing. You'll find detailed information about various undergraduate and postgraduate programs available across India." },
            { keywords: ['exam', 'neet', 'jee', 'entrance'], path: '/Exams/', response: "I'm opening the exams section. You can find updates, important dates, and preparation resources for entrance exams like NEET and JEE." },
            { keywords: ['scholarship', 'money', 'funding', 'financial aid'], path: '/Scholarship/', response: "I'm opening our scholarships page. Education is an investment, and we want to help you find the financial support you deserve." },
            { keywords: ['abroad', 'foreign', 'international'], path: '/StudyAbroad/', response: "I'm navigating to our Study Abroad counseling portal. We provide expert guidance for students looking to pursue education in the US, UK, Canada, and beyond." },
            { keywords: ['resource', 'tool', 'predictor'], path: '/Resources/', response: "I'm opening our resources hub. Here you can find rank predictors, counseling tools, and other helpful utilities for your admission process." },
            { keywords: ['contact', 'support', 'help'], path: '/Contact/', response: "I'm taking you to our contact page. Our support team is ready to assist you with any specific queries you might have." },
            { keywords: ['review', 'write', 'community'], path: '/WriteReview/', response: "I'm opening our review dashboard. Sharing your experience helps thousands of other students make better decisions." },
            { keywords: ['support', 'customer care', 'ticket'], path: '/Support/', response: "I'm navigating to our support center. You can find FAQs and technical assistance details for our platform here." },
            { keywords: ['login', 'sign in', 'enter'], path: '/Login/', response: "I'm opening the sign in window. You can access your personalized dashboard from here." },
            { keywords: ['signup', 'register', 'create account'], path: '/Signup/', response: "I'm opening the registration window. Creating an account allows you to save colleges and track your scholarship applications." },
            { keywords: ['profile', 'account', 'settings', 'my'], path: '/Profile/', response: "I'm opening your personal profile. You can manage your account information and preferences there." }
        ],
        external: [
            { keywords: ['career genius', 'prediction tool', 'collegereview.io'], url: 'https://collegereview.io/', response: "Opening Career Genius in a new tab. This advanced tool uses data science to help you plan your future path." },
            { keywords: ['counseling website', 'counseling platform', 'counseling tool'], url: 'https://counseling.collegereview.io/', response: "Navigating to our specialized counseling platform. Our expert counselors are here to help you navigate the complex admission landscape." }
        ],
        personality: [
            {
                keywords: ['joke', 'funny', 'laugh'],
                type: 'joke',
                responses: [
                    "Why was the computer cold? Because it left its Windows open. It's a classic for a reason!",
                    "Why did the student eat his homework? Because the teacher said it was a piece of cake. I hope it was tasty!",
                    "What’s a computer’s favorite snack? Micro-chips. I find them quite digital and delicious!",
                    "How many programmers does it take to change a light bulb? None, that's a hardware problem. We software assistants have it easy!",
                    "Why don't scientists trust atoms? Because they make up everything. It's a fundamental part of their personality!",
                    "Why did the math book look sad? Because it had too many problems. But don't worry, I can help you solve yours!",
                    "What do you call an alligator in a vest? An investigator. I'd definitely hire one for my research.",
                    "Why did the scarecrow win an award? Because he was outstanding in his field. I aim for that kind of excellence too!",
                    "What do you call a bear with no teeth? A gummy bear. Just like our favorite candy!",
                    "Why did the bicycle fall over? Because it was two-tired. I never get tired of helping you, though!"
                ]
            },
            {
                keywords: ['hi', 'hello', 'hey'],
                response: "Hello! I'm Sarah, How can I assist you today?"
            },
            {
                keywords: ['thank you', 'thanks'],
                response: "You're very welcome. I'm happy to be of assistance. Is there anything else I can do for you?"
            },
            {
                keywords: ['who are you', 'what are you', 'tell me about yourself'],
                response: "I'm Sarah, your AI voice assistant at CollegeReviewZ. I'm designed to help you navigate our platform and provide information about colleges, exams, and admissions."
            },
            {
                keywords: ['who built you', 'who made you', 'who created you', 'developer', 'creator'],
                response: "I have been built by the College Review team. They created me to make your search for the perfect college as easy and informative as possible."
            },
            {
                keywords: ['talk to me', 'are you there', 'listen'],
                response: "I'm here and listening carefully. Please tell me what you're looking for or ask any question about your college journey."
            },
            {
                keywords: ['you are funny', 'you are good'],
                response: "I appreciate that. I enjoy bringing a bit of humor to our sessions while helping you find the information you need."
            }
        ],
        faqs: [
            {
                keywords: ['what is this', 'about this site'],
                response: 'CollegeReviewZ is India’s premier platform for genuine student reviews and college information. We help students make informed decisions about their education.'
            },
            {
                keywords: ['how to use', 'help me'],
                response: "You can ask me to navigate to any part of the site, like Home, Exams, or Explore Colleges. You can also ask about fees, placements, and specific colleges."
            },
            {
                keywords: ['admission', 'apply', 'joining'],
                response: "If you're ready to apply, most college pages have a direct application link. I can take you to the Explore Colleges page to start your search."
            },
            {
                keywords: ['counseling', 'guidance', 'help me choose'],
                response: "Choosing a college is a pivotal decision. We offer expert counseling services and comprehensive data to help you select the best institution for your career."
            },
            {
                keywords: ['placement', 'jobs', 'salary'],
                response: "We provide detailed placement statistics for colleges, including average packages and top recruiters. You can find this data on our Explore Colleges page."
            },
            {
                keywords: ['fees', 'cost', 'expensive'],
                response: "We list the fee structures for undergraduate and postgraduate courses on our platform. This helps you compare costs across different institutions."
            },
            {
                keywords: ['ranking', 'rank'],
                response: "Our platform provides college rankings based on student reviews, infrastructure, and academic excellence to help you identify the best options."
            }
        ]
    };

    const audioRef = useRef(new Audio());

    const speak = useCallback(async (text, action = null) => {
        try {
            console.log('TTS Request for:', text);
            // "Deafen" the assistant so it doesn't hear itself
            isDeafRef.current = true;
            setIsSpeaking(true);
            setIsThinking(true);
            setResponse(text);

            const isJoke = text.toLowerCase().includes('haha') || text.toLowerCase().includes('hehe') || text.toLowerCase().includes('joke');
            setShowLaughter(isJoke);

            // Stop any existing audio
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }

            // Attempt to fetch from high-quality backend (try 127.0.0.1 first for better reliability on Windows)
            let res = null;
            const backendUrls = ['http://127.0.0.1:5000/api/voice/tts', 'http://localhost:5000/api/voice/tts'];

            for (const url of backendUrls) {
                try {
                    console.log(`Trying ElevenLabs via ${url}...`);
                    res = await fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ text })
                    });
                    if (res.ok) {
                        console.log(`Success hitting ${url}!`);
                        break;
                    }
                } catch (e) {
                    console.warn(`Fetch from ${url} failed`);
                }
            }

            console.log('Voice API Status:', res ? res.status : 'FAILED');

            if (!res || !res.ok) {
                const errorDetail = res ? `Status ${res.status}` : "Backend Unreachable";
                console.error(`ElevenLabs Fetch Failed: ${errorDetail}`);
                setResponse(`I'm sorry, I'm having trouble connecting to my voice server (${errorDetail}). Please ensure the server is running on port 5000.`);
                setIsSpeaking(false);
                setIsThinking(false);
                setShowLaughter(false);
                setTimeout(() => { isDeafRef.current = false; processingFlagRef.current = false; }, 400);
                return;
            }

            setIsThinking(false);
            const blob = await res.blob();
            console.log('Audio Blob received:', blob.size, 'bytes', blob.type);

            if (blob.size < 1000) {
                console.warn('Audio blob seems too small, might be an error page or empty file.');
            }

            const url = URL.createObjectURL(blob);
            audioRef.current.src = url;

            audioRef.current.onended = () => {
                console.log('Playback ended');
                setIsSpeaking(false);
                setShowLaughter(false);
                URL.revokeObjectURL(url);

                setTimeout(() => {
                    isDeafRef.current = false;
                    processingFlagRef.current = false;
                }, 400);

                if (action) action();
            };

            audioRef.current.onerror = (e) => {
                console.error('Audio element error:', e);
                setIsSpeaking(false);
                setIsThinking(false);
                isDeafRef.current = false;
                processingFlagRef.current = false;
            };

            console.log('Starting playback...');
            await audioRef.current.play().catch(playError => {
                console.error('Playback failed (check auto-play policies):', playError);
                // Fallback indication to user
                setResponse(text + " (Please enable audio if you can't hear me!)");
            });

        } catch (error) {
            console.error('Speech Execution Error:', error);
            setIsSpeaking(false);
            setIsThinking(false);
            isDeafRef.current = false;
            processingFlagRef.current = false;
        }
    }, []);

    const handleCommand = useCallback((text) => {
        if (processingFlagRef.current || isSpeaking) return;

        const lowerText = text.toLowerCase().trim();
        if (!lowerText || lowerText.length < 3 || lowerText === lastProcessedRef.current) return;

        processingFlagRef.current = true;
        lastProcessedRef.current = lowerText;
        setIsThinking(true);

        const cleanText = lowerText.replace(/please|can you|take me to|go to|show me|navigate to|assistant/g, '').trim();

        // 1. External Tools
        for (const item of knowledgeBase.external) {
            if (item.keywords.some(k => lowerText.includes(k) || cleanText.includes(k))) {
                speak(item.response, () => {
                    window.open(item.url, '_blank');
                });
                return;
            }
        }

        // 2. Navigation
        for (const item of knowledgeBase.navigation) {
            if (item.keywords.some(k => lowerText.includes(k) || cleanText.includes(k))) {
                speak(item.response, () => {
                    navigate(item.path);
                });
                return;
            }
        }

        // 3. Jokes & Personality
        for (const item of knowledgeBase.personality) {
            if (item.keywords.some(k => lowerText.includes(k))) {
                if (item.type === 'joke') {
                    const randomJoke = item.responses[Math.floor(Math.random() * item.responses.length)];
                    speak(randomJoke);
                } else {
                    speak(item.response);
                }
                return;
            }
        }

        // 4. FAQs
        for (const item of knowledgeBase.faqs) {
            if (item.keywords.some(k => lowerText.includes(k))) {
                speak(item.response);
                return;
            }
        }

        // 5. LLM Fallback (Gemini)
        const fetchAIResponse = async () => {
            try {
                const aiRes = await fetch('http://localhost:5000/api/voice/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: lowerText })
                });
                const aiData = await aiRes.json();
                if (aiData.response) {
                    speak(aiData.response);
                } else {
                    speak("I'm sorry, I'm having trouble thinking right now. Please try again later.");
                }
            } catch (err) {
                console.error('AI Chat Error:', err);
                speak("I'm sorry, I'm having trouble connecting to my brain. Please check your internet connection.");
            }
        };

        fetchAIResponse();
    }, [navigate, speak, isSpeaking]);

    const initRecognition = useCallback(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return;

        if (recognitionRef.current) {
            try { recognitionRef.current.stop(); } catch (e) { }
        }

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN'; // Better for Indian accents
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = () => {
            console.log('Recognition started');
            setIsListening(true);
        };

        recognition.onend = () => {
            console.log('Recognition ended');
            setIsListening(false);
            // ONLY restart if still open and NOT speaking
            if (isOpen && !isSpeaking && !isDeafRef.current) {
                setTimeout(() => {
                    if (isOpen && !isListening) {
                        try { recognition.start(); } catch (e) { }
                    }
                }, 300);
            }
        };

        recognition.onresult = (event) => {
            if (isDeafRef.current || isSpeaking) return;

            let finalTranscript = '';
            let interimTranscript = '';

            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }

            if (interimTranscript) setTranscription(interimTranscript);

            if (finalTranscript) {
                setTranscription(finalTranscript);
                handleCommand(finalTranscript);
            }
        };

        recognition.onerror = (event) => {
            if (event.error === 'no-speech') return;
            if (event.error === 'aborted') return;
            console.warn('Recognition error:', event.error);
        };

        recognitionRef.current = recognition;
        try { recognition.start(); } catch (e) {
            console.error('Failed to start recognition', e);
        }
    }, [isOpen, handleCommand, isSpeaking]);

    useEffect(() => {
        if (isOpen) {
            if (!hasGreetedRef.current) {
                speak("Hello! I'm Sarah, your AI assistant. I'm here to help you find the best colleges and answer any questions you have. I'm listening... what's on your mind?");
                hasGreetedRef.current = true;
            }
            initRecognition();
        } else {
            console.log('Assistant closed - cleaning up...');
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
            if (recognitionRef.current) {
                recognitionRef.current.onend = null; // Prevent restart
                recognitionRef.current.onerror = null;
                recognitionRef.current.onresult = null;
                try {
                    recognitionRef.current.stop();
                } catch (e) {
                    console.log('Recognition already stopped or error stopping:', e);
                }
            }
            hasGreetedRef.current = false;
            setIsListening(false);
            setIsSpeaking(false);
            isDeafRef.current = false;
            processingFlagRef.current = false;
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.onend = null;
                recognitionRef.current.stop();
            }
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, [isOpen, initRecognition, speak]);


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 0.9, y: 30, filter: 'blur(10px)' }}
                    style={{
                        position: 'fixed',
                        bottom: '120px',
                        right: '40px',
                        width: '380px',
                        background: 'rgba(255, 255, 255, 0.92)',
                        backdropFilter: 'blur(25px)',
                        borderRadius: '40px',
                        boxShadow: '0 30px 100px rgba(91, 81, 216, 0.3)',
                        padding: '30px',
                        zIndex: 1001,
                        border: '1px solid rgba(255, 255, 255, 0.6)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}
                >
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                background: 'linear-gradient(135deg, #5b51d8, #7c3aed)',
                                borderRadius: '18px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                boxShadow: '0 10px 25px rgba(91, 81, 216, 0.35)'
                            }}>
                                <BrainCircuit size={28} />
                            </div>
                            <div>
                                <h3 style={{ margin: 0, fontSize: '19px', fontWeight: 900, color: '#1e293b' }}>College AI</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isListening ? '#10b981' : '#94a3b8' }} />
                                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                                        {isSpeaking ? 'Speaking' : isThinking ? 'Thinking...' : isListening ? 'Live listening' : 'Standby'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <motion.button
                                whileHover={{ scale: 1.1, background: '#fee2e2' }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    background: '#f1f5f9',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: '#ef4444'
                                }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>
                    </div>

                    {/* Orbit Visualizer */}
                    <div style={{
                        height: '180px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative'
                    }}>
                        <AnimatePresence mode="wait">
                            {isSpeaking ? (
                                <motion.div
                                    key="speaking_anim"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{ display: 'flex', gap: '6px', alignItems: 'center', height: '100%' }}
                                >
                                    {showLaughter ? (
                                        <motion.div animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 0.4 }}>
                                            <Smile size={90} color="#5b51d8" strokeWidth={2.5} />
                                        </motion.div>
                                    ) : (
                                        [0, 1, 2, 3, 4, 5, 6].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ height: [20, i % 2 === 0 ? 80 : 50, 20] }}
                                                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                                                style={{ width: '10px', background: 'linear-gradient(to top, #5b51d8, #a78bfa)', borderRadius: '20px' }}
                                            />
                                        ))
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle_anim"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    style={{ position: 'relative' }}
                                >
                                    <motion.div
                                        animate={{
                                            rotate: isThinking ? 360 : 0,
                                            scale: isListening ? [1, 1.15, 1] : 1,
                                            borderRadius: isListening
                                                ? ["40% 60% 60% 40% / 40% 40% 60% 60%", "60% 40% 40% 60% / 60% 60% 40% 40%"]
                                                : "38% 62% 63% 37% / 41% 44% 56% 59%"
                                        }}
                                        transition={{
                                            rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                                            scale: { repeat: Infinity, duration: 2 },
                                            borderRadius: { repeat: Infinity, duration: 4 }
                                        }}
                                        style={{
                                            width: '130px',
                                            height: '130px',
                                            background: 'linear-gradient(135deg, #5b51d8, #7c3aed)',
                                            boxShadow: isListening ? '0 0 60px rgba(91, 81, 216, 0.5)' : '0 25px 50px rgba(91, 81, 216, 0.25)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: '#fff'
                                        }}
                                    >
                                        {isListening ? <Waves size={60} /> : isThinking ? <BrainCircuit size={60} /> : <Ghost size={60} />}
                                    </motion.div>

                                    {/* Pulse Rings */}
                                    {isListening && [1, 2].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                            transition={{ repeat: Infinity, duration: 2, delay: i * 0.5 }}
                                            style={{
                                                position: 'absolute',
                                                top: 0, left: 0, right: 0, bottom: 0,
                                                border: '2px solid #5b51d8',
                                                borderRadius: '50%',
                                                zIndex: -1
                                            }}
                                        />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Dialogue Area */}
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '32px',
                        padding: '30px',
                        textAlign: 'center',
                        minHeight: '160px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '15px',
                        border: '1px solid #e2e8f0',
                        position: 'relative',
                        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.02)'
                    }}>
                        <AnimatePresence mode="wait">
                            {isListening ? (
                                <motion.div
                                    key="listen_box"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                                >
                                    <p style={{ margin: 0, fontSize: '15px', fontWeight: 800, color: '#5b51d8', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                        Hearing You...
                                    </p>
                                    <p style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#64748b', fontStyle: 'italic', lineHeight: 1.4 }}>
                                        {transcription ? `"${transcription}"` : "Say something like 'Go to profile'"}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.p
                                    key="response_box"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{ margin: 0, fontSize: '20px', fontWeight: 800, color: '#1e293b', lineHeight: 1.5 }}
                                >
                                    {response}
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Quick Hint */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px',
                        background: 'rgba(91, 81, 216, 0.08)',
                        padding: '15px 20px',
                        borderRadius: '25px'
                    }}>
                        <Smile size={22} color="#5b51d8" />
                        <p style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: 700 }}>
                            Try: <span style={{ color: '#5b51d8' }}>"tell me a joke"</span> or <span style={{ color: '#5b51d8' }}>"show colleges"</span>
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIVoiceAssistant;
