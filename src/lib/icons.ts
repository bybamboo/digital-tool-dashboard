import {
  Server,
  Globe,
  Code,
  Image,
  Brain,
  Mail,
  Settings,
  Cloud,
  Paintbrush2,
  FolderOpen,
} from 'lucide-react';

const iconMap = {
  Server,
  Globe,
  Code,
  Image,
  Brain,
  Mail,
  Settings,
  Cloud,
  Paintbrush2,
  FolderOpen,
};

export const getLucideIcon = (iconName: string) => {
  return iconMap[iconName as keyof typeof iconMap] || FolderOpen;
};
