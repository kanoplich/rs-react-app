import { type ChangeEvent, type KeyboardEvent } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export const Search = ({
  value,
  placeholder = 'Search...',
  disabled = false,
  onChange,
  onSearch,
}: SearchProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };
  return (
    <input
      type="search"
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      className="
          flex-1 px-3 py-2 
          border border-border 
          rounded-l-md
          bg-bg text-text
          placeholder:text-muted-foreground
          hover:border-accent
          active:bg-accent-bg
          focus:outline-none focus:ring-2 focus:ring-accent
          disabled:opacity-50 disabled:cursor-not-allowed
        "
    />
  );
};
