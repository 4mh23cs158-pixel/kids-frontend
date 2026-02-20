import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Select } from '../components/ui/Select'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { generateComic, logout, isAuthenticated } from '../utils/storyGenerator'
import { saveStory } from '../utils/storyHistory'
import { getRandomStoryData } from '../utils/randomGen'
import { ArrowLeft, Wand2, Sparkles, Share2, Printer, LogOut, Video, Camera, Image as ImageIcon, UserX } from 'lucide-react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { MarkdownRenderer } from '../components/ui/MarkdownRenderer'

export default function GeneratorPage() {
    const [formData, setFormData] = useState({
        name: '',
        age: '5',
        theme: 'Space Adventure',
        moral: 'Kindness is magic',
        language: 'English'
    })

    const [loading, setLoading] = useState(false)
    const [story, setStory] = useState(null)
    const [comicPanels, setComicPanels] = useState(null)
    const [error, setError] = useState('')
    const isGuest = !isAuthenticated()

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (location.state?.surprise) {
            handleSurpriseAuto()
        }
    }, [location.state])

    const handleSurpriseAuto = () => {
        const randomData = getRandomStoryData()
        setFormData(randomData)
        // Auto trigger generation
        setTimeout(() => {
            handleGenerate()
        }, 100)
    }

    const handleSurprise = () => {
        const randomData = getRandomStoryData()
        setFormData(randomData)
    }

    // ✅ Generate Story + Comic Together
    const handleGenerate = async (e) => {
        if (e) e.preventDefault()

        setLoading(true)
        setStory(null)
        setComicPanels(null)
        setError('')

        try {
            // Call backend route that generates BOTH story + panels
            const result = await generateComic({
                ...formData,
                age: parseInt(formData.age)
            })

            setStory(result.story)
            setComicPanels(result.panels)

            // 📚 Auto-save story to history ONLY if logged in
            if (isAuthenticated()) {
                saveStory({
                    ...formData,
                    story: result.story,
                    panels: result.panels
                })
            }

        } catch (err) {
            setError(err.response?.data?.detail || 'The magic failed! Please try again.')
            setTimeout(() => setError(''), 5000)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    // 🖨️ Save as PDF using a styled print window
    const handleSavePDF = () => {
        const comicHTML = comicPanels
            ? comicPanels.map((panel, idx) => `
                <div style="break-inside:avoid; border:2px solid #4ECDC4; border-radius:16px; overflow:hidden; background:#fff;">
                    <img src="${panel.image_url}" alt="Scene ${idx + 1}" style="width:100%; display:block;" crossorigin="anonymous" />
                    <div style="padding:12px 16px; font-size:13px; color:#334155; font-style:italic; border-top:2px solid #e2e8f0;">
                        <strong>Scene ${idx + 1}:</strong> ${panel.text}
                    </div>
                </div>
            `).join('')
            : ''

        const printWindow = window.open('', '_blank')
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>${formData.name}'s Adventure - BrainBloom AI</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Bubblegum+Sans&family=Quicksand:wght@400;600;700&display=swap');
                    * { margin: 0; padding: 0; box-sizing: border-box; }
                    body {
                        font-family: 'Quicksand', sans-serif;
                        color: #1e293b;
                        padding: 40px;
                        background: #fff;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 32px;
                        padding-bottom: 24px;
                        border-bottom: 3px solid #FF6B9D;
                    }
                    .header h1 {
                        font-family: 'Bubblegum Sans', cursive;
                        font-size: 36px;
                        color: #FF6B9D;
                        margin-bottom: 8px;
                    }
                    .header p {
                        font-size: 14px;
                        color: #94a3b8;
                    }
                    .story-section {
                        margin-bottom: 40px;
                        padding: 28px;
                        border: 2px solid #f1f5f9;
                        border-radius: 20px;
                        background: #fafafa;
                    }
                    .story-section h2 {
                        font-family: 'Bubblegum Sans', cursive;
                        font-size: 28px;
                        color: #FF6B9D;
                        margin-bottom: 16px;
                    }
                    .story-text {
                        font-size: 16px;
                        line-height: 1.8;
                        color: #334155;
                        white-space: pre-wrap;
                    }
                    .story-text::first-letter {
                        font-family: 'Bubblegum Sans', cursive;
                        font-size: 48px;
                        color: #FF6B9D;
                        float: left;
                        margin-right: 8px;
                        line-height: 1;
                    }
                    .comic-header {
                        font-family: 'Bubblegum Sans', cursive;
                        font-size: 28px;
                        color: #4ECDC4;
                        margin-bottom: 20px;
                        display: flex;
                        align-items: center;
                        gap: 12px;
                    }
                    .comic-grid {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 20px;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 2px solid #f1f5f9;
                        font-size: 12px;
                        color: #94a3b8;
                    }
                    @media print {
                        body { padding: 20px; }
                        .comic-grid { gap: 12px; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>✨ ${formData.name}'s Adventure ✨</h1>
                    <p>Generated by BrainBloom AI • Theme: ${formData.theme} • Moral: ${formData.moral}</p>
                </div>

                <div class="story-section">
                    <h2>📖 The Story</h2>
                    <div class="story-text">${story}</div>
                </div>

                ${comicHTML ? `
                    <div>
                        <div class="comic-header">🎨 Comic Strip Blast!</div>
                        <div class="comic-grid">${comicHTML}</div>
                    </div>
                ` : ''}

                <div class="footer">
                    Made with ❤️ by BrainBloom AI | Age: ${formData.age} | Language: ${formData.language}
                </div>
            </body>
            </html>
        `)
        printWindow.document.close()

        // Wait for images to load before printing
        const images = printWindow.document.querySelectorAll('img')
        let loaded = 0
        const total = images.length

        if (total === 0) {
            printWindow.focus()
            printWindow.print()
            return
        }

        images.forEach(img => {
            img.onload = img.onerror = () => {
                loaded++
                if (loaded >= total) {
                    printWindow.focus()
                    printWindow.print()
                }
            }
        })
    }

    return (
        <div className="min-h-screen py-10 px-4 max-w-7xl mx-auto">
            {/* Guest Mode Banner */}
            {isGuest && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 flex items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3">
                        <UserX className="text-amber-500 flex-shrink-0" size={22} />
                        <p className="font-quicksand font-semibold text-amber-700 text-sm">
                            You're in <strong>guest mode</strong> — stories won't be saved.{' '}
                            <Link to="/login" className="text-primary font-bold hover:underline">Log in</Link> or{' '}
                            <Link to="/signup" className="text-secondary font-bold hover:underline">Sign up</Link> to save your adventures!
                        </p>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                {/* Input Section */}
                <div className="lg:col-span-4 sticky top-24">
                    <Card className="flex flex-col gap-6 shadow-2xl border-primary/10">
                        <div className="flex justify-between items-center">
                            <h2 className="text-3xl font-bubblegum text-primary">Adventure Setup</h2>
                            <button
                                onClick={handleSurprise}
                                className="text-secondary hover:text-secondary-dark p-2 rounded-full hover:bg-secondary/10 transition-all"
                                title="Surprise Me!"
                            >
                                <Sparkles size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleGenerate} className="flex flex-col gap-4">
                            <Input
                                label="Hero Name"
                                placeholder="e.g. Kai, River, Nova"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                            <div className="grid grid-cols-2 gap-4">
                                <Select
                                    label="Age"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    options={[
                                        { value: '4', label: '3-5' },
                                        { value: '8', label: '6-12' },
                                        { value: '14', label: '13+' }
                                    ]}
                                />
                                <Select
                                    label="Language"
                                    value={formData.language}
                                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                    options={[
                                        { value: 'English', label: '🇬🇧 English' },
                                        { value: 'Spanish', label: '🇪🇸 Spanish' },
                                        { value: 'French', label: '🇫🇷 French' },
                                        { value: 'Hindi', label: '🇮🇳 Hindi' },
                                        { value: 'German', label: '🇩🇪 German' },
                                        { value: 'Portuguese', label: '🇵🇹 Portuguese' },
                                        { value: 'Italian', label: '🇮🇹 Italian' },
                                        { value: 'Japanese', label: '🇯🇵 Japanese' },
                                        { value: 'Korean', label: '🇰🇷 Korean' },
                                        { value: 'Chinese', label: '🇨🇳 Chinese' },
                                        { value: 'Arabic', label: '🇸🇦 Arabic' },
                                        { value: 'Russian', label: '🇷🇺 Russian' },
                                        { value: 'Tamil', label: '🇮🇳 Tamil' },
                                        { value: 'Telugu', label: '🇮🇳 Telugu' },
                                        { value: 'Kannada', label: '🇮🇳 Kannada' },
                                        { value: 'Bengali', label: '🇮🇳 Bengali' },
                                        { value: 'Marathi', label: '🇮🇳 Marathi' },
                                        { value: 'Urdu', label: '🇵🇰 Urdu' }
                                    ]}
                                />
                            </div>
                            <Select
                                label="Story Theme"
                                value={formData.theme}
                                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                                options={[
                                    { value: 'Space Adventure', label: '🚀 Space Adventure' },
                                    { value: 'Magical Forest', label: '🌲 Magical Forest' },
                                    { value: 'Underwater Kingdom', label: '🌊 Underwater Kingdom' },
                                    { value: 'Dinosaur Island', label: '🦕 Dinosaur Island' },
                                    { value: 'Superpower School', label: '⚡ Superpower School' },
                                    { value: 'Robot City', label: '🤖 Robot City' },
                                    { value: 'Time Travel Quest', label: '⏰ Time Travel Quest' },
                                    { value: 'Talking Animals Garden', label: '🦁 Talking Animals Garden' },
                                    { value: 'Secret Ice Kingdom', label: '❄️ Secret Ice Kingdom' },
                                    { value: 'Dragon Flying School', label: '🐉 Dragon Flying School' },
                                    { value: 'Pirate Treasure Hunt', label: '🏴‍☠️ Pirate Treasure Hunt' },
                                    { value: 'Fairy Tale Land', label: '🧚 Fairy Tale Land' }
                                ]}
                            />
                            <Select
                                label="Moral"
                                value={formData.moral}
                                onChange={(e) => setFormData({ ...formData, moral: e.target.value })}
                                options={[
                                    { value: 'Kindness is magic', label: '💖 Kindness is magic' },
                                    { value: 'Teamwork makes the dream work', label: '🤝 Teamwork makes the dream work' },
                                    { value: 'Honesty is the best policy', label: '✅ Honesty is the best policy' },
                                    { value: 'Believe in yourself', label: '🌟 Believe in yourself' },
                                    { value: 'Sharing is caring', label: '🎁 Sharing is caring' },
                                    { value: 'Patience is a virtue', label: '⏳ Patience is a virtue' },
                                    { value: 'Courage to be different', label: '🦋 Courage to be different' },
                                    { value: 'Never give up', label: '💪 Never give up' },
                                    { value: 'Respect nature', label: '🌿 Respect nature' },
                                    { value: 'Curiosity leads to discovery', label: '🔍 Curiosity leads to discovery' }
                                ]}
                            />

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full text-xl py-4 flex items-center justify-center gap-2 mt-2 shadow-lg"
                            >
                                <Wand2 /> {loading ? 'Casting Spell...' : 'Generate Magic!'}
                            </Button>
                        </form>
                    </Card>
                </div>

                {/* Output Section */}
                <div className="lg:col-span-8">
                    <AnimatePresence mode="wait">
                        {loading && (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-20"
                            >
                                <div className="glass-card p-12 text-center">
                                    <LoadingSpinner />
                                    <p className="mt-6 font-bubblegum text-2xl text-primary animate-pulse">Mixing Fairy Dust...</p>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-50 text-red-500 p-8 rounded-[2rem] border-2 border-red-100 flex items-center gap-6 mb-8 shadow-xl"
                            >
                                <div className="text-5xl">😵</div>
                                <div>
                                    <h4 className="font-bubblegum text-2xl mb-1">Oh No!</h4>
                                    <p className="font-semibold text-lg">{error}</p>
                                </div>
                            </motion.div>
                        )}

                        {story && !loading && (
                            <motion.div
                                key="result"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="space-y-8"
                            >
                                {/* Story Card */}
                                <Card className="bg-white/90 backdrop-blur-md border-none shadow-2xl relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-primary"><Share2 size={20} /></button>
                                    </div>
                                    <h3 className="text-4xl font-bubblegum text-primary mb-6">✨ {formData.name}'s Adventure</h3>
                                    <div className="prose prose-slate max-w-none prose-p:text-xl prose-p:leading-relaxed prose-p:text-slate-700 prose-p:font-quicksand">
                                        <MarkdownRenderer content={story} />
                                    </div>
                                </Card>

                                {/* Comic Strip Section */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <ImageIcon className="text-secondary" size={32} />
                                        <h3 className="text-3xl font-bubblegum text-secondary">Comic Strip Blast!</h3>
                                    </div>

                                    {comicPanels ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {comicPanels.map((panel, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="glass-card overflow-hidden border-2 border-secondary/20 hover:border-secondary transition-all"
                                                >
                                                    <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center relative overflow-hidden">
                                                        <img
                                                            src={panel.image_url}
                                                            alt={`Scene ${idx + 1}`}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=Magic+Coming+Soon'}
                                                        />
                                                    </div>
                                                    <div className="p-4 bg-white/50 backdrop-blur-sm border-t border-secondary/10">
                                                        <p className="font-quicksand font-bold text-slate-600 text-sm italic">
                                                            Scene {idx + 1}: {panel.text}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="glass-card p-12 text-center text-slate-400 border-dashed border-slate-200">
                                            <p className="font-quicksand text-lg">Your comic panels will appear here once the magic happens!</p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-center gap-4 py-8">
                                    <Button onClick={() => setStory(null)} className="bg-secondary hover:bg-secondary-dark text-xl px-10 py-5">
                                        End This Adventure
                                    </Button>
                                    <button
                                        onClick={handleSavePDF}
                                        className="flex items-center gap-2 bg-accent/10 text-accent-dark px-8 py-4 rounded-full font-bold hover:bg-accent/20 transition-all border-2 border-accent/20"
                                    >
                                        <Printer /> Save PDF
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {!loading && !story && !error && (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center h-full text-slate-400 gap-8 py-32"
                            >
                                <div className="relative">
                                    <div className="text-9xl opacity-10 animate-float">📚</div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30 blur-sm">✨</div>
                                </div>
                                <div className="text-center">
                                    <p className="font-bubblegum text-4xl mb-3 text-slate-500">Ready for Magic?</p>
                                    <p className="font-quicksand text-xl font-semibold opacity-70">Fill out the form or hit "Surprise Me" to start!</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
