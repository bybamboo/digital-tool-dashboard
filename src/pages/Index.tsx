
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
    if (window.confirm('¿Estás seguro de que quieres eliminar esta herramienta?')) {
      deleteTool(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tus herramientas...</p>
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
            <div className="flex items-center gap-3">
              <img 
                src="/lovable-uploads/0dc5cbfd-6ab5-4377-bbf6-25f270015455.png" 
                alt="Toolkit Manager Logo" 
                className="h-8 w-8"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Toolkit Manager</h1>
                <p className="text-sm text-gray-600">Organiza y gestiona todas tus herramientas digitales</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={handleAddTool}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Agregar Herramienta
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
                {tools.length === 0 ? 'No hay herramientas aún' : 'No hay herramientas que coincidan con tus filtros'}
              </h3>
              <p className="text-gray-600 mb-6">
                {tools.length === 0 
                  ? 'Comienza agregando tu primera herramienta digital a la colección.'
                  : 'Intenta ajustar tus criterios de búsqueda o filtro para encontrar lo que buscas.'
                }
              </p>
              {tools.length === 0 && (
                <Button onClick={handleAddTool} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Agregar Tu Primera Herramienta
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
