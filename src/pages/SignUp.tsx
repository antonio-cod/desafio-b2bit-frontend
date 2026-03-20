import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsloading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(name, email, password, passwordConfirm);
    alert("Enviado!");
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <div className="mt-4 mb-4">
        <h2 className="text-2xl font-semibold text-blue-100">Olá de novo!</h2>
        <p className="text-gray-100">
          Por favor, insira os seus dados para fazer login.
        </p>
      </div>

      <Input
        required
        legend="Nome"
        type="name"
        placeholder="Insira seu nome"
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        required
        legend="E-mail"
        type="email"
        placeholder="Insira seu e-mail"
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        legend="Senha"
        type="password"
        placeholder="Insira sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />

      <Input
        required
        legend="Confirmar Senha"
        type="password"
        placeholder="Confirme a sua senha"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Continuar</Button>

      <p className="text-xxs text-gray-900">
        Ao clicar em continuar, você concorda com nossos Termos de Serviço e
        Politica de Privacidade
      </p>
    </form>
  );
}
