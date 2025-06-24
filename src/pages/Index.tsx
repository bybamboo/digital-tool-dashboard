
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar';
import ToolCard from '@/components/ToolCard';
import ToolTable from '@/components/ToolTable';
import CategoryView from '@/components/CategoryView';
import ToolForm from '@/components/ToolForm';
import FilterBar from '@/components/FilterBar';
import { useSupabaseTools } from '@/hooks/useSupabaseTools';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
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

  // Calcular estadísticas para la barra lateral
  const toolCounts = useMemo(() => {
    const byCategory: Record<string, number> = {};
    const byTag: Record<string, number> = {};
    let favorites = 0;

    tools.forEach(tool => {
      if (tool.is_favorite) favorites++;
      
      const category = tool.category || 'Sin categoría';
      byCategory[category] = (byCategory[category] || 0) + 1;
      
      tool.tags.forEach(tag => {
        byTag[tag] = (byTag[tag] || 0) + 1;
      });
    });

    return {
      total: tools.length,
      favorites,
      byCategory,
      byTag,
    };
  }, [tools]);

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando tus herramientas...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    if (filteredTools.length === 0) {
      return (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center">
            <FolderOpen className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">
            {tools.length === 0 ? 'No hay herramientas aún' : 'No hay herramientas que coincidan con tus filtros'}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            {tools.length === 0 
              ? 'Comienza agregando tu primera herramienta digital a la colección.'
              : 'Intenta ajustar tus criterios de búsqueda o filtro para encontrar lo que buscas.'
            }
          </p>
          {tools.length === 0 && (
            <Button onClick={handleAddTool} className="rounded-xl">
              Agregar Tu Primera Herramienta
            </Button>
          )}
        </div>
      );
    }

    switch (viewMode) {
      case 'category':
        return (
          <CategoryView
            tools={filteredTools}
            onEdit={handleEditTool}
            onDelete={handleDeleteTool}
            onToggleFavorite={toggleFavorite}
          />
        );
      case 'table':
        return (
          <div className="overflow-x-auto">
            <ToolTable
              tools={filteredTools}
              onEdit={handleEditTool}
              onDelete={handleDeleteTool}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          <AppSidebar
            categories={categories}
            allTags={allTags}
            filters={filters}
            onFiltersChange={setFilters}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onAddTool={handleAddTool}
            toolCounts={toolCounts}
          />
          
          <SidebarInset className="flex-1">
            {/* Header */}
            <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 sticky top-0 z-40">
              <div className="flex h-14 items-center gap-4 px-6">
                <SidebarTrigger className="rounded-xl" />
                
                <div className="flex-1">
                  <FilterBar
                    filters={filters}
                    onFiltersChange={setFilters}
                    categories={categories}
                    allTags={allTags}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    totalCount={filteredTools.length}
                  />
                </div>
                
                <Button
                  variant="ghost"
                  onClick={handleSignOut}
                  className="rounded-xl"
                  size="sm"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">
              {renderContent()}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>

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
