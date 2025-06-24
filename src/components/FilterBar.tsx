
import React from 'react';
import { FilterState, ViewMode } from '@/types';
import SearchInput from './FilterBar/SearchInput';
import FilterPopover from './FilterBar/FilterPopover';
import ViewModeToggle from './FilterBar/ViewModeToggle';
import ActiveTagsList from './FilterBar/ActiveTagsList';

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
        <SearchInput
          value={filters.search}
          onChange={(value) => onFiltersChange({ ...filters, search: value })}
        />

        <FilterPopover
          filters={filters}
          onFiltersChange={onFiltersChange}
          categories={categories}
          allTags={allTags}
          hasActiveFilters={hasActiveFilters}
          onClearFilters={clearFilters}
        />

        <ViewModeToggle
          viewMode={viewMode}
          onViewModeChange={onViewModeChange}
        />

        {/* Contador de resultados */}
        <div className="text-sm text-muted-foreground whitespace-nowrap">
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
