import { User } from "lucide-react";
import { LogOut } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

export function Header() {
  const auth = useAuth();

  return (
    <header className="w-full flex justify-between">
      <User size={20} className="my-8" />

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-gray-200">
          Olá, {auth.session?.user.name}
        </span>

        <LogOut
          size={20}
          className="my-8 cursor-pointer hover:opacity-75 transition ease-linear"
          onClick={() => auth.remove()}
        />
      </div>
    </header>
  );
}
