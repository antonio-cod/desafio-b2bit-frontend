import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert("Enviado!");
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <div className="mt-4 mb-4">
        <h2 className="text-2xl font-semibold text-blue-100">
          Entrar na conta
        </h2>
        <p className="text-gray-100">
          Escolha a aba que voce deseja e informe seus dados para continuar.
        </p>
      </div>

      <Input
        required
        value={email}
        legend="E-mail"
        type="email"
        placeholder="Insira seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        value={password}
        legend="Senha"
        type="password"
        placeholder="Insira sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button type="submit">Continuar</Button>

      <p className="text-xxs text-gray-900">
        Ao clicar em continuar, voce concorda com nossos Termos de Servico e
        Politica de Privacidade.
      </p>
    </form>
  );
}
