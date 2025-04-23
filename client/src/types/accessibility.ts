export type AccessibilityProfile = 'seizure-safe' | 'vision-impaired' | 'cognitive-disability' | 'adhd-friendly';

export interface AccessibilitySettings {
  darkContrast: boolean;
  lightContrast: boolean;
  monochrome: boolean;
  highSaturation: boolean;
  fontSize: string;
  lineSpacing: string;
  letterSpacing: string;
  readingGuide: boolean;
  largeCursor: boolean;
  readingMask: boolean;
}

export interface AccessibilityState {
  settings: AccessibilitySettings;
  activeProfile: AccessibilityProfile | null;
}
