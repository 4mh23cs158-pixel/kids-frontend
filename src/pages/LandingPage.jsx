import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Sparkles, Stars, Rocket, BookOpen, Wand2, Globe, Palette, Heart, Shield, Zap, Users, Brain, GraduationCap } from 'lucide-react'

const STATS = [
    { label: 'Stories Created', value: '10K+', icon: <BookOpen size={24} /> },
    { label: 'Languages', value: '18', icon: <Globe size={24} /> },
    { label: 'Story Themes', value: '12', icon: <Palette size={24} /> },
    { label: 'Happy Families', value: '5K+', icon: <Heart size={24} /> },
]

const FEATURES = [
    { icon: <Brain className="text-primary" size={28} />, title: 'AI-Powered Stories', desc: 'Advanced AI crafts unique, age-appropriate tales every time.' },
    { icon: <Globe className="text-secondary" size={28} />, title: '18 Languages', desc: 'Stories in English, Hindi, Spanish, Japanese, and 14 more!' },
    { icon: <Palette className="text-accent-dark" size={28} />, title: 'Comic Strips', desc: 'Beautiful AI-generated comic panels bring stories to life.' },
    { icon: <Shield className="text-primary" size={28} />, title: 'Safe & Ethical', desc: 'Every story is filtered to be kid-friendly with positive morals.' },
    { icon: <GraduationCap className="text-secondary" size={28} />, title: 'Moral Lessons', desc: 'Choose from 10 life lessons woven into each adventure.' },
    { icon: <Users className="text-accent-dark" size={28} />, title: 'Inclusive Heroes', desc: 'Gender-neutral characters that every child can see themselves in.' },
]

const STEPS = [
    { step: '01', title: 'Choose Your Adventure', desc: 'Pick a theme, moral, language, and name your hero.', emoji: '🎯' },
    { step: '02', title: 'AI Creates Magic', desc: 'Our AI weaves a personalized story with comic panels.', emoji: '✨' },
    { step: '03', title: 'Read, Share & Print', desc: 'Enjoy the story, save as PDF, or share with friends.', emoji: '📖' },
]

const TESTIMONIALS = [
    { name: 'Priya M.', text: 'My daughter asks for a BrainBloom story every night! The Hindi stories are amazing.', emoji: '🇮🇳' },
    { name: 'James L.', text: 'The comic strips are incredible. My son loves seeing his adventures come to life!', emoji: '🎨' },
    { name: 'Aisha K.', text: 'A fun and safe way for kids to explore creativity. We love the moral lessons!', emoji: '💖' },
]

