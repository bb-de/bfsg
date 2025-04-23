import { useContext } from 'react';
import { AccessibilityContext } from '@/contexts/AccessibilityContext';
import type { AccessibilityProfile } from '@/types/accessibility';

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  
  return {
    accessibilityState: context.accessibilityState,
    toggleSetting: context.toggleSetting,
    updateSetting: context.updateSetting,
    applyProfile: context.applyProfile,
    resetSettings: context.resetSettings,
    applyAccessibilitySettings: context.applyAccessibilitySettings,
  };
};
