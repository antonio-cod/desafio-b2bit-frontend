import { Outlet } from "react-router";

export function AuthLayout() {
  return (
    <div className="w-screen h-screen bg-white-100 flex flex-col justify-center items-center text-blue-100">
      <main className="bg-white p-8 rounded-md flex items-center flex-col md:min-w-[462px]">
        <h1 className="text-2xl font-bold text-center m-8 text-blue-100">
          Mini Twitter
        </h1>
        <Outlet />
      </main>
    </div>
  );
}
