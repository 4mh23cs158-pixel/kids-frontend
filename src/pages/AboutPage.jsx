import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Shield, Zap } from 'lucide-react'

export default function AboutPage() {
    return (
        <div className="max-w-4xl mx-auto py-16 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl md:text-7xl font-bubblegum text-primary mb-6">About BrainBloom AI</h1>
                <p className="text-2xl text-slate-600 font-semibold">Creating wonder, one story at a time. ✨</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="glass-card p-8">
                    <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                        <Heart className="text-primary" size={32} />
                    </div>
                    <h3 className="text-2xl font-bubblegum text-primary mb-3">Our Mission</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        To spark imagination and cultivate a love for reading in children through the power of personalized storytelling.
                    </p>
                </div>

                <div className="glass-card p-8">
                    <div className="bg-secondary/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                        <Sparkles className="text-secondary" size={32} />
                    </div>
                    <h3 className="text-2xl font-bubblegum text-secondary mb-3">Magical AI</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        We use advanced AI to create safe, engaging, and ethically grounded stories tailored specifically for your child.
                    </p>
                </div>

                <div className="glass-card p-8">
                    <div className="bg-accent/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                        <Shield className="text-accent-dark" size={32} />
                    </div>
                    <h3 className="text-2xl font-bubblegum text-accent-dark mb-3">Safe & Fun</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        Every story is filtered to ensure it's age-appropriate and contains positive morals for young minds.
                    </p>
                </div>

                <div className="glass-card p-8">
                    <div className="bg-pop/10 w-14 h-14 rounded-2xl flex items-center justify-center mb-6">
                        <Zap className="text-pop" size={32} />
                    </div>
                    <h3 className="text-2xl font-bubblegum text-pop mb-3">Instant Magic</h3>
                    <p className="text-lg text-slate-600 leading-relaxed">
                        No more waiting! Generate stories and comic strips instantly to keep the adventure going.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-10 text-center"
            >
                <h2 className="text-3xl font-bubblegum text-primary mb-4">Join the Adventure</h2>
                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                    Whether it's a journey through the stars or a lesson in the jungle, BrainBloom AI is here to make every bedtime special.
                </p>
            </motion.div>
        </div>
    )
}
