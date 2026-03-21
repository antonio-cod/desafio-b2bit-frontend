export function NotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="flex flex-col w-125 h-125 justify-center items-center border rounded-2xl border-gray-200">
        <h1 className="text-gray-100 font-semibold text-2xl mb-10">
          Op's! Esta página não existe. 🤦‍♂️
        </h1>
        <a
          href="/"
          className="font-semibold text-center text-blue-100 hover:text-blue-200 transition ease-linear"
        >
          Voltar para o início
        </a>
      </div>
    </div>
  );
}
