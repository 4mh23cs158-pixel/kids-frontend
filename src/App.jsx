import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import GeneratorPage from './pages/GeneratorPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AboutPage from './pages/AboutPage'
import MyStoriesPage from './pages/MyStoriesPage'
import ProfilePage from './pages/ProfilePage'
import Navbar from './components/ui/Navbar'
import { isAuthenticated } from './utils/storyGenerator'

function AuthGuard({ children }) {
    return isAuthenticated() ? children : <Navigate to="/login" />
}

function App() {
    return (
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <div className="relative min-h-screen font-quicksand text-slate-800 pt-20">
                {/* Background Shapes */}
                <div className="shape w-96 h-96 bg-primary/20 top-[-10%] left-[-10%]" />
                <div className="shape w-80 h-80 bg-secondary/20 bottom-[-5%] right-[-5%] transition-all duration-1000" style={{ animationDelay: '2s' }} />
                <div className="shape w-64 h-64 bg-accent/20 top-[40%] right-[10%] transition-all duration-1000" style={{ animationDelay: '4s' }} />

                <Navbar />

                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/generator" element={<GeneratorPage />} />
                    <Route
                        path="/my-stories"
                        element={
                            <AuthGuard>
                                <MyStoriesPage />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <AuthGuard>
                                <ProfilePage />
                            </AuthGuard>
                        }
                    />
                </Routes>
            </div>
        </Router >
    )
}

export default App
