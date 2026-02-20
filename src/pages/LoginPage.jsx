import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { login, isAuthenticated } from '../utils/storyGenerator'
import { LogIn, Sparkles } from 'lucide-react'

export default function LoginPage() {
    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await login(identifier, password)
            navigate('/')
        } catch (err) {
            setError(err.response?.data?.detail || 'Login failed. Try again!')
            // Auto-clear error after 3 seconds
            setTimeout(() => setError(''), 3000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 hero-gradient">
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🔑</div>
                    <h2 className="text-4xl font-bubblegum text-pop">Welcome Back!</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <Input
                        label="Email or Username"
                        placeholder="SuperHero123"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                    <Input
                        label="Magic Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 text-red-500 p-3 rounded-xl text-center font-semibold"
                        >
                            {error}
                        </motion.div>
                    )}

                    <Button type="submit" disabled={loading} className="w-full text-2xl py-4 flex items-center justify-center gap-2">
                        {loading ? 'Opening Portal...' : <><LogIn /> Log In</>}
                    </Button>
                </form>

                <p className="text-center mt-6 text-slate-600">
                    New adventurer? <Link to="/signup" className="text-primary font-bold hover:underline">Create an account!</Link>
                </p>
                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                    <div className="relative flex justify-center"><span className="bg-white px-4 text-sm text-slate-400 font-semibold">or</span></div>
                </div>
                {!isAuthenticated() && (
                    <button
                        onClick={() => navigate('/generator')}
                        className="w-full py-3 rounded-2xl border-2 border-secondary/30 text-secondary font-bold font-quicksand text-lg hover:bg-secondary hover:text-white transition-all active:scale-95"
                    >
                        🚀 Continue as Guest
                    </button>
                )}
            </Card>
        </div>
    )
}
