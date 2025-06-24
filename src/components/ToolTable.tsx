
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, ExternalLink, Edit, Trash2 } from 'lucide-react';
import { Tool } from '@/types';

interface ToolTableProps {
  tools: Tool[];
  onEdit: (tool: Tool) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

const ToolTable: React.FC<ToolTableProps> = ({ 
  tools, 
  onEdit, 
  onDelete, 
  onToggleFavorite 
}) => {
  const handleExternalLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="border rounded-xl bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50/50">
            <TableHead className="w-[40px]"></TableHead>
            <TableHead className="font-medium">Nombre</TableHead>
            <TableHead className="font-medium hidden sm:table-cell">Categoría</TableHead>
            <TableHead className="font-medium hidden md:table-cell">Etiquetas</TableHead>
            <TableHead className="font-medium hidden lg:table-cell">Descripción</TableHead>
            <TableHead className="w-[100px] sm:w-[120px] font-medium">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id} className="hover:bg-gray-50/50">
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(tool.id)}
                  className="p-1 h-auto"
                >
                  <Star 
                    className={`h-4 w-4 ${tool.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                  />
                </Button>
              </TableCell>
              
              <TableCell className="font-medium text-gray-800">
                <div className="flex items-center gap-2">
                  <span className="truncate max-w-[120px] sm:max-w-none">{tool.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleExternalLink(tool.website_url)}
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto flex-shrink-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                {/* Show category on mobile */}
                <div className="sm:hidden mt-1">
                  <Badge variant="secondary" className="text-xs rounded-md">
                    {tool.category}
                  </Badge>
                </div>
              </TableCell>
              
              <TableCell className="hidden sm:table-cell">
                <Badge variant="secondary" className="text-xs rounded-md">
                  {tool.category}
                </Badge>
              </TableCell>
              
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs rounded-md">
                      {tag}
                    </Badge>
                  ))}
                  {tool.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs rounded-md">
                      +{tool.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="max-w-[300px] hidden lg:table-cell">
                <p className="text-sm text-gray-600 truncate">
                  {tool.description}
                </p>
              </TableCell>
              
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(tool)}
                    className="text-gray-600 hover:text-gray-800 p-1 h-auto hover:bg-transparent"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(tool.id)}
                    className="text-red-600 hover:text-red-700 p-1 h-auto"
                  >
                    <Trash2 className="h-3 w-3 text-red-600 hover:text-red-700 transition-colors hover:bg-transparent" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ToolTable;
