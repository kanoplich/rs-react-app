import { Component } from 'react';

export class Loader extends Component {
  render() {
    return (
      <div
        data-testid="loader"
        className="flex justify-center items-center p-4"
      >
        <div
          className="
            w-8 h-8 border-4
            border-accent
            border-t-transparent
            rounded-full
            animate-spin
          "
        />
      </div>
    );
  }
}
