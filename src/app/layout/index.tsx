import { Outlet } from 'react-router-dom';
import { Footer, Header } from '../ui';

export const Layout = () => {
  return (
    <div className="app">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
