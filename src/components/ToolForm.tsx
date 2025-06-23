
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { Tool } from '@/types';

interface ToolFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tool: Omit<Tool, 'id' | 'created_at' | 'updated_at'>) => void;
  tool?: Tool | null;
  categories: string[];
}

const ToolForm: React.FC<ToolFormProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  tool, 
  categories 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    website_url: '',
    category: '',
    notes: '',
    is_favorite: false,
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (tool) {
      setFormData({
        name: tool.name,
        description: tool.description,
        website_url: tool.website_url,
        category: tool.category,
        notes: tool.notes || '',
        is_favorite: tool.is_favorite,
      });
      setTags(tool.tags);
    } else {
      setFormData({
        name: '',
        description: '',
        website_url: '',
        category: '',
        notes: '',
        is_favorite: false,
      });
      setTags([]);
    }
  }, [tool, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      tags,
    });
    onClose();
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {tool ? 'Edit Tool' : 'Add New Tool'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                list="categories"
                required
              />
              <datalist id="categories">
                {categories.map((category) => (
                  <option key={category} value={category} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url">Website URL *</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Add a tag and press Enter"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Optional notes about this tool..."
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_favorite"
              checked={formData.is_favorite}
              onChange={(e) => setFormData({ ...formData, is_favorite: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="is_favorite">Mark as favorite</Label>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {tool ? 'Update Tool' : 'Add Tool'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ToolForm;
