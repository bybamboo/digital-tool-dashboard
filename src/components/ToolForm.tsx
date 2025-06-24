
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl mx-4 sm:mx-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {tool ? 'Editar herramienta' : 'Agregar nueva herramienta'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="rounded-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">Categoría *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                list="categories"
                className="rounded-lg"
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
            <Label htmlFor="description" className="text-sm font-medium">Descripción *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="rounded-lg resize-none"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website_url" className="text-sm font-medium">Web *</Label>
            <Input
              id="website_url"
              type="url"
              value={formData.website_url}
              onChange={(e) => setFormData({ ...formData, website_url: e.target.value })}
              placeholder="https://ejemplo.com"
              className="rounded-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Etiquetas</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Agrega una etiqueta y presiona Enter"
                className="rounded-lg flex-1"
              />
              <Button type="button" onClick={addTag} variant="outline" className="rounded-lg px-3 sm:px-4">
                Agregar
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1 rounded-lg">
                  <span className="text-xs sm:text-sm">{tag}</span>
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
            <Label htmlFor="notes" className="text-sm font-medium">Notas</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Notas opcionales sobre esta herramienta..."
              className="rounded-lg resize-none"
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
            <Label htmlFor="is_favorite" className="text-sm">Marcar como favorito</Label>
          </div>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-lg">
              Cancelar
            </Button>
            <Button type="submit" className="rounded-lg">
              {tool ? 'Actualizar Herramienta' : 'Agregar Herramienta'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ToolForm;
