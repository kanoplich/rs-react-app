import { Component } from 'react';

type ErrorFallbackProps = {
  error?: string | null;
  resetError?: () => void;
};

export class ErrorFallback extends Component<ErrorFallbackProps> {
  render() {
    const { error, resetError } = this.props;
    return (
      <div className="error-boundary p-6 text-center">
        <div className="text-red-500 text-xl mb-4">Something wrong</div>
        <p className="text-text mb-4">{error || 'Unknown error'}</p>
        <button
          onClick={resetError}
          className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90"
        >
          Try again
        </button>
      </div>
    );
  }
}
