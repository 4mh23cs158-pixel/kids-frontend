import React from 'react'
import { twMerge } from 'tailwind-merge'

export function Input({ label, error, className, ...props }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="font-bubblegum text-primary-dark text-xl px-2">{label}</label>}
            <input
                className={twMerge(
                    'px-6 py-4 rounded-2xl bg-white border-2 border-primary-light/30 focus:border-primary outline-none transition-colors font-quicksand text-lg placeholder:text-slate-400 shadow-inner',
                    className
                )}
                {...props}
            />
            {error && <span className="text-red-400 text-sm px-2 font-quicksand">{error}</span>}
        </div>
    )
}
