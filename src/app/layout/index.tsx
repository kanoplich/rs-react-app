import { Footer, Header } from '../ui';
import { Dashboard } from '@/pages';

export const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="flex-1">
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
};
