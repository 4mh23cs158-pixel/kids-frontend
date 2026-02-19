import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Home, Info, LogIn, UserPlus, LogOut, BookOpen } from 'lucide-react'
import { isAuthenticated, logout } from '../../utils/storyGenerator'

export default function Navbar() {
    const navigate = useNavigate()
    const isAuth = isAuthenticated()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const navItems = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'About', path: '/about', icon: <Info size={18} /> },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className="max-w-6xl mx-auto flex items-center justify-between bg-white/80 backdrop-blur-lg px-8 py-3 rounded-full shadow-lg border border-white/40"
            >
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
                        <Sparkles className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bubblegum text-primary hidden sm:block">Story Magic</span>
                </Link>

                <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-6 mr-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className="flex items-center gap-2 font-quicksand font-bold text-slate-600 hover:text-primary transition-colors"
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="h-6 w-px bg-slate-200 hidden md:block"></div>

                    <div className="flex items-center gap-3">
                        {isAuth ? (
                            <>
                                <Link
                                    to="/generator"
                                    className="bg-primary text-white px-5 py-2 rounded-full font-bold hover:bg-primary-dark transition-all shadow-md active:scale-95"
                                >
                                    Create!
                                </Link>
                                <Link
                                    to="/my-stories"
                                    className="flex items-center gap-1 font-bold text-slate-600 hover:text-secondary px-3 py-2 transition-colors"
                                >
                                    <BookOpen size={18} />
                                    <span className="hidden sm:inline">My Stories</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                                >
                                    <LogOut size={22} />
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="font-bold text-slate-600 hover:text-primary px-3 py-2 flex items-center gap-1"
                                >
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to="/signup"
                                    className="bg-secondary text-white px-5 py-2 rounded-full font-bold hover:bg-secondary-dark transition-all shadow-md active:scale-95 flex items-center gap-1"
                                >
                                    <UserPlus size={18} />
                                    <span>Join</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        </nav>
    )
}
