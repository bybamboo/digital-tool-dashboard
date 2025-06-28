
import React from 'react';
import { FilterState, ViewMode } from '@/types';
import SearchInput from './FilterBar/SearchInput';
import FilterPopover from './FilterBar/FilterPopover';
import ViewModeToggle from './FilterBar/ViewModeToggle';
import ActiveTagsList from './FilterBar/ActiveTagsList';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface FilterBarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories: string[];
  allTags: string[];
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCount: number;
  sortBy: 'recent' | 'az' | 'za';
  onSortByChange: (value: 'recent' | 'az' | 'za') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFiltersChange,
  categories,
  allTags,
  viewMode,
  onViewModeChange,
  totalCount,
  sortBy,
  onSortByChange,
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
<div className="w-full grid grid-cols-1 sm:flex sm:flex-wrap sm:items-center gap-2">
  <div className="w-full sm:w-auto">
    <SearchInput
      value={filters.search}
      onChange={(value) => onFiltersChange({ ...filters, search: value })}
    />
  </div>

  <div className="w-full sm:w-auto">
    <Select
      value={sortBy}
      onValueChange={(value) => onSortByChange(value as 'recent' | 'az' | 'za')}
    >
      <SelectTrigger className="w-full sm:w-[160px] rounded-xl text-sm">
        <SelectValue placeholder="Ordenar por" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Más recientes</SelectItem>
        <SelectItem value="az">A-Z</SelectItem>
        <SelectItem value="za">Z-A</SelectItem>
      </SelectContent>
    </Select>
  </div>

  <div className="w-full sm:w-auto">
    <FilterPopover
      filters={filters}
      onFiltersChange={onFiltersChange}
      categories={categories}
      allTags={allTags}
      hasActiveFilters={hasActiveFilters}
      onClearFilters={clearFilters}
    />
  </div>

  <div className="w-full sm:w-auto">
    <ViewModeToggle
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
    />
  </div>

  <div className="text-sm text-muted-foreground whitespace-nowrap ml-auto">
    {totalCount} herramienta{totalCount !== 1 ? 's' : ''}
  </div>
</div>


      <ActiveTagsList
        tags={filters.tags}
        onRemoveTag={removeTag}
      />
    </div>
  );
};

export default FilterBar;
