"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Mic, Play, Send, Sparkles, MessageCircle, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function VibeChainPage() {
    const [step, setStep] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [vibeChainId, setVibeChainId] = useState<string | null>(null);

    // Simulation timers
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording || isPlaying) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        setIsRecording(false);
                        setIsPlaying(false);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 100); // adjust speed
        }
        return () => clearInterval(interval);
    }, [isRecording, isPlaying]);

    const createVibeChain = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                console.error("No user logged in, cannot save vibe.");
                return;
            }

            const response = await fetch('/api/vibe/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    senderId: user.id,
                    senderEmail: user.email
                })
            });
            const data = await response.json();
            if (data.id) setVibeChainId(data.id);
        } catch (error) {
            console.error("Error creating vibe chain:", error);
        }
    };

    const updateVibeChain = async (status: string, updates: any = {}) => {
        if (!vibeChainId) return;
        try {
            await fetch('/api/vibe/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: vibeChainId,
                    status,
                    ...updates
                })
            });
        } catch (error) {
            console.error("Error updating vibe chain:", error);
        }
    };

    const startFlow = () => {
        createVibeChain();
        setStep(1);
        setProgress(0);
        setIsRecording(true);
    };

    const sendVoice1 = async () => {
        setIsRecording(false);
        setStep(2);

        await updateVibeChain('VOICE1_SENT', { voice1Url: 'mock-audio-1.mp3' });

        // Simulate network delay / receiver action
        setTimeout(() => {
            setStep(3); // Receiver replied
        }, 4000);
    };

    const listenToReply = () => {
        setStep(4);
        setProgress(0);
        setIsPlaying(true);
    };

    const finishListening = async () => {
        setIsPlaying(false);
        setStep(5);
        setProgress(0);
        setIsRecording(true);
        // We assume we received voice2
        await updateVibeChain('VOICE2_RECEIVED', { voice2Url: 'mock-audio-response.mp3' });
    };

    const sendFinal = async () => {
        setIsRecording(false);
        setStep(6);

        await updateVibeChain('VOICE3_SENT', { voice3Url: 'mock-audio-final.mp3' });

        setTimeout(async () => {
            await updateVibeChain('SYNCED', { syncScore: 87.0 });
            setStep(7); // Synced
        }, 3000);
    };

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-black to-pink-900 flex items-center justify-center p-4 relative overflow-hidden text-white">
            {/* Exit Button */}
            <Link href="/" className="absolute top-6 right-6 z-50">
                <Button variant="ghost" size="icon" className="text-white/40 hover:text-white hover:bg-white/10 rounded-full w-12 h-12">
                    <X size={24} />
                </Button>
            </Link>

            {/* Background Ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse"></div>

            <div className="w-full max-w-md relative z-10">
                <AnimatePresence mode="wait">

                    {/* STEP 0: MATCH FOUND */}
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="text-center space-y-6"
                        >
                            <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                                <Image src="/hero-image.png" alt="Match" fill className="object-cover group-hover:scale-105 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 text-left">
                                    <h2 className="text-4xl font-bold">Lisa, 24</h2>
                                    <p className="text-emerald-400 font-medium flex items-center gap-2">
                                        <Sparkles size={16} /> Mountainbiking, Tech, Art
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-light">It's a Vibe Match!</h3>
                                <p className="text-white/60">Record a 30s intro to break the ice.</p>
                                <Button onClick={startFlow} className="w-full h-16 text-xl rounded-full bg-emerald-500 hover:bg-emerald-600 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse hover:scale-105 transition-transform">
                                    <Mic className="mr-2" /> Record Intro (30s)
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 1: RECORDING INTRO */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl space-y-8 text-center"
                        >
                            <h3 className="text-2xl font-bold">Recording Intro...</h3>
                            <div className="h-32 flex items-center justify-center gap-1">
                                {/* Fake Waveform */}
                                {[...Array(10)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ height: isRecording ? [20, 60, 20] : 20 }}
                                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.1 }}
                                        className="w-4 bg-emerald-500 rounded-full opacity-80"
                                    />
                                ))}
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
                            </div>
                            <Button onClick={sendVoice1} className="w-full h-14 rounded-full bg-white text-black hover:bg-zinc-200">
                                <Send className="mr-2" size={18} /> Send Vibe
                            </Button>
                        </motion.div>
                    )}

                    {/* STEP 2: WAITING */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center pt-20"
                        >
                            <div className="w-32 h-32 mx-auto border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                            <h3 className="text-2xl mt-8 font-light">Waiting for Lisa...</h3>
                            <p className="text-white/40 mt-2">She's listening to your vibe.</p>
                        </motion.div>
                    )}

                    {/* STEP 3: RECEIVED */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-purple-500/20 blur-3xl animate-pulse"></div>
                            <Card className="relative bg-white/10 backdrop-blur-xl border-white/20 p-8 rounded-3xl text-center space-y-6">
                                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 p-1">
                                    <Image src="/hero-image.png" alt="Lisa" width={96} height={96} className="rounded-full object-cover border-4 border-black" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Lisa sent a Vibe!</h3>
                                    <p className="text-emerald-400">Response to your intro</p>
                                </div>
                                <Button onClick={listenToReply} className="w-full h-16 rounded-full bg-white text-black text-lg hover:scale-105 transition-transform">
                                    <Play className="fill-black mr-2" /> Listen (10s)
                                </Button>
                            </Card>
                        </motion.div>
                    )}

                    {/* STEP 4: LISTENING */}
                    {step === 4 && (
                        <motion.div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl space-y-8 text-center">
                            <h3 className="text-xl text-white/60">Listening to Lisa...</h3>
                            <div className="flex items-center justify-center gap-2 h-20">
                                <div className="w-3 h-12 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                                <div className="w-3 h-16 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-3 h-10 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                <div className="w-3 h-14 bg-purple-500/80 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                            </div>
                            {progress >= 100 && (
                                <Button onClick={finishListening} className="w-full h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white">
                                    <Mic className="mr-2" /> Reply Final (20s)
                                </Button>
                            )}
                        </motion.div>
                    )}

                    {/* STEP 5: RECORDING FINAL */}
                    {step === 5 && (
                        <motion.div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl space-y-8 text-center">
                            <h3 className="text-2xl font-bold">Final Resonance...</h3>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <motion.div className="h-full bg-pink-500" style={{ width: `${progress}%` }} />
                            </div>
                            <Button onClick={sendFinal} className="w-full h-14 rounded-full bg-pink-600 hover:bg-pink-700">
                                <Send className="mr-2" size={18} /> Send Final Vibe
                            </Button>
                        </motion.div>
                    )}

                    {/* STEP 6: SYNCING */}
                    {step === 6 && (
                        <motion.div className="text-center pt-20">
                            <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 animate-pulse">
                                SYNCING...
                            </h1>
                        </motion.div>
                    )}

                    {/* STEP 7: SYNCED */}
                    {step === 7 && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="relative inline-block">
                                <div className="absolute inset-0 bg-emerald-500 blur-3xl opacity-40"></div>
                                <h1 className="relative text-7xl font-black text-white tracking-tighter">
                                    87%
                                    <span className="block text-2xl font-normal text-emerald-400 mt-2">VibeChain Synced</span>
                                </h1>
                            </div>

                            <div className="flex flex-col gap-4">
                                <Button onClick={() => setStep(8)} className="h-16 rounded-2xl bg-white text-black text-xl font-bold hover:scale-105 transition-transform cursor-pointer">
                                    <MessageCircle className="mr-2" /> Chat with Lisa
                                </Button>
                                <Button variant="outline" className="h-16 rounded-2xl border-white/20 text-white hover:bg-white/10">
                                    <User className="mr-2" /> View Profile
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 8: CHAT */}
                    {step === 8 && (
                        <ChatInterface onBack={() => setStep(7)} />
                    )}

                </AnimatePresence>
            </div>
        </main>
    );
}

