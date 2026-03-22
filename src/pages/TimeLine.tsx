import { Input } from "../components/Input";
import { Select } from "../components/select";

export function TimeLine() {
  return (
    <form className="bg-white-100 w-full rounded-xl flex flex-col p-10 gap-6 lg:min-w-130">
      <header>
        <h1 className="text-xl font-bold text-blue-100">Time Line</h1>
        <p className="text-sm text-blue-200 mt-2 mb-4">
          lista paginada de posts
        </p>
      </header>

      <Input required legend="Nome do Post" />

      <Select required legend="Categoria" />
    </form>
  );
}
