
import React from 'react';
import { SidebarHeader } from '@/components/ui/sidebar';

interface AppSidebarHeaderProps {
  totalCount: number;
}

const AppSidebarHeader: React.FC<AppSidebarHeaderProps> = ({ totalCount }) => {
  return (
    <SidebarHeader className="p-4 border-b border-border/40">
      <div className="flex items-center gap-3">
        <img 
          src="/lovable-uploads/0dc5cbfd-6ab5-4377-bbf6-25f270015455.png" 
          alt="Logo" 
          className="h-6 w-6"
        />
        <div>
          <div className="font-semibold text-sm text-sidebar-foreground">Toolkit Manager</div>
          <div className="text-xs text-muted-foreground">{totalCount} herramientas</div>
        </div>
      </div>
    </SidebarHeader>
  );
};

export default AppSidebarHeader;
