
import { useState, useEffect, useMemo } from 'react';
import { Tool, FilterState } from '@/types';

// Mock data for development
const mockTools: Tool[] = [
  {
    id: '1',
    name: 'Notion',
    description: 'All-in-one workspace for notes, tasks, wikis, and databases. Perfect for personal and team productivity.',
    website_url: 'https://notion.so',
    tags: ['productivity', 'notes', 'collaboration', 'database'],
    category: 'Productivity',
    notes: 'My go-to tool for organizing everything. Love the flexibility.',
    is_favorite: true,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Figma',
    description: 'Collaborative interface design tool. Great for creating mockups, prototypes, and design systems.',
    website_url: 'https://figma.com',
    tags: ['design', 'prototyping', 'collaboration', 'ui-ux'],
    category: 'Design',
    notes: 'Essential for all my design work. The collaboration features are amazing.',
    is_favorite: true,
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    name: 'Grammarly',
    description: 'AI-powered writing assistant that helps with grammar, spelling, and style improvements.',
    website_url: 'https://grammarly.com',
    tags: ['writing', 'grammar', 'browser-extension', 'ai'],
    category: 'Writing',
    notes: 'Saves me so much time on editing. The browser extension is super convenient.',
    is_favorite: false,
    created_at: '2024-01-17T10:00:00Z',
    updated_at: '2024-01-17T10:00:00Z',
  },
  {
    id: '4',
    name: 'Yoast SEO',
    description: 'WordPress plugin for search engine optimization. Helps optimize content for better search rankings.',
    website_url: 'https://yoast.com',
    tags: ['seo', 'wordpress', 'plugin', 'optimization'],
    category: 'SEO',
    notes: 'Must-have for any WordPress site. The content analysis is very helpful.',
    is_favorite: true,
    created_at: '2024-01-18T10:00:00Z',
    updated_at: '2024-01-18T10:00:00Z',
  },
  {
    id: '5',
    name: 'Zapier',
    description: 'Automation platform that connects different apps and services to create automated workflows.',
    website_url: 'https://zapier.com',
    tags: ['automation', 'integration', 'workflow', 'productivity'],
    category: 'Automation',
    notes: 'Great for connecting different tools. Saves hours of manual work.',
    is_favorite: false,
    created_at: '2024-01-19T10:00:00Z',
    updated_at: '2024-01-19T10:00:00Z',
  },
  {
    id: '6',
    name: 'LastPass',
    description: 'Password manager that securely stores and auto-fills passwords across devices.',
    website_url: 'https://lastpass.com',
    tags: ['security', 'passwords', 'browser-extension', 'privacy'],
    category: 'Security',
    notes: 'Essential for managing all my passwords securely.',
    is_favorite: true,
    created_at: '2024-01-20T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z',
  },
];

export const useTools = () => {
  const [tools, setTools] = useState<Tool[]>(mockTools);
  const [loading, setLoading] = useState(false);

  const addTool = (toolData: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => {
    const newTool: Tool = {
      ...toolData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setTools(prev => [newTool, ...prev]);
  };

  const updateTool = (id: string, toolData: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => {
    setTools(prev => prev.map(tool => 
      tool.id === id 
        ? { ...tool, ...toolData, updated_at: new Date().toISOString() }
        : tool
    ));
  };

  const deleteTool = (id: string) => {
    setTools(prev => prev.filter(tool => tool.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setTools(prev => prev.map(tool =>
      tool.id === id
        ? { ...tool, is_favorite: !tool.is_favorite, updated_at: new Date().toISOString() }
        : tool
    ));
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
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          tool.name.toLowerCase().includes(searchLower) ||
          tool.description.toLowerCase().includes(searchLower) ||
          tool.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
          tool.category.toLowerCase().includes(searchLower);
        
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && tool.category !== filters.category) {
        return false;
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(filterTag => 
          tool.tags.includes(filterTag)
        );
        if (!hasMatchingTag) return false;
      }

      // Favorites filter
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
