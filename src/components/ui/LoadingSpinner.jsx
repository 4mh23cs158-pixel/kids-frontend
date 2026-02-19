import React from 'react'
import { motion } from 'framer-motion'

export function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center p-8 gap-4">
            <div className="relative w-20 h-20">
                <motion.div
                    animate={{
                        rotate: 360,
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                        scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
                    }}
                    className="w-full h-full border-4 border-dotted border-primary rounded-full"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center text-4xl"
                >
                    ✨
                </motion.div>
            </div>
            <p className="font-bubblegum text-2xl text-primary animate-pulse">Sprinkling magic dust...</p>
        </div>
    )
}
