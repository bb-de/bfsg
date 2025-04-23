import type { AccessibilitySettings } from '@/types/accessibility';

/**
 * Apply all current accessibility settings to the document
 */
export const applyAccessibilitySettings = (settings: AccessibilitySettings) => {
  // Reset all classes first
  document.body.classList.remove(
    'a11y-dark-contrast',
    'a11y-light-contrast',
    'a11y-monochrome',
    'a11y-high-saturation',
    'a11y-font-lg',
    'a11y-font-xl',
    'a11y-font-xxl',
    'a11y-line-spacing-md',
    'a11y-line-spacing-lg',
    'a11y-letter-spacing-md',
    'a11y-letter-spacing-lg',
    'a11y-reading-guide-active',
    'a11y-large-cursor'
  );
  
  // Apply contrast settings
  if (settings.darkContrast) {
    document.body.classList.add('a11y-dark-contrast');
  }
  
  if (settings.lightContrast) {
    document.body.classList.add('a11y-light-contrast');
  }
  
  // Apply color filter settings
  if (settings.monochrome) {
    document.body.classList.add('a11y-monochrome');
  }
  
  if (settings.highSaturation) {
    document.body.classList.add('a11y-high-saturation');
  }
  
  // Apply font size
  if (settings.fontSize === 'large') {
    document.body.classList.add('a11y-font-lg');
  } else if (settings.fontSize === 'xlarge') {
    document.body.classList.add('a11y-font-xl');
  } else if (settings.fontSize === 'xxlarge') {
    document.body.classList.add('a11y-font-xxl');
  }
  
  // Apply line spacing
  if (settings.lineSpacing === 'medium') {
    document.body.classList.add('a11y-line-spacing-md');
  } else if (settings.lineSpacing === 'large') {
    document.body.classList.add('a11y-line-spacing-lg');
  }
  
  // Apply letter spacing
  if (settings.letterSpacing === 'medium') {
    document.body.classList.add('a11y-letter-spacing-md');
  } else if (settings.letterSpacing === 'large') {
    document.body.classList.add('a11y-letter-spacing-lg');
  }
  
  // Apply reading guide
  if (settings.readingGuide) {
    document.body.classList.add('a11y-reading-guide-active');
    
    // Enable reading guide mouse tracking
    document.addEventListener('mousemove', handleReadingGuideMouseMove);
  } else {
    document.removeEventListener('mousemove', handleReadingGuideMouseMove);
  }
  
  // Handle reading mask (managed via the ReadingMask component)
  
  // Apply cursor size
  if (settings.largeCursor) {
    document.body.classList.add('a11y-large-cursor');
  }
};

/**
 * Save accessibility settings to localStorage
 */
export const saveAccessibilitySettings = (state: {
  settings: AccessibilitySettings;
  activeProfile: string | null;
}) => {
  try {
    localStorage.setItem('a11y-settings', JSON.stringify(state));
  } catch (err) {
    console.warn('Could not save accessibility settings:', err);
  }
};

/**
 * Load accessibility settings from localStorage
 */
export const loadAccessibilitySettings = () => {
  try {
    const savedData = localStorage.getItem('a11y-settings');
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (err) {
    console.warn('Could not load accessibility settings:', err);
  }
  return null;
};

/**
 * Reset accessibility settings to defaults
 */
export const getDefaultSettings = (): AccessibilitySettings => ({
  darkContrast: false,
  lightContrast: false,
  monochrome: false,
  highSaturation: false,
  fontSize: 'default',
  lineSpacing: 'default',
  letterSpacing: 'default',
  readingGuide: false,
  largeCursor: false,
  readingMask: false,
});

/**
 * Handle mouse movement for reading guide
 */
const handleReadingGuideMouseMove = (e: MouseEvent) => {
  const guide = document.querySelector('.a11y-reading-guide') as HTMLElement;
  if (guide) {
    guide.style.top = `${e.clientY}px`;
  }
};
