
import React from 'react';
import {
  Sidebar,
  SidebarContent,
} from '@/components/ui/sidebar';
import { FilterState, ViewMode } from '@/types';
import AppSidebarHeader from './AppSidebar/SidebarHeader';
import SidebarNavigation from './AppSidebar/SidebarNavigation';
import SidebarFilters from './AppSidebar/SidebarFilters';
import AppSidebarFooter from './AppSidebar/SidebarFooter';

interface AppSidebarProps {
  categories: string[];
  allTags: string[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTool: () => void;
  toolCounts: {
    total: number;
    favorites: number;
    byCategory: Record<string, number>;
    byTag: Record<string, number>;
  };
}

const AppSidebar: React.FC<AppSidebarProps> = ({
  categories,
  allTags,
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  onAddTool,
  toolCounts,
}) => {
  return (
    <Sidebar className="border-r border-border/40">
      <AppSidebarHeader totalCount={toolCounts.total} />

      <SidebarContent className="px-2">
        <SidebarNavigation
          filters={filters}
          onFiltersChange={onFiltersChange}
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
          onAddTool={onAddTool}
          toolCounts={toolCounts}
        />

        <SidebarFilters
          categories={categories}
          allTags={allTags}
          filters={filters}
          onFiltersChange={onFiltersChange}
          toolCounts={toolCounts}
        />
      </SidebarContent>

      <AppSidebarFooter />
    </Sidebar>
  );
};

export default AppSidebar;
