
import React from 'react';
import { Input } from '@/components/ui/input';
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
import { Search, Star, X, Grid3X3, Table2, Filter, Layers3 } from 'lucide-react';
import { FilterState, ViewMode } from '@/types';

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  allTags: string[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  categories,
  allTags,
  viewMode,
  onViewModeChange,
  totalCount,
}) => {
  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: '',
      tags: [],
      showFavoritesOnly: false,
    });
  };

  const removeTag = (tagToRemove: string) => {
    onFiltersChange({
      ...filters,
      tags: filters.tags.filter(tag => tag !== tagToRemove),
    });
  };

  const hasActiveFilters = filters.search || filters.category || filters.tags.length > 0 || filters.showFavoritesOnly;

  return (
    <div className="flex flex-col gap-3">
      {/* Barra principal compacta */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Búsqueda */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar herramientas..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10 rounded-xl"
          />
        </div>

        {/* Filtros avanzados en popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              className={`rounded-xl ${hasActiveFilters ? 'bg-primary text-primary-foreground' : ''}`}
            >
              <Filter className="h-4 w-4" />
              Filtros
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                  {(filters.category ? 1 : 0) + filters.tags.length + (filters.showFavoritesOnly ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Categoría</label>
                <Select
                  value={filters.category || "all"}
                  onValueChange={(value) => onFiltersChange({ ...filters, category: value === "all" ? "" : value })}
                >
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas las categorías</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Etiquetas</label>
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
                  <SelectContent>
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
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground rounded-xl"
                  >
                    Limpiar todo
                  </Button>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Botones de vista */}
        <div className="flex border rounded-xl">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="rounded-l-xl rounded-r-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'category' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('category')}
            className="rounded-none"
          >
            <Layers3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewModeChange('table')}
            className="rounded-r-xl rounded-l-none"
          >
            <Table2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Contador de resultados */}
        <div className="text-sm text-muted-foreground whitespace-nowrap">
          {totalCount} herramienta{totalCount !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Etiquetas activas */}
      {filters.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1 rounded-xl">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
