import { NavLinks } from './ui/nav-links';

export const Header = () => {
  return (
    <header className=" bg-accent-bg rounded-md flex justify-between items-center">
      <h1 className="m-2">RS React App</h1>
      <NavLinks />
    </header>
  );
};
