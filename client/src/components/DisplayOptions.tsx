import { Palette, Sun, Filter, SlidersVertical } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useAccessibility } from '@/hooks/useAccessibility';

const DisplayOptions = () => {
  const { toggleSetting, accessibilityState } = useAccessibility();
  
  const displayOptions = [
    {
      id: 'darkContrast',
      name: 'Dark Contrast',
      description: 'Inverts colors for higher contrast',
      icon: SlidersVertical,
    },
    {
      id: 'lightContrast',
      name: 'Light Contrast',
      description: 'Enhances light mode visibility',
      icon: Sun,
    },
    {
      id: 'monochrome',
      name: 'Monochrome',
      description: 'Removes all colors',
      icon: Filter,
    },
    {
      id: 'highSaturation',
      name: 'High Saturation',
      description: 'Enhances color vibrancy',
      icon: Palette,
    },
  ];

  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold mb-3 text-neutral-dark">Display Options</h3>
      <div className="space-y-3">
        {displayOptions.map((option) => {
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

export default DisplayOptions;
