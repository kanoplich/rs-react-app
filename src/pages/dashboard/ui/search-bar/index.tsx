import { useState } from 'react';
import { Search, Button } from '@/shared/ui';

interface SearchBarProps {
  onSearch: (query: string) => void;
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
}

export const SearchBar = ({
  onSearch,
  initialValue,
  placeholder,
  disabled,
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue || '');

  const handleSearch = () => {
    onSearch(query);
  };

  const handleChange = (query: string) => {
    setQuery(query);
  };
  return (
    <div className="flex my-6">
      <Search
        value={query}
        onChange={handleChange}
        onSearch={handleSearch}
        placeholder={placeholder}
        disabled={disabled}
      />
      <Button
        onClick={handleSearch}
        disabled={disabled || !query.trim()}
        className="rounded-l-none rounded-r-md"
      >
        Search
      </Button>
    </div>
  );
};
