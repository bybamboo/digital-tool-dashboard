
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  tool, 
  onEdit, 
  onDelete, 
  onToggleFavorite 
}) => {
  const handleExternalLink = () => {
    window.open(tool.website_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-white border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate mb-1">
              {tool.name}
            </h3>
            <Badge variant="secondary" className="text-xs font-medium">
              {tool.category}
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleFavorite(tool.id)}
            className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Star 
              className={`h-4 w-4 ${tool.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
            />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {tool.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {tool.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} className="text-xs bg-white text-gray-800 border border-gray-300">
              {tag}
            </Badge>
          ))}
          {tool.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{tool.tags.length - 3}
            </Badge>
          )}
        </div>

        {tool.notes && (
          <p className="text-xs text-gray-500 mb-4 line-clamp-2">
            {tool.notes}
          </p>
        )}
        
        <div className="flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
<Button
  variant="ghost"
  size="sm"
  onClick={handleExternalLink}
  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:hover:text-white"
>
  <ExternalLink className="h-3 w-3" />
  Ver web
</Button>
          
<div className="flex gap-1">
  <Button
    variant="ghost"
    size="sm"
    onClick={() => onEdit(tool)}
    className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
  >
    <Edit className="h-3 w-3" />
  </Button>
  <Button
    variant="ghost"
    size="sm"
    onClick={() => onDelete(tool.id)}
    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
  >
    <Trash2 className="h-3 w-3" />
  </Button>
</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ToolCard;
