import { useState, useEffect } from 'react';
import AccessibilityButton from './AccessibilityButton';
import AccessibilityPanel from './AccessibilityPanel';
import ReadingMask from './ReadingMask';
import { useAccessibility } from '@/hooks/useAccessibility';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { applyAccessibilitySettings } = useAccessibility();

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Alt+A to toggle widget
    if (e.altKey && e.key === 'a') {
      toggleWidget();
    }
    // ESC key to close widget
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Apply settings on component mount
  useEffect(() => {
    applyAccessibilitySettings();
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AccessibilityButton 
        toggleWidget={toggleWidget} 
        isOpen={isOpen} 
      />
      <AccessibilityPanel 
        isOpen={isOpen} 
        closePanel={() => setIsOpen(false)} 
      />

      {/* Reading Guide Element */}
      <div className="a11y-reading-guide" />
      
      {/* Reading Mask Component */}
      <ReadingMask />
    </div>
  );
};

export default AccessibilityWidget;
