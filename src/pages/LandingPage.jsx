import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Sparkles, Stars, Rocket, BookOpen } from 'lucide-react'

export default function LandingPage() {
    const navigate = useNavigate()

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4">
            {/* Animated background elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-20 -left-20 text-primary/20 opacity-50"
            >
                <Stars size={300} />
            </motion.div>
            <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-40 right-20 text-secondary/30 hidden md:block"
            >
                <Rocket size={150} />
            </motion.div>

            <main className="relative z-10 text-center max-w-4xl mx-auto">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-6xl md:text-8xl font-bubblegum text-pop mb-4 drop-shadow-sm">
                        Story Magic
                    </h1>
                    <p className="text-2xl md:text-3xl font-quicksand font-semibold text-slate-600">
                        AI-powered tales for your little ones! ✨
                    </p>
                </motion.div>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col md:flex-row gap-6 justify-center items-center"
                >
                    <Button
                        onClick={() => navigate('/generator')}
                        className="text-3xl px-12 py-6 animate-bounce-slow flex items-center gap-2 shadow-2xl hover:bg-primary-dark"
                    >
                        <BookOpen /> Create a Story
                    </Button>

                    <button
                        onClick={() => navigate('/generator', { state: { surprise: true } })}
                        className="bg-white/80 backdrop-blur-md text-primary font-bubblegum text-2xl px-10 py-5 rounded-full border-2 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2"
                    >
                        <Sparkles /> Surprise Me!
                    </button>
                </motion.div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: <Sparkles className="text-accent" />, title: "Personalized", text: "Using your child's name!" },
                        { icon: <Stars className="text-primary" />, title: "Themes", text: "Space, Jungle, Sea & more." },
                        { icon: <Rocket className="text-secondary" />, title: "Morals", text: "Learn while having fun!" }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + i * 0.2 }}
                            className="glass-card p-6 flex flex-col items-center gap-2"
                        >
                            <div className="text-4xl mb-2">{feature.icon}</div>
                            <h3 className="font-bubblegum text-2xl text-primary">{feature.title}</h3>
                            <p className="font-quicksand text-lg text-slate-600 font-semibold">{feature.text}</p>
                        </motion.div>
                    ))}
                </div>
            </main>
        </div>
    )
}
