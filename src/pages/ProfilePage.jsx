import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { getStories } from '../utils/storyHistory'
import { isAuthenticated } from '../utils/storyGenerator'
import {
    User, Mail, Calendar, BookOpen,
    Sparkles, Flame, Trophy, Palette,
    Camera, LogOut, Trash2, Download
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ProfilePage() {
    const navigate = useNavigate()
    const isAuth = isAuthenticated()

    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('user_profile')
        return saved ? JSON.parse(saved) : {
            name: 'Magic Weaver',
            email: 'weaver@brainbloom.ai',
            avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=bloom',
            createdAt: '2024-05-20',
            themePreference: 'Magical Forest',
            streak: 5
        }
    })

    const [isEditing, setIsEditing] = useState(false)
    const [newName, setNewName] = useState(user.name)

    const [stats, setStats] = useState({
        totalGenerated: 0,
        savedStories: 0
    })

    const history = getStories()

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
            return
        }

        setStats({
            totalGenerated: parseInt(localStorage.getItem('total_stories_generated') || '0'),
            savedStories: history.length
        })
    }, [isAuth, navigate, history.length])

    const handleSaveName = () => {
        const updatedUser = { ...user, name: newName }
        setUser(updatedUser)
        localStorage.setItem('user_profile', JSON.stringify(updatedUser))
        setIsEditing(false)
    }

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const updatedUser = { ...user, avatar: reader.result }
                setUser(updatedUser)
                localStorage.setItem('user_profile', JSON.stringify(updatedUser))
            }
            reader.readAsDataURL(file)
        }
    }

    const achievements = [
        { id: 1, name: 'First Words', icon: '📝', desc: 'Generate your first story' },
        { id: 2, name: 'Comic King', icon: '👑', desc: 'Create 10 comic strips' },
        { id: 3, name: 'Streak Starter', icon: '🔥', desc: '3 day reading streak' }
    ]

    return (
        <div className="min-h-screen py-10 px-4 max-w-5xl mx-auto pt-28">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Sidebar - Profile Card */}
                <div className="lg:col-span-4">
                    <Card className="text-center p-8 bg-white/80 backdrop-blur-md border-none shadow-2xl sticky top-28">
                        <div className="relative inline-block mb-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 p-1 bg-white mx-auto">
                                <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full" />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:rotate-12 transition-transform">
                                <Camera size={16} />
                            </button>
                        </div>

                        {isEditing ? (
                            <div className="flex flex-col gap-2 mb-4">
                                <Input
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="text-center font-bubblegum text-xl"
                                    placeholder="Enter new name"
                                />
                                <div className="flex gap-2 justify-center">
                                    <Button onClick={handleSaveName} className="px-4 py-1 text-sm">Save</Button>
                                    <Button onClick={() => setIsEditing(false)} variant="outline" className="px-4 py-1 text-sm">Cancel</Button>
                                </div>
                            </div>
                        ) : (
                            <h2 className="text-3xl font-bubblegum text-primary mb-1">{user.name}</h2>
                        )}
                        <p className="text-slate-500 font-quicksand font-bold flex items-center justify-center gap-2 mb-6">
                            <Mail size={16} /> {user.email}
                        </p>

                        <div className="space-y-3">
                            <Button
                                variant="outline"
                                onClick={() => { setIsEditing(true); setNewName(user.name); }}
                                className="w-full border-2 border-primary/20 text-primary hover:bg-primary/5"
                            >
                                Edit Name
                            </Button>
                            <input
                                type="file"
                                id="avatar-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                            />
                            <Button
                                variant="ghost"
                                onClick={() => document.getElementById('avatar-upload').click()}
                                className="w-full text-secondary hover:bg-secondary/5"
                            >
                                <Camera size={18} className="mr-2" /> Change Photo
                            </Button>
                            <Button variant="ghost" onClick={() => { localStorage.removeItem('token'); navigate('/') }} className="w-full text-slate-400 hover:text-red-500">
                                <LogOut size={18} className="mr-2" /> Logout
                            </Button>
                        </div>

                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4 text-left">
                            <div className="flex items-center gap-3 text-slate-600">
                                <Calendar size={18} className="text-primary" />
                                <span className="font-quicksand font-bold">Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                                <Palette size={18} className="text-secondary" />
                                <span className="font-quicksand font-bold">Theme: {user.themePreference}</span>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Content - Stats & Achievements */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        {[
                            { label: 'Total Stories', value: stats.totalGenerated, icon: <Sparkles className="text-primary" />, color: 'bg-primary/10' },
                            { label: 'Saved Library', value: stats.savedStories, icon: <BookOpen className="text-secondary" />, color: 'bg-secondary/10' },
                            { label: 'Reading Streak', value: `${user.streak} Days`, icon: <Flame className="text-orange-500" />, color: 'bg-orange-50' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="glass-card p-6 flex flex-col items-center justify-center gap-2 border-none"
                            >
                                <div className={`${stat.color} p-3 rounded-2xl mb-2`}>
                                    {stat.icon}
                                </div>
                                <span className="text-3xl font-bubblegum text-slate-700">{stat.value}</span>
                                <span className="text-xs font-quicksand font-bold text-slate-400 uppercase tracking-wider">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Achievements */}
                    <Card className="bg-white/80 border-none shadow-xl p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Trophy className="text-yellow-500" size={28} />
                            <h3 className="text-2xl font-bubblegum text-slate-700">Adventure Badges</h3>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {achievements.map((ach) => (
                                <div key={ach.id} className="group relative">
                                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center text-4xl shadow-inner border-2 border-slate-100 hover:border-primary transition-all cursor-pointer">
                                        {ach.icon}
                                    </div>
                                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-32 bg-slate-800 text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                                        <strong>{ach.name}</strong><br />{ach.desc}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Settings & Danger Zone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="p-6 bg-white/80 border-none shadow-xl flex flex-col justify-between">
                            <h4 className="font-bubblegum text-xl text-slate-700 mb-4">Export Data</h4>
                            <p className="text-sm text-slate-500 mb-6 font-quicksand font-bold">Download your entire story library as a collection.</p>
                            <Button className="w-full">
                                <Download size={18} className="mr-2" /> Download History
                            </Button>
                        </Card>
                        <Card className="p-6 bg-red-50/30 border-2 border-red-50 shadow-none flex flex-col justify-between">
                            <h4 className="font-bubblegum text-xl text-red-500 mb-4">Danger Zone</h4>
                            <p className="text-sm text-red-400 mb-6 font-quicksand font-bold">Once you delete your account, all your stories will be lost!</p>
                            <button className="text-red-500 font-bold hover:underline flex items-center gap-2">
                                <Trash2 size={18} /> Delete Account
                            </button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
