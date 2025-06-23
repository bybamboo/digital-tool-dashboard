
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import ToolTable from '@/components/ToolTable';
import ToolForm from '@/components/ToolForm';
import FilterBar from '@/components/FilterBar';
import { useTools } from '@/hooks/useTools';
import { Tool, ViewMode, FilterState } from '@/types';

const Index = () => {
  const {
    tools,
    loading,
    addTool,
    updateTool,
    deleteTool,
    toggleFavorite,
    categories,
    allTags,
    filterTools,
  } = useTools();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    tags: [],
    showFavoritesOnly: false,
  });

  const filteredTools = filterTools(filters);

  const handleAddTool = () => {
    setEditingTool(null);
    setIsFormOpen(true);
  };

  const handleEditTool = (tool: Tool) => {
    setEditingTool(tool);
    setIsFormOpen(true);
  };

  const handleSubmitTool = (toolData: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => {
    if (editingTool) {
      updateTool(editingTool.id, toolData);
    } else {
      addTool(toolData);
    }
    setIsFormOpen(false);
    setEditingTool(null);
  };

  const handleDeleteTool = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      deleteTool(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tools...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Digital Toolkit Manager</h1>
              <p className="text-sm text-gray-600">Organize and manage all your digital tools</p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleAddTool}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Tool
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          allTags={allTags}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={filteredTools.length}
        />

        {/* Tools Display */}
        <div className="mt-8">
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Settings className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {tools.length === 0 ? 'No tools yet' : 'No tools match your filters'}
              </h3>
              <p className="text-gray-600 mb-6">
                {tools.length === 0 
                  ? 'Get started by adding your first digital tool to the collection.'
                  : 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                }
              </p>
              {tools.length === 0 && (
                <Button onClick={handleAddTool} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Your First Tool
                </Button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredTools.map((tool) => (
                    <ToolCard
                      key={tool.id}
                      tool={tool}
                      onEdit={handleEditTool}
                      onDelete={handleDeleteTool}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <ToolTable
                  tools={filteredTools}
                  onEdit={handleEditTool}
                  onDelete={handleDeleteTool}
                  onToggleFavorite={toggleFavorite}
                />
              )}
            </>
          )}
        </div>
      </main>

      {/* Tool Form Modal */}
      <ToolForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingTool(null);
        }}
        onSubmit={handleSubmitTool}
        tool={editingTool}
        categories={categories}
      />
    </div>
  );
};

export default Index;
