import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Layout, Eye, EyeOff, Smartphone, Palette } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { backgrounds } from '../constants/backgrounds';

const ActionMenu = ({
    onDownload,
    onShuffle,
    onToggleCamera,
    isCameraVisible,
    onConnectPhone,
    currentBg,
    onSelectBg
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showBgPicker, setShowBgPicker] = useState(false);
    const { t } = useLanguage();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isOpen) setShowBgPicker(false); // Reset sub-menu on close
    };

    const menuVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 }
    };

    return (
        <div className="absolute top-8 left-8 z-50 flex flex-col gap-4" data-html2canvas-ignore="true">
            <button
                onClick={toggleMenu}
                className="bg-stone-800 text-white w-12 h-12 rounded-full shadow-lg hover:bg-stone-700 transition-colors flex items-center justify-center"
                title={isOpen ? "Close Menu" : "Open Menu"}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={menuVariants}
                        className="flex flex-col gap-3 items-start"
                    >
                        <motion.button
                            variants={itemVariants}
                            onClick={() => { onDownload(); toggleMenu(); }}
                            className="bg-white text-stone-800 px-4 py-2 rounded-full shadow-lg hover:bg-stone-100 transition-colors flex items-center gap-2 font-['Patrick_Hand'] whitespace-nowrap"
                            title={t('action.download_wall')}
                        >
                            <Download size={18} />
                            <span className="hidden md:inline">{t('action.download_wall')}</span>
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            onClick={() => { onShuffle(); toggleMenu(); }}
                            className="bg-white text-stone-800 px-4 py-2 rounded-full shadow-lg hover:bg-stone-100 transition-colors flex items-center gap-2 font-['Patrick_Hand'] whitespace-nowrap"
                            title={t('action.shuffle')}
                        >
                            <Layout size={18} />
                            <span className="hidden md:inline">{t('action.shuffle')}</span>
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            onClick={() => { onToggleCamera(); toggleMenu(); }}
                            className="bg-white text-stone-800 px-4 py-2 rounded-full shadow-lg hover:bg-stone-100 transition-colors flex items-center gap-2 font-['Patrick_Hand'] whitespace-nowrap"
                            title={isCameraVisible ? t('action.hide_camera') : t('action.show_camera')}
                        >
                            {isCameraVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                            <span className="hidden md:inline">{isCameraVisible ? t('action.hide_camera') : t('action.show_camera')}</span>
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            onClick={() => { onConnectPhone(); toggleMenu(); }}
                            className="hidden md:flex bg-white text-stone-800 px-4 py-2 rounded-full shadow-lg hover:bg-stone-100 transition-colors items-center gap-2 font-['Patrick_Hand'] whitespace-nowrap"
                            title={t('action.connect_phone')}
                        >
                            <Smartphone size={18} />
                            <span className="hidden md:inline">{t('action.connect_phone')}</span>
                        </motion.button>

                        {/* Background Selector Toggle */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-2">
                            <button
                                onClick={() => setShowBgPicker(!showBgPicker)}
                                className={`bg-white text-stone-800 px-4 py-2 rounded-full shadow-lg hover:bg-stone-100 transition-colors flex items-center gap-2 font-['Patrick_Hand'] whitespace-nowrap ${showBgPicker ? 'bg-stone-100 ring-2 ring-stone-200' : ''}`}
                                title="Change Background"
                            >
                                <Palette size={18} />
                                <span className="hidden md:inline">{t('action.background')}</span>
                            </button>

                            {/* Background Grid */}
                            <AnimatePresence>
                                {showBgPicker && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-white p-3 rounded-xl shadow-xl grid grid-cols-3 gap-2 w-[180px] max-h-[300px] overflow-y-auto"
                                    >
                                        {backgrounds.map((bg) => (
                                            <button
                                                key={bg.id}
                                                onClick={() => {
                                                    onSelectBg(bg.class);
                                                    // toggleMenu(); // Optional: close menu on select
                                                }}
                                                className={`w-10 h-10 rounded-lg border-2 shadow-sm transition-all hover:scale-105 relative overflow-hidden ${currentBg === bg.class ? 'border-stone-800 ring-2 ring-stone-200' : 'border-stone-200'} ${bg.class === 'bg-pattern-grid' ? 'bg-stone-100' : bg.class}`}
                                                style={bg.style}
                                                title={bg.name}
                                            />
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ActionMenu;