export default function LandingPage() {
    const navigate = useNavigate()
    const [currentTestimonial, setCurrentTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % TESTIMONIALS.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative min-h-screen flex flex-col overflow-hidden">
            {/* ═══════════════════════ HERO SECTION ═══════════════════════ */}
            <section className="relative flex flex-col items-center justify-center min-h-[85vh] px-4 pb-16">
                {/* Animated background elements */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-20 -left-20 text-primary/10 opacity-50"
                >
                    <Stars size={350} />
                </motion.div>
                <motion.div
                    animate={{ y: [0, -25, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-40 right-12 text-secondary/20 hidden md:block"
                >
                    <Rocket size={120} />
                </motion.div>
                <motion.div
                    animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                    className="absolute bottom-32 left-16 text-accent/30 hidden lg:block"
                >
                    <Wand2 size={80} />
                </motion.div>

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full bg-primary/20"
                        style={{ top: `${20 + i * 12}%`, left: `${10 + i * 15}%` }}
                        animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
                        transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
                    />
                ))}

                <main className="relative z-10 text-center max-w-5xl mx-auto">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-10"
                    >
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20"
                        >
                            <Sparkles size={16} /> AI-Powered Storytelling for Kids
                        </motion.div>

                        <h1 className="text-7xl md:text-9xl font-bubblegum text-gradient mb-6 leading-tight drop-shadow-sm">
                            BrainBloom AI
                        </h1>
                        <p className="text-2xl md:text-3xl font-quicksand font-semibold text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            Create magical, personalized stories with AI-generated comic strips — in <span className="text-primary font-bold">18 languages</span>! ✨
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
                    >
                        <Button
                            onClick={() => navigate('/generator')}
                            className="text-2xl px-12 py-6 animate-bounce-slow flex items-center gap-3 shadow-2xl hover:bg-primary-dark"
                        >
                            <BookOpen size={24} /> Create a Story
                        </Button>

                        <button
                            onClick={() => navigate('/generator', { state: { surprise: true } })}
                            className="bg-white/80 backdrop-blur-md text-primary font-bubblegum text-2xl px-10 py-5 rounded-full border-2 border-primary/20 hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95 flex items-center gap-2"
                        >
                            <Sparkles /> Surprise Me!
                        </button>

                        <button
                            onClick={() => navigate('/generator')}
                            className="text-secondary font-quicksand font-bold text-lg px-8 py-4 rounded-full border-2 border-secondary/20 hover:bg-secondary hover:text-white transition-all active:scale-95"
                        >
                            🚀 Try as Guest
                        </button>
                    </motion.div>
                </main>
            </section>

            {/* ═══════════════════════ HOW IT WORKS ═══════════════════════ */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-5xl font-bubblegum text-primary mb-3">How It Works</h2>
                        <p className="text-xl text-slate-500 font-semibold">Three simple steps to magical stories</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {STEPS.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="relative glass-card p-8 text-center group hover:scale-105 transition-transform"
                            >
                                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-primary text-white font-bubblegum text-lg flex items-center justify-center shadow-lg">
                                    {step.step}
                                </div>
                                <div className="text-5xl mb-4">{step.emoji}</div>
                                <h3 className="text-2xl font-bubblegum text-primary mb-2">{step.title}</h3>
                                <p className="text-slate-600 font-quicksand font-semibold">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ FEATURES GRID ═══════════════════════ */}
            <section className="py-20 px-4 bg-white/40">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                    >
                        <h2 className="text-5xl font-bubblegum text-secondary mb-3">Why BrainBloom AI?</h2>
                        <p className="text-xl text-slate-500 font-semibold">Everything you need for magical storytelling</p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURES.map((feat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-7 flex flex-col gap-4 group hover:shadow-2xl hover:-translate-y-1 transition-all cursor-default"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/80 shadow-md flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {feat.icon}
                                </div>
                                <h3 className="font-bubblegum text-xl text-slate-800">{feat.title}</h3>
                                <p className="font-quicksand text-slate-600 font-semibold text-sm leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ STATS SECTION ═══════════════════════ */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {STATS.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 text-center group hover:scale-105 transition-transform"
                            >
                                <div className="mb-3 text-primary mx-auto flex justify-center group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-bubblegum text-gradient">{stat.value}</div>
                                <p className="text-sm font-quicksand font-bold text-slate-500 mt-1">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
            <section className="py-20 px-4 bg-white/40">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-5xl font-bubblegum text-primary mb-3">Loved by Families</h2>
                        <p className="text-xl text-slate-500 font-semibold">See what parents are saying</p>
                    </motion.div>

                    <div className="relative h-44">
                        {TESTIMONIALS.map((t, i) => (
                            <motion.div
                                key={i}
                                initial={false}
                                animate={{
                                    opacity: currentTestimonial === i ? 1 : 0,
                                    y: currentTestimonial === i ? 0 : 20,
                                    scale: currentTestimonial === i ? 1 : 0.95,
                                }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                                style={{ pointerEvents: currentTestimonial === i ? 'auto' : 'none' }}
                            >
                                <div className="glass-card p-8">
                                    <div className="text-4xl mb-4">{t.emoji}</div>
                                    <p className="text-lg font-quicksand text-slate-700 font-semibold italic mb-4">"{t.text}"</p>
                                    <p className="font-bubblegum text-primary text-lg">— {t.name}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3 mt-8">
                        {TESTIMONIALS.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentTestimonial(i)}
                                className={`w-3 h-3 rounded-full transition-all ${currentTestimonial === i ? 'bg-primary w-8' : 'bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════ FOOTER CTA ═══════════════════════ */}
            <section className="py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto glass-card p-12 text-center relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-animated opacity-5 rounded-[2.5rem]"></div>
                    <div className="relative z-10">
                        <h2 className="text-5xl font-bubblegum text-gradient mb-4">Ready to Start?</h2>
                        <p className="text-xl text-slate-600 font-semibold mb-8 max-w-lg mx-auto">
                            Create your first magical story in under 30 seconds. No signup required!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                onClick={() => navigate('/generator')}
                                className="text-2xl px-10 py-5 flex items-center gap-2 shadow-2xl"
                            >
                                <Wand2 /> Start Your Adventure
                            </Button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="text-secondary font-bold font-quicksand text-lg px-8 py-4 rounded-full border-2 border-secondary/20 hover:bg-secondary hover:text-white transition-all"
                            >
                                Create Free Account
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>
        </div>
    )
}
