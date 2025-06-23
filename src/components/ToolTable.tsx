
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
  <div className="w-full space-y-4 sm:border sm:rounded-lg sm:bg-white sm:overflow-x-auto">
    {/* Mobile view: cards */}
    <div className="space-y-4 block sm:hidden">
      {tools.map((tool) => (
        <div key={tool.id} className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">{tool.name}</h3>
            <Button variant="ghost" size="sm" onClick={() => onToggleFavorite(tool.id)}>
              <Star className={`h-4 w-4 ${tool.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-1"><strong>Category:</strong> {tool.category}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {tool.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
          <p className="text-sm text-gray-700 mb-2">{tool.description}</p>
          <div className="flex gap-2">
            <Button size="sm" onClick={() => onEdit(tool)}>Edit</Button>
            <Button size="sm" variant="outline" onClick={() => onDelete(tool.id)}>Delete</Button>
            <Button size="sm" variant="ghost" onClick={() => handleExternalLink(tool.url)}>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>

    {/* Desktop view: original table */}
    <div className="hidden sm:block">
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
                <Button variant="ghost" size="sm" onClick={() => onToggleFavorite(tool.id)}>
                  <Star className={`h-4 w-4 ${tool.is_favorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                </Button>
              </TableCell>
              <TableCell>{tool.name}</TableCell>
              <TableCell>{tool.category}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell>{tool.description}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => onEdit(tool)}>Edit</Button>
                  <Button size="sm" variant="outline" onClick={() => onDelete(tool.id)}>Delete</Button>
                  <Button size="sm" variant="ghost" onClick={() => handleExternalLink(tool.url)}>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default ToolTable;
