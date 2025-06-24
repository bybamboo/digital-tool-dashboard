
import React from 'react';
import { SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const AppSidebarFooter: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themeIcons = {
    light: Sun,
    dark: Moon,
    system: Monitor,
  };

  const themeLabels = {
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
  };

  const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
  const ThemeIcon = themeIcons[theme];

  return (
    <SidebarFooter className="p-4 border-t border-border/40">
      <Button
        variant="ghost"
        onClick={() => setTheme(nextTheme)}
        className="w-full justify-start gap-2 rounded-xl text-sidebar-foreground"
        size="sm"
      >
        <ThemeIcon className="h-4 w-4" />
        {themeLabels[theme]}
      </Button>
    </SidebarFooter>
  );
};

export default AppSidebarFooter;
