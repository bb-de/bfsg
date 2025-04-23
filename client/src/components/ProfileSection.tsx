import { Shield, Eye, Brain, Lightbulb } from 'lucide-react';
import { useAccessibility } from '@/hooks/useAccessibility';

const ProfileSection = () => {
  const { applyProfile, accessibilityState } = useAccessibility();

  const profiles = [
    {
      id: 'seizure-safe',
      name: 'Seizure Safe',
      description: 'Eliminates flashes and reduces color',
      icon: Shield,
      bgColor: 'bg-blue-100',
      iconColor: 'text-primary',
    },
    {
      id: 'vision-impaired',
      name: 'Vision Impaired',
      description: 'Enhances website visuals',
      icon: Eye,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
    },
    {
      id: 'cognitive-disability',
      name: 'Cognitive',
      description: 'Assists with focus and reading',
      icon: Brain,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      id: 'adhd-friendly',
      name: 'ADHD Friendly',
      description: 'Reduces distractions and noise',
      icon: Lightbulb,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="p-4 border-b">
      <h3 className="font-semibold mb-3 text-neutral-dark">Accessibility Profiles</h3>
      <div className="grid grid-cols-2 gap-2">
        {profiles.map((profile) => {
          const isActive = accessibilityState.activeProfile === profile.id;
          const Icon = profile.icon;
          
          return (
            <button 
              key={profile.id}
              onClick={() => applyProfile(profile.id)}
              className={`a11y-profile-btn text-left p-3 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
                isActive ? 'bg-gray-100 border-primary' : 'hover:bg-gray-50'
              }`}
              aria-pressed={isActive}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full ${profile.bgColor} flex items-center justify-center ${profile.iconColor} mr-2`}>
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-medium text-neutral-dark">{profile.name}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">{profile.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProfileSection;
