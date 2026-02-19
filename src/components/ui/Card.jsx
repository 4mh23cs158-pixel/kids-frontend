import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function Card({ children, className, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            className={twMerge(
                'bg-white/80 backdrop-blur-md border border-white/40 rounded-[2.5rem] p-8 shadow-xl',
                className
            )}
        >
            {children}
        </motion.div>
    )
}
