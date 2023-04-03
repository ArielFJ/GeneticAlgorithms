import SearchBar from "../views/GeneticAlgorithm/components/SearchBar";
import { ROUTES } from "../routes/routes";
import { Link } from "react-router-dom";

function MainLayout({ children, extraHeader }: { children?: JSX.Element | JSX.Element[], extraHeader?: JSX.Element }) {
  return (
    <div className="flex flex-col h-screen">
        <div className="sticky top-0 bg-white p-2 z-10">
          <nav className="flex justify-evenly mb-5">
            {Object.keys(ROUTES).map((key) => {
              const route = ROUTES[key];
              return (
                <Link
                  key={route.key}
                  to={route.path}
                  className="underline text-sky-600"
                >
                  {route.label}
                </Link>
              );
            })}
          </nav>
          {/* <SearchBar /> */}
          {extraHeader}
        </div>
        <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export default MainLayout;
