import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, Star, X } from 'lucide-react';
import { FilterState } from '@/types';

interface FilterPopoverProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  allTags: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  sortBy: 'recent' | 'az' | 'za';
  onSortByChange: (value: 'recent' | 'az' | 'za') => void;
}

const FilterPopover: React.FC<FilterPopoverProps> = ({
  filters,
  onFiltersChange,
  categories,
  allTags,
  hasActiveFilters,
  onClearFilters,
  sortBy,
  onSortByChange,
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`rounded-xl px-2 sm:px-4 ${
            hasActiveFilters ? 'bg-primary text-primary-foreground' : ''
          }`}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Filtros</span>

          {hasActiveFilters && (
            <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
              {(filters.category ? 1 : 0) +
                filters.tags.length +
                (filters.showFavoritesOnly ? 1 : 0)}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-popover" align="start">
        <div className="space-y-4">
          {/* Categoría */}
          <div>
            <label className="text-sm font-medium mb-2 block text-popover-foreground">Categoría</label>
            <Select
              value={filters.category || "all"}
              onValueChange={(value) => onFiltersChange({ ...filters, category: value === "all" ? "" : value })}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Etiquetas */}
          <div>
            <label className="text-sm font-medium mb-2 block text-popover-foreground">Etiquetas</label>
            <Select
              value=""
              onValueChange={(value) => {
                if (value && !filters.tags.includes(value)) {
                  onFiltersChange({ ...filters, tags: [...filters.tags, value] });
                }
              }}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Agregar etiqueta" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                {allTags
                  .filter(tag => !filters.tags.includes(tag))
                  .map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          {/* Favoritos y limpiar */}
          <div className="flex items-center justify-between">
            <Button
              variant={filters.showFavoritesOnly ? "default" : "outline"}
              onClick={() => onFiltersChange({ ...filters, showFavoritesOnly: !filters.showFavoritesOnly })}
              className="flex items-center gap-2 rounded-xl"
              size="sm"
            >
              <Star className={`h-4 w-4 ${filters.showFavoritesOnly ? 'fill-current' : ''}`} />
              Solo favoritos
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground rounded-xl"
              >
                Limpiar todo
              </Button>
            )}
          </div>

          {/* Orden */}
          <div>
            <label className="text-sm font-medium mb-2 block text-popover-foreground">Ordenar por</label>
            <Select
              value={sortBy}
              onValueChange={(value) => onSortByChange(value as 'recent' | 'az' | 'za')}
            >
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="bg-popover">
                <SelectItem value="recent">Más recientes</SelectItem>
                <SelectItem value="az">A-Z</SelectItem>
                <SelectItem value="za">Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterPopover;
