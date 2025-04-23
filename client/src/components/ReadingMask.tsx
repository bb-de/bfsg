import { useEffect, useRef } from 'react';
import { useAccessibility } from '@/hooks/useAccessibility';

const ReadingMask = () => {
  const { accessibilityState } = useAccessibility();
  const maskRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const holeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (holeRef.current) {
        // Position the hole directly at cursor position
        holeRef.current.style.top = `${e.clientY - 75}px`;
        holeRef.current.style.left = `${e.clientX - 150}px`;
      }
    };

    if (accessibilityState.settings.readingMask) {
      // Create mask if it doesn't exist
      if (!maskRef.current) {
        // Main overlay
        const mask = document.createElement('div');
        mask.className = 'reading-mask-overlay';
        document.body.appendChild(mask);
        
        // Create transparent hole that follows cursor
        const hole = document.createElement('div');
        hole.className = 'reading-mask-hole';
        hole.style.width = '300px';
        hole.style.height = '150px';
        hole.style.position = 'fixed';
        hole.style.backgroundColor = 'transparent';
        hole.style.borderRadius = '20px';
        hole.style.pointerEvents = 'none';
        hole.style.zIndex = '9999';
        hole.style.border = '2px solid rgba(255, 255, 255, 0.3)';
        hole.style.boxShadow = '0 0 0 2000px rgba(0, 0, 0, 0.75)';
        document.body.appendChild(hole);
        
        maskRef.current = mask;
        holeRef.current = hole;
        
        // Position hole initially in center of screen
        const rect = document.body.getBoundingClientRect();
        if (holeRef.current) {
          holeRef.current.style.top = `${rect.height / 2 - 75}px`;
          holeRef.current.style.left = `${rect.width / 2 - 150}px`;
        }
      }
      
      // Add mousemove event listener
      document.addEventListener('mousemove', handleMouseMove);
    } else {
      // Remove mask and hole if they exist
      if (maskRef.current) {
        document.removeEventListener('mousemove', handleMouseMove);
        maskRef.current.remove();
        maskRef.current = null;
      }
      
      if (holeRef.current) {
        holeRef.current.remove();
        holeRef.current = null;
      }
    }

    // Cleanup function
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (maskRef.current) {
        maskRef.current.remove();
      }
      if (holeRef.current) {
        holeRef.current.remove();
      }
    };
  }, [accessibilityState.settings.readingMask]);

  // This component doesn't render anything visible
  return null;
};

export default ReadingMask;