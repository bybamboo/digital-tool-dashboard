
import React, { useState } from 'react'; // AÑADIDO AQUÍ 👈
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { FolderOpen } from 'lucide-react';
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
  const [showAllCategories, setShowAllCategories] = useState(false); // AÑADIDO CORRECTAMENTE

  return (
    <>
      {/* Categorías */}
      <SidebarGroup>
        <SidebarGroupLabel className="text-sidebar-foreground">Categorías</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {(showAllCategories ? categories : categories.slice(0, 7)).map((category) => (
              <SidebarMenuItem key={category}>
                <SidebarMenuButton
                  onClick={() =>
                    onFiltersChange({
                      ...filters,
                      category: filters.category === category ? '' : category,
                      showFavoritesOnly: false,
                    })
                  }
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

            {/* Ver más / Ver menos */}
            {categories.length > 7 && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  isActive={false}
                  className="rounded-xl text-sidebar-foreground text-sm"
                >
                  {showAllCategories ? 'Ver menos' : 'Ver más'}
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default SidebarFilters;
