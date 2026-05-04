import { Component, type ChangeEvent, type KeyboardEvent } from 'react';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  disabled?: boolean;
}

export class Search extends Component<SearchProps> {
  handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(e.target.value);
  };

  handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.props.onSearch();
    }
  };

  render() {
    const { value, placeholder = 'Search...', disabled = false } = this.props;

    return (
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
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
  }
}
