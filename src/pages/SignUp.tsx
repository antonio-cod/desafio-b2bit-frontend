import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

const signUpShema = z
  .object({
    name: z.string().trim().min(1, { message: "Informe o nome" }),
    email: z.email({ message: "E-mail inválido" }),
    password: z
      .string()
      .min(4, { message: "Senha deve ter pelo menos 4 digitos" }),
    passwordConfirm: z.string({ message: "Confirme a senha" }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "As senhas não são iguais",
    path: ["passwordConfirm"],
  });

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);

      const data = signUpShema.parse({
        name,
        email,
        password,
        passwordConfirm,
      });

      await api.post("/auth/register", data);

      if (confirm("Cadastrado com sucesso. Ir para tela de Loguin")) {
        navigate("/");
      }
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(error.response?.data.message);
      }

      alert("Não foi possível cadastrar!");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4">
      <div className="mt-4 mb-4">
        <h2 className="text-2xl font-semibold text-blue-100">
          Criar uma conta
        </h2>
        <p className="text-gray-100">
          Preencha os campos abaixo para fazer seu cadastro.
        </p>
      </div>

      <Input
        required
        value={name}
        legend="Nome"
        type="text"
        placeholder="Insira seu nome"
        onChange={(e) => setName(e.target.value)}
      />

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

      <Input
        required
        value={passwordConfirm}
        legend="Confirmar Senha"
        type="password"
        placeholder="Confirme a sua senha"
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button type="submit" isLoading={isLoading}>
        Continuar
      </Button>

      <p className="text-xxs text-gray-900">
        Ao clicar em continuar, voce concorda com nossos Termos de Servico e
        Politica de Privacidade.
      </p>
    </form>
  );
}
