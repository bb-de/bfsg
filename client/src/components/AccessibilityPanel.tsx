import { X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import ProfileSection from './ProfileSection';
import DisplayOptions from './DisplayOptions';
import ContentScaling from './ContentScaling';
import NavigationAssistance from './NavigationAssistance';
import { useAccessibility } from '@/hooks/useAccessibility';

interface AccessibilityPanelProps {
  isOpen: boolean;
  closePanel: () => void;
}

const AccessibilityPanel = ({ isOpen, closePanel }: AccessibilityPanelProps) => {
  const { resetSettings } = useAccessibility();

  const handleReset = () => {
    resetSettings();
  };

  return (
    <Card 
      id="a11y-widget-panel"
      aria-hidden={!isOpen}
      className={`absolute bottom-16 right-0 w-[320px] md:w-[380px] transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <CardHeader className="bg-primary text-white p-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold flex items-center">
            <UniversalAccessIcon className="mr-2 h-5 w-5" />
            Accessibility Options
          </CardTitle>
          <Button 
            id="a11y-close-button" 
            aria-label="Close accessibility panel" 
            onClick={closePanel}
            variant="ghost" 
            className="h-8 w-8 p-0 text-white hover:text-neutral-100 hover:bg-primary-dark"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <CardDescription className="text-white/90">
          Customize your browsing experience
        </CardDescription>
      </CardHeader>

      <div className="max-h-[350px] overflow-y-auto">
        <CardContent className="p-0">
          <ProfileSection />
          <Separator />
          <DisplayOptions />
          <Separator />
          <ContentScaling />
          <Separator />
          <NavigationAssistance />
        </CardContent>
      </div>

      <CardFooter className="p-4">
        <Button 
          id="a11y-reset-button"
          onClick={handleReset}
          variant="outline" 
          className="w-full py-2 bg-gray-200 hover:bg-gray-300 text-neutral-dark font-medium"
        >
          Reset All Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

// SVG Icon for Universal Access
const UniversalAccessIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="8" r="2" />
    <path d="M12 10v8" />
    <path d="M8 14h8" />
  </svg>
);

export default AccessibilityPanel;
