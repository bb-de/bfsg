import { createContext, useState, useEffect, ReactNode } from 'react';
import { 
  applyAccessibilitySettings as applySettings, 
  saveAccessibilitySettings, 
  loadAccessibilitySettings, 
  getDefaultSettings 
} from '@/lib/accessibilityUtils';
import type { AccessibilitySettings, AccessibilityProfile, AccessibilityState } from '@/types/accessibility';

interface AccessibilityContextType {
  accessibilityState: AccessibilityState;
  toggleSetting: (setting: keyof AccessibilitySettings) => void;
  updateSetting: (setting: keyof AccessibilitySettings, value: string) => void;
  applyProfile: (profileName: AccessibilityProfile) => void;
  resetSettings: () => void;
  applyAccessibilitySettings: () => void;
}

export const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

interface AccessibilityProviderProps {
  children: ReactNode;
}

export const AccessibilityProvider = ({ children }: AccessibilityProviderProps) => {
  const [accessibilityState, setAccessibilityState] = useState<AccessibilityState>({
    settings: getDefaultSettings(),
    activeProfile: null
  });

  // Load saved settings on initial mount
  useEffect(() => {
    const savedSettings = loadAccessibilitySettings();
    if (savedSettings) {
      setAccessibilityState(savedSettings);
    }
  }, []);

  // Apply settings whenever they change
  useEffect(() => {
    applySettings(accessibilityState.settings);
    saveAccessibilitySettings(accessibilityState);
  }, [accessibilityState]);

  const toggleSetting = (setting: keyof AccessibilitySettings) => {
    setAccessibilityState(prevState => ({
      ...prevState,
      settings: {
        ...prevState.settings,
        [setting]: !prevState.settings[setting]
      }
    }));
  };

  const updateSetting = (setting: keyof AccessibilitySettings, value: string) => {
    setAccessibilityState(prevState => ({
      ...prevState,
      settings: {
        ...prevState.settings,
        [setting]: value
      }
    }));
  };

  const applyProfile = (profileName: AccessibilityProfile) => {
    // Reset settings first
    const defaultSettings = getDefaultSettings();
    let newSettings = { ...defaultSettings };

    // Apply profile-specific settings
    switch(profileName) {
      case 'seizure-safe':
        newSettings.monochrome = true;
        break;
      case 'vision-impaired':
        newSettings.fontSize = 'xlarge';
        newSettings.lineSpacing = 'medium';
        break;
      case 'cognitive-disability':
        newSettings.lineSpacing = 'large';
        newSettings.letterSpacing = 'medium';
        newSettings.readingGuide = true;
        break;
      case 'adhd-friendly':
        newSettings.readingGuide = true;
        newSettings.lineSpacing = 'medium';
        break;
    }

    setAccessibilityState({
      settings: newSettings,
      activeProfile: profileName
    });
  };

  const resetSettings = () => {
    setAccessibilityState({
      settings: getDefaultSettings(),
      activeProfile: null
    });
  };

  const applyAccessibilitySettings = () => {
    applySettings(accessibilityState.settings);
  };

  const value = {
    accessibilityState,
    toggleSetting,
    updateSetting,
    applyProfile,
    resetSettings,
    applyAccessibilitySettings
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
