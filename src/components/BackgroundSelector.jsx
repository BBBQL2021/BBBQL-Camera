import React, { useState } from 'react';
import { Palette, X } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { backgrounds } from '../constants/backgrounds';

const BackgroundSelector = ({ currentBg, onSelect }) => {
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="absolute top-20 right-8 z-50 flex flex-col items-end gap-2" data-html2canvas-ignore="true">
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors"
                title="Change Background"
            >
                {isOpen ? <X size={20} /> : <Palette size={20} />}
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="bg-white p-3 rounded-xl shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[80vh] overflow-y-auto">
                    <div className="text-xs font-bold text-stone-400 uppercase tracking-wider text-center">Background</div>
                    <div className="grid grid-cols-2 gap-2">
                        {backgrounds.map((bg) => (
                            <button
                                key={bg.id}
                                onClick={() => {
                                    onSelect(bg.class);
                                    // Optional: keep open or close? Let's keep open for exploration
                                }}
                                className={`w-12 h-12 rounded-lg border-2 shadow-sm transition-all hover:scale-105 relative overflow-hidden ${currentBg === bg.class ? 'border-stone-800 ring-2 ring-stone-200' : 'border-stone-200'
                                    } ${bg.class === 'bg-pattern-grid' ? 'bg-stone-100' : bg.class}`}
                                style={bg.style}
                                title={bg.name}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BackgroundSelector;
