
import React from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, Star, Plus, Grid3X3, List, FolderOpen } from 'lucide-react';
import { FilterState, ViewMode } from '@/types';

interface SidebarNavigationProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddTool: () => void;
  toolCounts: {
    total: number;
    favorites: number;
  };
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  filters,
  onFiltersChange,
  viewMode,
  onViewModeChange,
  onAddTool,
  toolCounts,
}) => {
  return (
    <>
      {/* Acciones principales */}
      <SidebarGroup>
        <SidebarGroupContent>
          <Button 
            onClick={onAddTool}
            className="w-full justify-start gap-2 mb-4 rounded-xl"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Agregar Herramienta
          </Button>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Navegación principal */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground">Navegación</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                onClick={() => onFiltersChange({ ...filters, showFavoritesOnly: false, category: '', tags: [] })}
                isActive={!filters.showFavoritesOnly && !filters.category && filters.tags.length === 0}
                className="rounded-xl text-sidebar-foreground"
              >
                <Home className="h-4 w-4" />
                <span>Todas</span>
                <Badge variant="secondary" className="ml-auto rounded-lg">
                  {toolCounts.total}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onFiltersChange({ ...filters, showFavoritesOnly: true })}
                isActive={filters.showFavoritesOnly}
                className="rounded-xl text-sidebar-foreground"
              >
                <Star className="h-4 w-4" />
                <span>Favoritos</span>
                <Badge variant="secondary" className="ml-auto rounded-lg">
                  {toolCounts.favorites}
                </Badge>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Vistas */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground">Vista</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onViewModeChange('grid')}
                isActive={viewMode === 'grid'}
                className="rounded-xl text-sidebar-foreground"
              >
                <Grid3X3 className="h-4 w-4" />
                <span>Cuadrícula</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onViewModeChange('table')}
                isActive={viewMode === 'table'}
                className="rounded-xl text-sidebar-foreground"
              >
                <List className="h-4 w-4" />
                <span>Lista</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => onViewModeChange('category')}
                isActive={viewMode === 'category'}
                className="rounded-xl text-sidebar-foreground"
              >
                <FolderOpen className="h-4 w-4" />
                <span>Por Categorías</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default SidebarNavigation;
