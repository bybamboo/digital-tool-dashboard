
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
  return (
    <div className="relative w-full sm:w-auto">
      {/* Input visible solo en sm+ */}
      <Input
        type="text"
        placeholder="Buscar herramientas..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="hidden sm:block w-full sm:w-[220px]"
      />

      {/* Botón solo visible en móvil */}
      <button
        className="sm:hidden flex items-center justify-center w-9 h-9 rounded-md border border-input bg-background"
        onClick={() => {
          const query = prompt('Buscar herramienta');
          if (query !== null) {
            onChange(query);
          }
        }}
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchInput;
