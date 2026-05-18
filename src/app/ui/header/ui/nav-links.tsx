import { ROUTES } from '@/shared/config';
import { NavLink } from 'react-router-dom';

export const NavLinks = () => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'font-bold' : '';
  return (
    <nav className="flex m-2 gap-3">
      <NavLink to={ROUTES.HOME} className={navClass}>
        Home
      </NavLink>
      <NavLink to={ROUTES.ABOUT} className={navClass}>
        About
      </NavLink>
    </nav>
  );
};
