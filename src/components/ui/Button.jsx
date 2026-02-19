import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function Button({ children, className, ...props }) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={twMerge(
                'px-8 py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full font-bubblegum text-xl shadow-lg hover:shadow-primary/30 transition-shadow',
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    )
}
