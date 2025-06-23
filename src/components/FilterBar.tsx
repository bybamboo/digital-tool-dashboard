
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Star, X, Grid3X3, Table2 } from 'lucide-react';
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
    <div className="space-y-4 p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search tools..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="pl-10"
            />
          </div>

          <Select
            value={filters.category || "all"}
            onValueChange={(value) => onFiltersChange({ ...filters, category: value === "all" ? "" : value })}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value=""
            onValueChange={(value) => {
              if (value && !filters.tags.includes(value)) {
                onFiltersChange({ ...filters, tags: [...filters.tags, value] });
              }
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Add tag filter" />
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

          <Button
            variant={filters.showFavoritesOnly ? "default" : "outline"}
            onClick={() => onFiltersChange({ ...filters, showFavoritesOnly: !filters.showFavoritesOnly })}
            className="flex items-center gap-2"
          >
            <Star className={`h-4 w-4 ${filters.showFavoritesOnly ? 'fill-current' : ''}`} />
            Favorites
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewModeChange('table')}
              className="rounded-l-none"
            >
              <Table2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {(filters.tags.length > 0 || hasActiveFilters) && (
        <div className="flex flex-wrap items-center gap-2">
          {filters.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <button
                onClick={() => removeTag(tag)}
                className="ml-1 hover:text-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear all filters
            </Button>
          )}
        </div>
      )}

      <div className="text-sm text-gray-500">
        Showing {totalCount} tool{totalCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default FilterBar;
