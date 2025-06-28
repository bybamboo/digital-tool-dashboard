
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      {/* Input visible solo en sm+ */}
      <Input
        type="text"
        placeholder="Buscar herramientas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="hidden sm:block w-[220px]"
      />

      {/* Botón solo visible en móvil */}
      <button
        className="sm:hidden w-9 h-9 flex items-center justify-center rounded-xl border border-border bg-background text-muted-foreground hover:bg-muted transition"
        onClick={() => {
          const query = prompt('Buscar herramienta');
          if (query !== null) {
            onChange(query);
          }
        }}
        aria-label="Buscar"
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SearchInput;
