'use client';

import { useRef, useEffect, useState } from 'react';

export default function FaqItem({ id, question, answer, isOpen, onToggle }) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState(0);
    const [fadeIn, setFadeIn] = useState(false);
    const [plainAnswer, setPlainAnswer] = useState(''); // new: for safe text rendering

    // Animate height + fade
    useEffect(() => {
        if (isOpen && contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
            setTimeout(() => setFadeIn(true), 30);
        } else {
            setFadeIn(false);
            setHeight(0);
        }
    }, [isOpen]);

    // Strip HTML tags safely (client-side only) to avoid hydration mismatch
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const doc = new DOMParser().parseFromString(answer, 'text/html');
            setPlainAnswer(doc.body.textContent || '');
        }
    }, [answer]);

    return (
        <div className="overflow-hidden cursor-pointer">
            <div
                className="rounded-xl px-lg py-md bg-tertiary-400 text-primary-600 text-xl font-semibold"
                onClick={onToggle}
            >
                {question}
            </div>

            <div
                className="transition-all duration-300 ease-in-out overflow-hidden text-neutral-300"
                style={{ maxHeight: `${height}px` }}
            >
                <div
                    ref={contentRef}
                    className={`px-lg py-md transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
                >
                    {plainAnswer}
                </div>
            </div>
        </div>
    );
}