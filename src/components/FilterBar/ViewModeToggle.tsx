
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid3X3, Table2, Layers3 } from 'lucide-react';
import { ViewMode } from '@/types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
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
  );
};

export default ViewModeToggle;
