import { Component } from 'react';

interface CardProps {
  name: string;
  url: string;
}

export class Card extends Component<CardProps> {
  render() {
    const { name, url } = this.props;

    return (
      <div className="border border-border rounded-lg p-4 flex flex-col sm:flex-row justify-between my-1">
        <h3 className="text-lg font-bold text-text-h">{name}</h3>
        <span className="text-accent hover:underline">{url}</span>
      </div>
    );
  }
}
