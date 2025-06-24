
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Settings, LogOut } from 'lucide-react';
import ToolCard from '@/components/ToolCard';
import ToolTable from '@/components/ToolTable';
import ToolForm from '@/components/ToolForm';
import FilterBar from '@/components/FilterBar';
import { useSupabaseTools } from '@/hooks/useSupabaseTools';
import { useAuth } from '@/contexts/AuthContext';
import { Tool, ViewMode, FilterState } from '@/types';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  
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
  } = useSupabaseTools();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    tags: [],
    showFavoritesOnly: false,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

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

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando tus herramientas...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="/lovable-uploads/0dc5cbfd-6ab5-4377-bbf6-25f270015455.png" 
                alt="Toolkit Manager Logo" 
                className="h-6 w-6 sm:h-8 sm:w-8"
              />
              <div>
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Toolkit Manager</h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">Organiza y gestiona todas tus herramientas digitales</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={handleAddTool}
                className="flex items-center gap-1 sm:gap-2 rounded-lg text-xs sm:text-sm px-3 sm:px-4"
                size="sm"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Agregar</span>
              </Button>
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="flex items-center gap-1 sm:gap-2 rounded-lg text-xs sm:text-sm px-3 sm:px-4"
                size="sm"
              >
                <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <FilterBar
          filters={filters}
          onFiltersChange={setFilters}
          categories={categories}
          allTags={allTags}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalCount={filteredTools.length}
        />

        <div className="mt-6 sm:mt-8">
          {filteredTools.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center">
                <Settings className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
              </div>
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">
                {tools.length === 0 ? 'No hay herramientas aún' : 'No hay herramientas que coincidan con tus filtros'}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
                {tools.length === 0 
                  ? 'Comienza agregando tu primera herramienta digital a la colección.'
                  : 'Intenta ajustar tus criterios de búsqueda o filtro para encontrar lo que buscas.'
                }
              </p>
              {tools.length === 0 && (
                <Button onClick={handleAddTool} className="flex items-center gap-2 rounded-lg">
                  <Plus className="h-4 w-4" />
                  Agregar Tu Primera Herramienta
                </Button>
              )}
            </div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
                <div className="overflow-x-auto">
                  <ToolTable
                    tools={filteredTools}
                    onEdit={handleEditTool}
                    onDelete={handleDeleteTool}
                    onToggleFavorite={toggleFavorite}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </main>

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
