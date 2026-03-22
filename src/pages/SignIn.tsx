import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { z, ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

const signInScheme = z.object({
  email: z.email({ message: "Email Inválido" }),
  password: z.string().trim().min(4, { message: "Informe a senha" }),
});

export function SignIn() {
  const [state, formAction, isLoading] = useActionState(signIn, null);

  const auth = useAuth();

  async function signIn(_: any, formData: FormData) {
    try {
      const data = signInScheme.parse({
        email: formData.get("email"),
        password: formData.get("password"),
      });

      const response = await api.post("/auth/login", data);
      auth.save(response.data);
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return { message: error.issues[0].message };
      }

      if (error instanceof AxiosError) {
        return { message: error.response?.data.message };
      }

      return { message: "Não foi possível entrar!" };
    }
  }

  return (
    <form action={formAction} className="w-full flex flex-col gap-4">
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
        name="email"
        legend="E-mail"
        type="email"
        placeholder="Insira seu e-mail"
        // onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        required
        name="password"
        legend="Senha"
        type="password"
        placeholder="Insira sua senha"
        // onChange={(e) => setPassword(e.target.value)}
      />

      <p className="text-sm text-red-600 text-center my-4 font-medium">
        {state?.message}
      </p>

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
