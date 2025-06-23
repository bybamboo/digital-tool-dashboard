
export interface Tool {
  id: string;
  name: string;
  description: string;
  website_url: string;
  tags: string[];
  category: string;
  notes?: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
  created_at: string;
}

export type ViewMode = 'grid' | 'table';

export interface FilterState {
  search: string;
  category: string;
  tags: string[];
  showFavoritesOnly: boolean;
}
