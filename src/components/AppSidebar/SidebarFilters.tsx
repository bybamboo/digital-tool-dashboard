
import React from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { FolderOpen, Tag } from 'lucide-react';
import { FilterState } from '@/types';

interface SidebarFiltersProps {
  categories: string[];
  allTags: string[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  toolCounts: {
    byCategory: Record<string, number>;
    byTag: Record<string, number>;
  };
}

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  categories,
  allTags,
  filters,
  onFiltersChange,
  toolCounts,
}) => {
  return (
    <>
      {/* Categorías */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground">Categorías</SidebarGroupLabel>
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
                  className="rounded-xl text-sidebar-foreground"
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
        <SidebarGroupLabel className="text-sidebar-foreground">Etiquetas</SidebarGroupLabel>
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
                  className="rounded-xl text-sidebar-foreground"
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
    </>
  );
};

export default SidebarFilters;
