import { EyeIcon, MousePointer, SeparatorHorizontal } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useAccessibility } from '@/hooks/useAccessibility';

const NavigationAssistance = () => {
  const { toggleSetting, accessibilityState } = useAccessibility();
  
  const navigationOptions = [
    {
      id: 'readingGuide',
      name: 'Reading Guide',
      description: 'Adds a horizontal guide that follows your cursor',
      icon: SeparatorHorizontal,
    },
    {
      id: 'readingMask',
      name: 'Reading Mask',
      description: 'Darkens the page except for area around your cursor',
      icon: EyeIcon,
    },
    {
      id: 'largeCursor',
      name: 'Large Cursor',
      description: 'Makes the cursor bigger and easier to see',
      icon: MousePointer,
    },
  ];

  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold mb-3 text-neutral-dark">Navigation Assistance</h3>
      <div className="space-y-3">
        {navigationOptions.map((option) => {
          const Icon = option.icon;
          const isActive = accessibilityState.settings[option.id as keyof typeof accessibilityState.settings] as boolean;
          
          return (
            <div key={option.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-neutral-dark mr-2">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{option.name}</div>
                  <p className="text-xs text-gray-500">{option.description}</p>
                </div>
              </div>
              <Switch 
                checked={isActive}
                onCheckedChange={() => toggleSetting(option.id as any)}
                aria-label={`Toggle ${option.name}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NavigationAssistance;
