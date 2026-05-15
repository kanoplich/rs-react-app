import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`
          px-4 py-2 rounded-md font-medium
          border border-border 
          transition-all duration-200
          cursor-pointer
          hover:border-accent
          active:bg-accent-bg
          disabled:opacity-50 disabled:cursor-not-allowed
          ${className}
        `}
      {...props}
    >
      {children}
    </button>
  );
};
