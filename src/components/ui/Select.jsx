import React from 'react'
import { twMerge } from 'tailwind-merge'

export function Select({ label, options, className, ...props }) {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label className="font-bubblegum text-primary-dark text-xl px-2">{label}</label>}
            <select
                className={twMerge(
                    'px-6 py-4 rounded-2xl bg-white border-2 border-primary-light/30 focus:border-primary outline-none transition-colors font-quicksand text-lg shadow-inner cursor-pointer appearance-none',
                    className
                )}
                {...props}
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    )
}
