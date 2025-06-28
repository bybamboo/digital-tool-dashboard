import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Edit, Trash2, FolderOpen } from 'lucide-react';
import { Tool } from '@/types';
import { getLucideIcon } from '@/lib/icons';

interface CategoryViewProps {
  tools: Tool[];
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  categoryMeta: Record<string, { icon: string; color?: string }>;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  tools,
  onEdit,
  onDelete,
  onToggleFavorite,
  categoryMeta,
}) => {
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toolsByCategory = tools.reduce((acc, tool) => {
    const category = tool.category || 'Sin categoría';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tool);
    return acc;
  }, {} as Record<string, Tool[]>);

  const categories = Object.keys(toolsByCategory).sort();

  return (
    <div className="space-y-8">
      {categories.map((category) => {
        const meta = categoryMeta[category] || { icon: 'FolderOpen', color: undefined };
        const Icon = getLucideIcon(meta.icon) || FolderOpen;
        const iconColor = meta.color || 'var(--muted-foreground)';

        return (
          <div key={category}>
            <div className="flex items-center gap-3 mb-4">
              <Icon className="h-5 w-5" style={{ color: iconColor }} />
              <h2 className="text-xl font-semibold">{category}</h2>
              <Badge variant="secondary" className="rounded-lg">
                {toolsByCategory[category].length}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {toolsByCategory[category].map((tool) => (
                <Card
                  key={tool.id}
                  className="group hover:shadow-md transition-all duration-200 rounded-xl border-border/40"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base font-medium truncate">
                          {tool.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExternalLink(tool.website_url)}
                            className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onToggleFavorite(tool.id)}
                            className="p-0 h-auto"
                          >
                            <Star
                              className={`h-4 w-4 ${
                                tool.is_favorite
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-400 group-hover:text-gray-600'
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-3">
                      {tool.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {tool.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs rounded-lg"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(tool)}
                        className="text-gray-600 hover:text-gray-800 p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(tool.id)}
                        className="text-red-600 hover:text-red-700 p-1 h-auto opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryView;
