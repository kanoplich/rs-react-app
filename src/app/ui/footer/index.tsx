import { GitHub, RSSLogo } from '@/shared/assets/icons';
import { Component } from 'react';

export class Footer extends Component {
  render() {
    return (
      <footer className="text-bg flex justify-between items-center my-2">
        <span className="text-xl text-text-h font-bold">2026</span>
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://github.com/kanoplich"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
          >
            <GitHub
              width={32}
              height={32}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
          </a>
          <a
            href="https://rs.school/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
          >
            <RSSLogo
              width={32}
              height={32}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
          </a>
        </div>
      </footer>
    );
  }
}
