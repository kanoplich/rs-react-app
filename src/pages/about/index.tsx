export const About = () => {
  return (
    <div className="mt-4">
      <h2 className="text-center">About us</h2>
      <div className="mt-6">
        <div className="flex items-center gap-2">
          <span className="font-bold">Author:</span>
          <a
            href="https://github.com/kanoplich"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors hover:text-text-h"
          >
            Andrei Kanoplich
          </a>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold">React course:</span>
          <a
            href="https://rs.school/courses/reactjs"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-accent transition-colors hover:text-text-h"
          >
            The Rolling Scopes School
          </a>
        </div>
      </div>
    </div>
  );
};
