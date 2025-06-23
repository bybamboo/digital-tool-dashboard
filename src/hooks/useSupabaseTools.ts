
import { useState, useEffect, useMemo } from 'react';
import { Tool, FilterState } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

export const useSupabaseTools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchTools = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTools(data || []);
    } catch (error: any) {
      toast({
        title: "Error al cargar herramientas",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTools();
  }, [user]);

  const addTool = async (toolData: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tools')
        .insert({
          ...toolData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      setTools(prev => [data, ...prev]);
      toast({
        title: "Herramienta agregada",
        description: "La herramienta se ha agregado exitosamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error al agregar herramienta",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateTool = async (id: string, toolData: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .update({
          ...toolData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setTools(prev => prev.map(tool => tool.id === id ? data : tool));
      toast({
        title: "Herramienta actualizada",
        description: "La herramienta se ha actualizado exitosamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error al actualizar herramienta",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteTool = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tools')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setTools(prev => prev.filter(tool => tool.id !== id));
      toast({
        title: "Herramienta eliminada",
        description: "La herramienta se ha eliminado exitosamente.",
      });
    } catch (error: any) {
      toast({
        title: "Error al eliminar herramienta",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleFavorite = async (id: string) => {
    const tool = tools.find(t => t.id === id);
    if (!tool) return;

    try {
      const { data, error } = await supabase
        .from('tools')
        .update({
          is_favorite: !tool.is_favorite,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      setTools(prev => prev.map(t => t.id === id ? data : t));
    } catch (error: any) {
      toast({
        title: "Error al actualizar favorito",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(tools.map(tool => tool.category))];
    return uniqueCategories.sort();
  }, [tools]);

  const allTags = useMemo(() => {
    const uniqueTags = [...new Set(tools.flatMap(tool => tool.tags))];
    return uniqueTags.sort();
  }, [tools]);

  const filterTools = (filters: FilterState) => {
    return tools.filter(tool => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          tool.category.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      if (filters.category && tool.category !== filters.category) {
        return false;
      }

      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(filterTag => 
          tool.tags.includes(filterTag)
        );
        if (!hasMatchingTag) return false;
      }

      if (filters.showFavoritesOnly && !tool.is_favorite) {
        return false;
      }

      return true;
    });
  };

  return {
    tools,
    loading,
    addTool,
    updateTool,
    deleteTool,
    toggleFavorite,
    categories,
    allTags,
    filterTools,
  };
};
