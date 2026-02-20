import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { getStories, deleteStory } from '../utils/storyHistory'
import { BookOpen, Trash2, Clock, Sparkles, ChevronDown, ChevronUp, Image as ImageIcon, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer'

export default function MyStoriesPage() {
    const [stories, setStories] = useState([])
    const [expandedId, setExpandedId] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        setStories(getStories())
    }, [])

    const handleDelete = (id) => {
        deleteStory(id)
        setStories(prev => prev.filter(s => s.id !== id))
    }

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id)
    }

    const formatDate = (iso) => {
        const d = new Date(iso)
        return d.toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        })
    }

    // Theme-based emoji mapping
    const getThemeEmoji = (theme) => {
        const t = theme?.toLowerCase() || ''
        if (t.includes('space')) return '🚀'
        if (t.includes('ocean') || t.includes('sea')) return '🌊'
        if (t.includes('forest') || t.includes('jungle')) return '🌲'
        if (t.includes('magic') || t.includes('wizard')) return '🪄'
        if (t.includes('dragon')) return '🐉'
        if (t.includes('princess') || t.includes('castle')) return '🏰'
        if (t.includes('animal')) return '🦁'
        if (t.includes('robot') || t.includes('tech')) return '🤖'
        if (t.includes('pirate')) return '🏴‍☠️'
        if (t.includes('fairy')) return '🧚'
        return '📖'
    }

    return (
        <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <h1 className="text-5xl font-bubblegum text-primary mb-3">📚 My Story Library</h1>
                <p className="text-lg text-slate-500 font-quicksand font-semibold">
                    All your magical adventures in one place
                </p>
            </motion.div>

            {/* Empty State */}
            {stories.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-32 text-slate-400 gap-8"
                >
                    <div className="relative">
                        <div className="text-9xl opacity-10">📚</div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30 blur-sm">✨</div>
                    </div>
                    <div className="text-center">
                        <p className="font-bubblegum text-4xl mb-3 text-slate-500">No Stories Yet!</p>
                        <p className="font-quicksand text-xl font-semibold opacity-70 mb-6">
                            Your magical adventures will appear here once you create them.
                        </p>
                        <Button onClick={() => navigate('/generator')} className="text-xl px-10 py-4">
                            <Sparkles className="mr-2" /> Create Your First Story
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Story Cards */}
            <div className="space-y-6">
                <AnimatePresence>
                    {stories.map((entry, index) => (
                        <motion.div
                            key={entry.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="bg-white/90 backdrop-blur-md shadow-xl border-none hover:shadow-2xl transition-all overflow-hidden">
                                {/* Card Header — Always visible */}
                                <div
                                    className="flex items-center gap-4 cursor-pointer"
                                    onClick={() => toggleExpand(entry.id)}
                                >
                                    <div className="text-4xl flex-shrink-0">{getThemeEmoji(entry.theme)}</div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-2xl font-bubblegum text-primary truncate">
                                            {entry.name}'s Adventure
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500 font-quicksand font-semibold">
                                            <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full">{entry.theme}</span>
                                            <span className="bg-secondary/10 text-secondary px-3 py-0.5 rounded-full">{entry.moral}</span>
                                            <span className="flex items-center gap-1 text-slate-400">
                                                <Clock size={14} /> {formatDate(entry.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(entry.id) }}
                                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                                            title="Delete story"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                        {expandedId === entry.id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedId === entry.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="mt-6 pt-6 border-t border-slate-100">
                                                {/* Story Text */}
                                                <div className="mb-6">
                                                    <h4 className="font-bubblegum text-xl text-primary mb-3 flex items-center gap-2">
                                                        <BookOpen size={20} /> The Story
                                                    </h4>
                                                    <div className="prose prose-slate max-w-none prose-p:text-base prose-p:leading-relaxed prose-p:text-slate-700 prose-p:font-quicksand">
                                                        <MarkdownRenderer content={entry.story} />
                                                    </div>
                                                </div>

                                                {/* Comic Panels */}
                                                {entry.panels && entry.panels.length > 0 && (
                                                    <div>
                                                        <h4 className="font-bubblegum text-xl text-secondary mb-3 flex items-center gap-2">
                                                            <ImageIcon size={20} /> Comic Strip
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {entry.panels.map((panel, idx) => (
                                                                <div key={idx} className="rounded-2xl overflow-hidden border-2 border-secondary/20">
                                                                    <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                                                                        <img
                                                                            src={panel.image_url}
                                                                            alt={`Scene ${idx + 1}`}
                                                                            className="w-full h-full object-cover"
                                                                            onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Scene+' + (idx + 1)}
                                                                        />
                                                                    </div>
                                                                    <div className="p-3 bg-white/50 border-t border-secondary/10">
                                                                        <p className="font-quicksand font-bold text-slate-600 text-sm italic">
                                                                            Scene {idx + 1}: {panel.text}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
