import { Accessibility } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AccessibilityButtonProps {
  toggleWidget: () => void;
  isOpen: boolean;
}

const AccessibilityButton = ({ toggleWidget, isOpen }: AccessibilityButtonProps) => {
  return (
    <Button
      id="a11y-widget-button"
      aria-label="Open Accessibility Options"
      aria-expanded={isOpen}
      aria-controls="a11y-widget-panel"
      onClick={toggleWidget}
      className="rounded-full w-14 h-14 flex items-center justify-center shadow-md"
      variant="default"
    >
      <Accessibility className="h-6 w-6" />
      <span className="sr-only">Accessibility options</span>
    </Button>
  );
};

export default AccessibilityButton;
