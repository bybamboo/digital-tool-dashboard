import * as LucideIcons from 'lucide-react';

export const getLucideIcon = (iconName: string) => {
  return (LucideIcons as any)[iconName] || LucideIcons.FolderOpen;
};
