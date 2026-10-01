# MyPortifolio

Portfólio de **Filipe Santos**, desenvolvedor full-stack web (Laravel + React/TypeScript).

🔗 **https://filsantos12.github.io/MyPortifolio/**

## Stack

- **[Astro](https://astro.build)** gerando um site estático, com `base` em `/MyPortifolio`
- **React** só onde há interação (ilhas): carrossel, vídeo, filtro de projetos, menu mobile e formulário de contato
- **TypeScript** em modo estrito
- **Tailwind CSS 4**, com os tokens do tema em `src/styles/global.css`
- **Poppins** local via `@fontsource`
- Imagens otimizadas no build (`astro:assets` + `sharp`): WebP responsivo e originais sem uso removidos do `dist`
- **ESLint**, **Prettier** e `astro check`
- **GitHub Actions**: lint, formatação, check e build em todo PR; Lighthouse CI nos PRs (só reporta); deploy no GitHub Pages a cada push na `main`
- Contato por **FormSubmit**, com o WhatsApp como alternativa

## Rodando localmente

Requer Node 22 (veja `.nvmrc`).

```bash
npm install
npm run dev        # http://localhost:4321/MyPortifolio/
```

| Comando           | O que faz                                        |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Servidor de desenvolvimento                      |
| `npm run build`   | Gera o site em `dist/`                           |
| `npm run preview` | Serve o `dist/` como em produção                 |
| `npm run check`   | Checagem de tipos do Astro/TypeScript            |
| `npm run lint`    | ESLint                                           |
| `npm run format`  | Formata com Prettier (`format:check` só confere) |

### Formulário de contato

O formulário usa o ID do FormSubmit (a string aleatória que substitui o e-mail na URL do
formulário). Copie `.env.example` para `.env` e preencha `PUBLIC_FORMSUBMIT_ID`. Sem o ID, a
seção de contato mostra só o WhatsApp, e o build não falha.

No deploy, o valor vem do secret `PUBLIC_FORMSUBMIT_ID` do repositório. **Nunca coloque o e-mail
em arquivos versionados.**

## Estrutura

```
src/
  assets/projects/<slug>/   prints dos projetos (01.png, 02.png...) e poster.jpg dos vídeos
  assets/experiencia/       imagens da página /experiencia/
  components/               componentes Astro e ilhas React (.tsx)
  data/                     conteúdo: projects.ts, profile.ts, stack.ts, experience.ts, site.ts
  layouts/BaseLayout.astro  <head>, SEO/Open Graph, header e footer
  pages/                    rotas: /, /projetos/, /projetos/[slug]/, /experiencia/, 404
public/
  videos/<slug>.mp4         vídeos dos projetos
  *.html                    redirecionamentos das URLs do site antigo
scripts/                    geração de favicons e da og:image padrão
integrations/               integração que remove do dist as imagens sem uso
```

## Adicionando um projeto

Todo o conteúdo dos projetos fica em `src/data/projects.ts`, tipado por `Project`
(`src/data/types.ts`).

1. **Prints:** salve em `src/assets/projects/<slug>/` numerados em sequência: `01.png`,
   `02.png`... O `01.png` é a capa do card e a og:image da página.
2. **Vídeo (opcional):** salve em `public/videos/<slug>.mp4`, com o primeiro frame em
   `src/assets/projects/<slug>/poster.jpg`.
3. **Entrada:** adicione um objeto ao array `projects`:

```ts
{
  slug: 'meu-projeto',                 // pasta dos prints e URL /projetos/meu-projeto/
  name: 'Meu Projeto',
  tagline: 'Uma frase sobre o que o sistema faz',
  category: 'saas',                    // 'saas' | 'ecommerce' | 'gestao' | 'institucional'
  context: 'cliente',                  // 'cliente' | 'proprio'
  featured: true,                      // true: aparece nos destaques (home e /projetos/)
  order: 5,                            // posição nas listas (menor primeiro)
  problem: 'O problema que o cliente tinha.',
  solution: 'Como o sistema resolveu.',
  highlights: [                        // 3 a 5 desafios técnicos; vazio = sem página própria
    'Primeiro desafio técnico',
    'Segundo desafio técnico',
    'Terceiro desafio técnico',
  ],
  stack: {
    front: ['React', 'TypeScript'],
    back: ['Laravel', 'MySQL'],
    infra: ['Docker'],
    quality: ['Pest'],
    integrations: ['Mercado Pago'],
  },
  links: { demo: 'https://...', repo: 'https://github.com/...' }, // opcional
  images: projectImages('meu-projeto', [
    'Meu Projeto — página inicial',    // alt do 01.png
    'Meu Projeto — painel',            // alt do 02.png
  ]),
  video: projectVideo('meu-projeto'),  // opcional
},
```

Regras que valem para todo projeto:

- **Página própria:** o projeto ganha estudo de caso em `/projetos/<slug>/` quando
  `highlights` tem itens. Sem desafios, ele aparece só nos cards.
- **Imagens:** o build falha se faltar algum arquivo para um alt de `projectImages`, então cada
  alt sempre tem sua imagem. Sem prints (`images: []`), o card mostra um placeholder.
- **Textos pendentes:** "O problema" e "A solução" ficam ocultos enquanto o texto for vazio ou
  `'TODO'`.
- **Revisão dos prints:** antes de commitar, confira que não aparecem dados reais de clientes
  (nomes, CPFs, e-mails, placas). O que é publicado fica no histórico do repositório.
