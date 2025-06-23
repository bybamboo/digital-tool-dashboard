
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
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
            <TableRow key={tool.id} className="hover:bg-gray-50">
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggleFavorite(tool.id)}
                >
                  <Star 
                    className={`h-4 w-4 ${tool.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} 
                  />
                </Button>
              </TableCell>
              
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  {tool.name}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleExternalLink(tool.website_url)}
                    className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </TableCell>
              
              <TableCell>
                <Badge variant="secondary" className="text-xs">
                  {tool.category}
                </Badge>
              </TableCell>
              
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {tool.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {tool.tags.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{tool.tags.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              
              <TableCell className="max-w-[300px]">
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
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(tool.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
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
