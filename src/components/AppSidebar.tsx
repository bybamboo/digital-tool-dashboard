
import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Home, 
  Star, 
  FolderOpen, 
  Tag, 
  Sun, 
  Moon, 
  Monitor,
  Grid3X3,
  List,
  Plus
} from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { FilterState, ViewMode } from '@/types';

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
  const { theme, setTheme, isDark } = useTheme();

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
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <img 
            src="/lovable-uploads/0dc5cbfd-6ab5-4377-bbf6-25f270015455.png" 
            alt="Logo" 
            className="h-6 w-6"
          />
          <div>
            <div className="font-semibold text-sm">Toolkit Manager</div>
            <div className="text-xs text-muted-foreground">{toolCounts.total} herramientas</div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
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
          <SidebarGroupLabel>Navegación</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={() => onFiltersChange({ ...filters, showFavoritesOnly: false, category: '', tags: [] })}
                  isActive={!filters.showFavoritesOnly && !filters.category && filters.tags.length === 0}
                  className="rounded-xl"
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
                  className="rounded-xl"
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
          <SidebarGroupLabel>Vista</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewModeChange('grid')}
                  isActive={viewMode === 'grid'}
                  className="rounded-xl"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span>Cuadrícula</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewModeChange('table')}
                  isActive={viewMode === 'table'}
                  className="rounded-xl"
                >
                  <List className="h-4 w-4" />
                  <span>Lista</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => onViewModeChange('category')}
                  isActive={viewMode === 'category'}
                  className="rounded-xl"
                >
                  <FolderOpen className="h-4 w-4" />
                  <span>Por Categorías</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categorías */}
        <SidebarGroup>
          <SidebarGroupLabel>Categorías</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category}>
                  <SidebarMenuButton
                    onClick={() => onFiltersChange({ 
                      ...filters, 
                      category: filters.category === category ? '' : category,
                      showFavoritesOnly: false 
                    })}
                    isActive={filters.category === category}
                    className="rounded-xl"
                  >
                    <FolderOpen className="h-4 w-4" />
                    <span className="truncate">{category}</span>
                    <Badge variant="secondary" className="ml-auto rounded-lg text-xs">
                      {toolCounts.byCategory[category] || 0}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Etiquetas populares */}
        <SidebarGroup>
          <SidebarGroupLabel>Etiquetas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allTags.slice(0, 8).map((tag) => (
                <SidebarMenuItem key={tag}>
                  <SidebarMenuButton
                    onClick={() => {
                      const newTags = filters.tags.includes(tag)
                        ? filters.tags.filter(t => t !== tag)
                        : [...filters.tags, tag];
                      onFiltersChange({ ...filters, tags: newTags });
                    }}
                    isActive={filters.tags.includes(tag)}
                    className="rounded-xl"
                  >
                    <Tag className="h-4 w-4" />
                    <span className="truncate">{tag}</span>
                    <Badge variant="secondary" className="ml-auto rounded-lg text-xs">
                      {toolCounts.byTag[tag] || 0}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/40">
        <Button
          variant="ghost"
          onClick={() => setTheme(nextTheme)}
          className="w-full justify-start gap-2 rounded-xl"
          size="sm"
        >
          <ThemeIcon className="h-4 w-4" />
          {themeLabels[theme]}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