function ChatInterface({ onBack }: { onBack: () => void }) {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'system', text: "🦋 Resonance Detected! Lisa loved your take on mountainbiking." },
        { id: 2, sender: 'Lisa', text: "Wow, that audio vibe! 🎧 I actually go to the Alps every summer. Do you ride mostly downhill or XC?" }
    ]);
    const [text, setText] = useState("");

    const sendMessage = () => {
        if (!text.trim()) return;

        const newMsg = { id: Date.now(), sender: 'me', text };
        setMessages(prev => [...prev, newMsg]);
        setText("");

        // Simulated reply
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                sender: 'Lisa',
                text: "That sounds awesome! We should totally go for a ride sometime if we match. 🚲"
            }]);
        }, 3000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full h-[600px] bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl flex flex-col overflow-hidden"
        >
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/5">
                <Button variant="ghost" size="icon" onClick={onBack} className="text-white/50 hover:text-white">
                    <User size={18} />
                </Button>
                <div className="relative">
                    <Image src="/hero-image.png" alt="Lisa" width={48} height={48} className="rounded-full border-2 border-emerald-500 object-cover" />
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black"></div>
                </div>
                <div>
                    <h3 className="font-bold text-lg">Lisa</h3>
                    <p className="text-emerald-400 text-xs flex items-center gap-1">
                        <Sparkles size={10} /> 87% Vibe Synced
                    </p>
                </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 space-y-4 overflow-y-auto flex flex-col">
                <div className="flex justify-center flex-shrink-0">
                    <span className="bg-white/5 text-white/40 text-xs px-3 py-1 rounded-full">
                        VibeChain Unlocked • Today
                    </span>
                </div>

                {messages.map((msg) => {
                    if (msg.sender === 'system') {
                        return (
                            <div key={msg.id} className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-xl text-sm text-emerald-200 text-center flex-shrink-0">
                                {msg.text}
                            </div>
                        );
                    }
                    const isMe = msg.sender === 'me';
                    return (
                        <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''} flex-shrink-0`}>
                            {!isMe && (
                                <Image src="/hero-image.png" alt="Lisa" width={32} height={32} className="rounded-full object-cover self-end mb-1" />
                            )}
                            <div className={`p-3 rounded-2xl max-w-[80%] ${isMe ? 'bg-emerald-500 text-white rounded-br-sm' : 'bg-zinc-800 text-white rounded-bl-sm'}`}>
                                <p>{msg.text}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="p-4 bg-white/5 border-t border-white/10"
            >
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 h-12 focus:outline-none focus:border-emerald-500 transition-colors text-white"
                    />
                    <Button type="submit" className="w-12 h-12 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center">
                        <Send size={18} />
                    </Button>
                </div>
            </form>
        </motion.div>
    );
}
