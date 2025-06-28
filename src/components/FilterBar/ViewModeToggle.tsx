
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grid3X3, Table2, Layers3 } from 'lucide-react';
import { ViewMode } from '@/types';

interface ViewModeToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div className="flex h-9 rounded-xl overflow-hidden border border-border bg-background">
      <Button
        variant={viewMode === 'grid' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => onViewModeChange('grid')}
        className="rounded-none flex items-center justify-center"
      >
        <Grid3X3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'category' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => onViewModeChange('category')}
        className="rounded-none flex items-center justify-center"
      >
        <Layers3 className="h-4 w-4" />
      </Button>
      <Button
        variant={viewMode === 'table' ? 'default' : 'ghost'}
        size="icon"
        onClick={() => onViewModeChange('table')}
        className="rounded-none flex items-center justify-center"
      >
        <Table2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewModeToggle;
