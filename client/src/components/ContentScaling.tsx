import { Button } from '@/components/ui/button';
import { useAccessibility } from '@/hooks/useAccessibility';

const ContentScaling = () => {
  const { updateSetting, accessibilityState } = useAccessibility();
  
  const fontSizes = [
    { value: 'default', label: 'A' },
    { value: 'large', label: 'A+' },
    { value: 'xlarge', label: 'A++' },
    { value: 'xxlarge', label: 'A+++' },
  ];
  
  const lineSpacings = [
    { value: 'default', label: 'Default' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];
  
  const letterSpacings = [
    { value: 'default', label: 'Default' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold mb-3 text-neutral-dark">Content Scaling</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1">Text Size</label>
          <div className="flex items-center space-x-2">
            {fontSizes.map((size) => (
              <Button
                key={size.value}
                onClick={() => updateSetting('fontSize', size.value)}
                variant={accessibilityState.settings.fontSize === size.value ? "default" : "outline"}
                size="sm"
                className="px-3 py-1"
              >
                {size.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1">Line Spacing</label>
          <div className="flex items-center space-x-2">
            {lineSpacings.map((spacing) => (
              <Button
                key={spacing.value}
                onClick={() => updateSetting('lineSpacing', spacing.value)}
                variant={accessibilityState.settings.lineSpacing === spacing.value ? "default" : "outline"}
                size="sm"
                className="px-3 py-1"
              >
                {spacing.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-neutral-dark mb-1">Letter Spacing</label>
          <div className="flex items-center space-x-2">
            {letterSpacings.map((spacing) => (
              <Button
                key={spacing.value}
                onClick={() => updateSetting('letterSpacing', spacing.value)}
                variant={accessibilityState.settings.letterSpacing === spacing.value ? "default" : "outline"}
                size="sm"
                className="px-3 py-1"
              >
                {spacing.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentScaling;
