
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ActiveTagsListProps {
  tags: string[];
  onRemoveTag: (tag: string) => void;
}

const ActiveTagsList: React.FC<ActiveTagsListProps> = ({ tags, onRemoveTag }) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="flex items-center gap-1 rounded-xl">
          {tag}
          <button
            onClick={() => onRemoveTag(tag)}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
    </div>
  );
};

export default ActiveTagsList;
