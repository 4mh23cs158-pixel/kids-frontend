import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { signup } from '../utils/storyGenerator'
import { UserPlus } from 'lucide-react'

export default function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            await signup(formData)
            navigate('/generator')
        } catch (err) {
            setError(err.response?.data?.detail || 'Signup failed. Pick another name!')
            setTimeout(() => setError(''), 3000)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 hero-gradient py-10">
            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="text-5xl mb-4">🌟</div>
                    <h2 className="text-4xl font-bubblegum text-pop">Join the Adventure!</h2>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        label="Hero Name (Real Name)"
                        placeholder="Alex"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Super Secret Username"
                        placeholder="StarExplorer"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        required
                    />
                    <Input
                        label="Parent's Email"
                        type="email"
                        placeholder="parent@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        label="Magic Password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                    <Button type="submit" disabled={loading} className="w-full text-2xl py-4 flex items-center justify-center gap-2 mt-4">
                        {loading ? 'Joining...' : <><UserPlus /> Sign Up</>}
                    </Button>
                </form>

                <p className="text-center mt-6 text-slate-600">
                    Already part of the guild? <Link to="/login" className="text-primary font-bold hover:underline">Log in here!</Link>
                </p>
            </Card>
        </div>
    )
}
