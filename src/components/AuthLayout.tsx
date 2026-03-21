import { NavLink, Outlet } from "react-router";

const authTabs = [
  { label: "Login", to: "/", end: true },
  { label: "Cadastro", to: "/signup", end: false },
];

export function AuthLayout() {
  return (
    <div className="w-screen h-auto bg-white-100 flex flex-col justify-center items-center text-blue-100">
      <main className="bg-white p-8 rounded-md flex items-center flex-col">
        <h1 className="text-2xl font-bold text-center m-8 text-blue-100">
          Mini Twitter
        </h1>

        <nav
          aria-label="Alternar entre login e cadastro"
          className="w-full mb-6 grid grid-cols-2 border-b border-gray-300"
        >
          {authTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex w-full items-center justify-center px-4 py-3 text-sm font-semibold text-center border-b-2 transition ${
                  isActive
                    ? "text-blue-100 border-blue-100"
                    : "text-gray-100 border-transparent hover:text-blue-100"
                }`
              }
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        <Outlet />
      </main>
    </div>
  );
}
