import { GitHub, RSSLogo } from '@/shared/assets/icons';

export const Footer = () => {
  return (
    <footer className="bg-accent-bg rounded-md flex justify-between items-center mt-3">
      <span className="text-xl text-text-h font-bold mx-2">2026</span>
      <div className="flex justify-center items-center gap-4 my-2">
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
};
