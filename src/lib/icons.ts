import * as Icons from 'lucide-react';

// Recibe el nombre como string y devuelve el componente correspondiente
export const getLucideIcon = (iconName: string) => {
  const LucideIcon = Icons[iconName as keyof typeof Icons];
  return LucideIcon || Icons.FolderOpen;
};
