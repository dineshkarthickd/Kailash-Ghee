import React from 'react';

export const BotanicalDecoration = ({ position = 'left', className = '' }) => {
  // A beautiful, elegant SVG path of a botanical branch/leaves
  const baseClasses = "absolute pointer-events-none opacity-[0.15] z-0";
  
  const positionClasses = position === 'left' 
    ? "left-0 top-1/4 -translate-x-1/2 w-64 lg:w-96 text-muted"
    : position === 'right'
    ? "right-0 top-1/3 translate-x-1/3 w-64 lg:w-96 text-muted scale-x-[-1]"
    : position === 'bottom-left'
    ? "left-0 bottom-0 -translate-x-1/4 w-48 lg:w-72 text-accent-gold"
    : position === 'top-right'
    ? "right-0 top-0 translate-x-1/4 -translate-y-1/4 w-72 lg:w-[400px] text-accent-gold scale-x-[-1]"
    : "";

  return (
    <div className={`${baseClasses} ${positionClasses} ${className}`}>
      <svg viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
        <path d="M 100 600 Q 150 400 250 200 Q 300 100 350 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M 175 450 Q 100 420 80 350 Q 120 360 175 450" fill="currentColor" opacity="0.6"/>
        <path d="M 220 300 Q 150 250 120 180 Q 180 200 220 300" fill="currentColor" opacity="0.4"/>
        <path d="M 280 150 Q 220 100 190 50 Q 250 80 280 150" fill="currentColor" opacity="0.5"/>
        <path d="M 150 500 Q 250 480 300 400 Q 230 420 150 500" fill="currentColor" opacity="0.7"/>
        <path d="M 200 350 Q 300 320 350 250 Q 280 280 200 350" fill="currentColor" opacity="0.5"/>
        <path d="M 260 200 Q 350 160 380 100 Q 320 130 260 200" fill="currentColor" opacity="0.6"/>
      </svg>
    </div>
  );
};
