import * as Icons from 'lucide-react';

export const getLucideIcon = (iconName: string) => {
  if (!iconName) return Icons.FolderOpen;
  return Icons[iconName as keyof typeof Icons] || Icons.FolderOpen;
};
