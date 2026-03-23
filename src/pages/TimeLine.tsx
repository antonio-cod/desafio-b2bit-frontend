import { AxiosError } from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { z, ZodError } from "zod";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useAuth } from "../hooks/useAuth";
import { api } from "../services/api";
import type { Post, PostsResponse } from "../types/post";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const postSchema = z.object({
  title: z.string().trim().min(1, { message: "Informe o titulo do post" }),
  content: z.string().trim().min(1, { message: "Informe o conteudo do post" }),
  image: z
    .string()
    .trim()
    .refine((value) => value.length === 0 || z.url().safeParse(value).success, {
      message: "Informe uma URL valida para a imagem",
    }),
});

function formatDate(date: string) {
  const parsedDate = new Date(date.replace(" ", "T"));

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(parsedDate);
}

async function validateImage(imageUrl: string) {
  if (!imageUrl) {
    return;
  }

  let response: Response;

  try {
    response = await fetch(imageUrl);
  } catch {
    throw new Error(
      "Nao foi possivel validar a imagem. Use uma URL publica e acessivel.",
    );
  }

  if (!response.ok) {
    throw new Error("Nao foi possivel acessar a imagem informada.");
  }

  const contentType = response.headers.get("content-type");

  if (contentType && !contentType.startsWith("image/")) {
    throw new Error("A URL informada nao aponta para uma imagem valida.");
  }

  const contentLength = response.headers.get("content-length");

  if (contentLength && Number(contentLength) > MAX_IMAGE_SIZE) {
    throw new Error("A imagem deve ter no maximo 5MB.");
  }

  const imageBlob = await response.blob();

  if (!imageBlob.type.startsWith("image/")) {
    throw new Error("A URL informada nao aponta para uma imagem valida.");
  }

  if (imageBlob.size > MAX_IMAGE_SIZE) {
    throw new Error("A imagem deve ter no maximo 5MB.");
  }
}

export function TimeLine() {
  const auth = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  async function loadPosts(showError = true) {
    try {
      setIsLoadingPosts(true);

      const response = await api.get<PostsResponse>("/posts", {
        headers: auth.session?.token
          ? {
              Authorization: `Bearer ${auth.session.token}`,
            }
          : undefined,
      });

      setPosts(response.data.posts);
      setTotal(response.data.total);
    } catch {
      if (showError) {
        alert("Nao foi possivel carregar a timeline.");
      }
    } finally {
      setIsLoadingPosts(false);
    }
  }

  useEffect(() => {
    void loadPosts();
  }, []);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!auth.session?.token) {
        throw new Error("Sua sessao expirou. Faca login novamente.");
      }

      const data = postSchema.parse({
        title,
        content,
        image,
      });

      await validateImage(data.image);

      await api.post(
        "/posts/",
        {
          title: data.title,
          content: data.content,
          image: data.image,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.session.token}`,
          },
        },
      );

      setTitle("");
      setContent("");
      setImage("");
      setIsFormVisible(false);

      await loadPosts(false);
      alert("Post criado com sucesso!");
    } catch (error) {
      if (error instanceof ZodError) {
        return alert(error.issues[0].message);
      }

      if (error instanceof AxiosError) {
        return alert(
          error.response?.data.message ?? "Nao foi possivel criar o post.",
        );
      }

      if (error instanceof Error) {
        return alert(error.message);
      }

      alert("Nao foi possivel criar o post.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full flex flex-col gap-6 lg:min-w-130">
      <section className="bg-white-100 w-full rounded-xl border border-gray-200 flex flex-col p-8 gap-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-blue-100">Time Line</h1>
            <p className="text-sm text-gray-600">
              Crie um novo post e acompanhe as publicacoes da comunidade.
            </p>
          </div>

          <Button
            type="button"
            className="px-6"
            onClick={() => setIsFormVisible((state) => !state)}
          >
            {isFormVisible ? "Fechar" : "Novo Post"}
          </Button>
        </header>

        {isFormVisible && (
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <Input
              required
              value={title}
              legend="Titulo"
              type="text"
              placeholder="Insira o titulo do post"
              onChange={(e) => setTitle(e.target.value)}
            />

            <fieldset className="flex flex-col text-gray-100 focus-within:text-blue-100">
              <legend className="text-xxs text-inherit">Conteudo</legend>
              <textarea
                required
                value={content}
                placeholder="Compartilhe sua ideia com a comunidade"
                onChange={(e) => setContent(e.target.value)}
                className="min-h-32 rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-100 bg-transparent outline-none focus:border-2 focus:border-blue-100 placeholder-gray-100 resize-y"
              />
            </fieldset>

            <Input
              value={image}
              legend="Imagem (opcional)"
              type="url"
              placeholder="https://exemplo.com/minha-imagem.jpg"
              onChange={(e) => setImage(e.target.value)}
            />

            <p className="text-xxs text-gray-100">
              Se informar uma imagem, use uma URL publica valida de ate 5MB.
            </p>

            <Button type="submit" isLoading={isLoading}>
              Publicar
            </Button>
          </form>
        )}
      </section>

      <section className="bg-white-100 w-full rounded-xl border border-gray-200 flex flex-col p-8 gap-6">
        <header className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-blue-100">Posts Gerais</h2>
            <p className="text-sm text-blue-200">Total de posts: {total}</p>
          </div>
        </header>

        {isLoadingPosts ? (
          <p className="text-sm text-gray-100">Carregando posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-gray-100">
            Nenhum post encontrado no momento.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-gray-300 p-5 flex flex-col gap-4"
              >
                <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-black-500">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-100">
                      Por {post.authorName} em {formatDate(post.createdAt)}
                    </p>
                  </div>

                  <span className="text-xs font-semibold text-blue-100">
                    {post.likesCount} curtidas
                  </span>
                </header>

                <p className="text-sm leading-6 text-gray-100">
                  {post.content}
                </p>

                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full max-h-96 rounded-xl object-cover border border-gray-300"
                  />
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
