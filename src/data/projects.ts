import type { Project } from './types';
import { projectImages, projectVideo } from '../lib/images';

export const projects: Project[] = [
  {
    slug: 'predoctor',
    name: 'PreDoctor',
    tagline: 'SaaS de agendamento médico com pagamentos e repasse a médicos',
    category: 'saas',
    context: 'cliente',
    featured: true,
    order: 1,
    problem:
      'Clínicas e médicos independentes precisam de agendamento online com pagamento antecipado, área do médico e controle administrativo, tratando dados de saúde sob a LGPD.',
    solution:
      'Plataforma com 3 perfis (paciente, médico e admin), agendamento por especialidade, pagamento com Mercado Pago, modelo financeiro em três partes (paciente paga, a plataforma retém a taxa e o médico recebe o repasse após aprovação), notificações por e-mail e dashboard administrativo.',
    highlights: [
      'Infraestrutura na AWS como código (Terraform): ECS Fargate, ALB, CloudFront, Route 53, ACM, SES e Secrets Manager',
      'CI/CD com GitHub Actions e OIDC: deploy automático em produção (AWS) e ambiente de teste separado (Railway + Vercel)',
      'Checkout com Mercado Pago Bricks e cálculo de taxa da plataforma com repasse ao médico',
      'Mais de 400 testes automatizados (Pest), PHPStan nível 5, Vitest e Playwright E2E',
      'LGPD aplicada: logs sem dados sensíveis, anonimização na exclusão de conta, autenticação com cookie HttpOnly',
    ],
    stack: {
      front: ['React', 'TypeScript', 'Vite'],
      back: ['Laravel 12', 'Sanctum', 'MySQL'],
      infra: ['AWS', 'Terraform', 'Docker', 'GitHub Actions', 'Cloudinary', 'Sentry'],
      quality: ['Pest', 'PHPStan', 'Vitest', 'Playwright', 'ESLint'],
      integrations: ['Mercado Pago', 'Amazon SES'],
    },
    images: projectImages('predoctor', [
      'PreDoctor — página inicial',
      'PreDoctor — médicos e especialidades',
      'PreDoctor — painel administrativo',
      'PreDoctor — agendamento de consulta',
      'PreDoctor — área do médico',
      'PreDoctor — home do médico com campanhas e parceiros',
    ]),
  },
  {
    slug: 'pspart',
    name: 'PSPart',
    tagline: 'E-commerce B2B de peças de automação com agente de compras por IA',
    category: 'ecommerce',
    context: 'cliente',
    featured: true,
    order: 2,
    problem:
      'Integradores e técnicos precisam encontrar peças técnicas, calcular frete e pagar online sem depender de atendimento manual.',
    solution:
      'Loja com busca, carrinho, cálculo de frete, pagamento, acompanhamento de pedidos, painel admin com campanhas agendadas no carrossel e um agente conversacional que ajuda o cliente a encontrar peças.',
    highlights: [
      'Agente de compras conversacional integrado à API da Anthropic',
      'Frete em tempo real com Melhor Envio (OAuth2)',
      'Pagamento com Mercado Pago Checkout Pro (Pix, cartão e boleto)',
      'Painel admin com CRUD de campanhas e agendamento por data',
    ],
    stack: {
      front: ['HTML', 'CSS', 'JavaScript', 'Bootstrap 5'],
      back: ['PHP', 'SQLite', 'PDO'],
      integrations: ['Mercado Pago', 'Melhor Envio', 'Anthropic API'],
    },
    images: [], // TODO: adicionar prints em src/assets/projects/pspart/
  },
  {
    slug: 'renovat-pneus',
    name: 'Renovat Pneus',
    tagline: 'Sistema de gestão para borracharia com estoque por lote e código de barras',
    category: 'gestao',
    context: 'cliente',
    featured: true,
    order: 3,
    problem:
      'A borracharia controlava estoque e vendas manualmente, sem rastreabilidade de lotes nem relatórios.',
    solution:
      'Sistema com estoque por lote (código de barras CODE128 único por lote), vendas e serviços, perfis ADM/Operador, dashboard com gráficos e exportação para Excel, instalado no próprio computador do cliente.',
    highlights: [
      'Instalador .exe (Inno Setup) com o Laravel rodando como serviço do Windows (NSSM), funcionando offline',
      'Estoque por lote com etiquetas de código de barras geradas automaticamente',
      'SPA com autenticação Sanctum via cookies HttpOnly',
      'Dashboard com Recharts e exportação de relatórios para Excel',
    ],
    stack: {
      front: ['React', 'TypeScript', 'Vite', 'TailwindCSS', 'TanStack Query', 'Recharts'],
      back: ['Laravel', 'Sanctum', 'SQLite'],
      infra: ['Windows Service (NSSM)', 'Inno Setup'],
    },
    images: [], // TODO: adicionar prints em src/assets/projects/renovat-pneus/
  },
  {
    slug: 'contae',
    name: 'ContaÊ',
    tagline: 'Plataforma de finanças pessoais por ciclo de fatura, instalável como app',
    category: 'saas',
    context: 'proprio',
    featured: true,
    order: 4,
    problem:
      'Controlar gastos por ciclo de cartão e benefícios numa planilha ficava lento e sujeito a erro.',
    solution:
      'Plataforma web com ciclos financeiros, faturas de cartão, benefícios, recálculo automático de saldo e gráficos, instalável no celular como PWA.',
    highlights: [
      'Regras de negócio financeiras isoladas em services com recálculo em cascata',
      'Importação de dados da planilha original via comando Artisan',
      'PWA instalável no iOS e no Android',
      'Deploy separado: API no Railway, front na Vercel',
    ],
    stack: {
      front: ['React', 'TypeScript', 'Vite', 'Recharts'],
      back: ['Laravel', 'SQLite'],
      infra: ['Railway', 'Vercel'],
    },
    images: [], // TODO: adicionar prints em src/assets/projects/contae/
  },
  {
    slug: 'prontbox',
    name: 'ProntBox',
    tagline: 'Identidade visual e site institucional da minha empresa de sistemas web',
    category: 'institucional',
    context: 'proprio',
    featured: false,
    order: 5,
    problem:
      'Lançar a empresa com uma presença profissional para públicos técnicos e não técnicos.',
    solution:
      'Identidade visual completa (logo, paleta, tipografia, assinatura de e-mail) e landing page com segmentos atendidos, portfólio e processo de trabalho.',
    highlights: [
      'Identidade visual criada do zero',
      'Deploy na Vercel com domínio próprio (.com.br) e DNS configurado',
    ],
    stack: {
      front: ['HTML5', 'CSS3'],
      infra: ['Vercel', 'Registro.br'],
    },
    links: { demo: 'https://www.prontbox.com.br' },
    images: [], // TODO: adicionar prints em src/assets/projects/prontbox/
  },
  {
    slug: 'irflow',
    name: 'IR.Flow',
    tagline: 'Gestão de declarações de IRPF para escritórios de contabilidade',
    category: 'gestao',
    context: 'cliente',
    featured: false,
    order: 6,
    problem: 'TODO',
    solution: 'TODO',
    highlights: [], // TODO: 3 a 5 desafios técnicos
    stack: {
      front: ['React', 'TypeScript'],
      back: ['Laravel', 'SQLite'],
    },
    images: projectImages('irflow', [
      'IR.Flow — tela de login',
      'IR.Flow — dashboard',
      'IR.Flow — edição de processo',
    ]),
  },

  // ── Outros projetos (textos e stacks do legacy/projWeb.html) ──
  {
    slug: 'atmparts',
    name: 'ATMParts',
    tagline: 'Site institucional e catálogo de produtos de automação',
    category: 'institucional',
    context: 'cliente',
    featured: false,
    order: 7,
    problem:
      'Uma empresa de soluções mecatrônicas precisava apresentar sua linha de produtos na web.',
    solution:
      'Site institucional com catálogo de motoredutores, travas eletrônicas, leitor biométrico e fechadura BLE.',
    highlights: [],
    stack: { front: ['HTML', 'CSS', 'JavaScript'] },
    images: projectImages('atmparts', [
      'ATMParts — página inicial',
      'ATMParts — catálogo de produtos',
      'ATMParts — contato',
    ]),
  },
  {
    slug: 'denuncias',
    name: 'Sistema de Denúncias',
    tagline: 'Plataforma para moradores relatarem problemas do bairro e da cidade',
    category: 'gestao',
    context: 'proprio',
    featured: false,
    order: 8,
    problem:
      'Moradores não tinham um canal simples para relatar problemas de ruas e serviços da cidade.',
    solution:
      'Plataforma web full-stack, com foco em acessibilidade, para registrar e acompanhar denúncias.',
    highlights: [],
    stack: {
      front: ['HTML', 'CSS', 'JavaScript'],
      back: ['Python', 'Django'],
    },
    images: projectImages('denuncias', ['Sistema de Denúncias — tela principal']),
  },
  {
    slug: 'tattoo-studio',
    name: 'Agendamento — Estúdio de Tattoo',
    tagline:
      'Projeto Integrador (Univesp): agendamento de horários com envio de referências de desenho',
    category: 'gestao',
    context: 'proprio',
    featured: false,
    order: 9,
    problem: 'O estúdio recebia pedidos de horário e referências de desenho de forma dispersa.',
    solution:
      'Página responsiva, feita como Projeto Integrador na Univesp, onde o cliente agenda o horário e envia as referências do desenho.',
    highlights: [],
    stack: {
      front: ['HTML', 'CSS', 'JavaScript'],
      back: ['PHP'],
    },
    images: [],
    video: projectVideo('tattoo-studio'),
  },
  {
    slug: 'paulista-despachante',
    name: 'Cadastro de Veículos — Paulista Despachante',
    tagline: 'Cadastro de veículos individual ou em massa a partir de PDFs',
    category: 'gestao',
    context: 'cliente',
    featured: false,
    order: 10,
    problem: 'Cadastrar veículos um a um a partir de documentos tomava tempo da equipe.',
    solution:
      'Cadastro individual ou em massa via upload de PDFs, extraindo automaticamente placa e tipo de documento.',
    highlights: [],
    stack: {
      front: ['HTML', 'CSS', 'JavaScript'],
      back: ['PHP'],
    },
    // vídeo removido (mostrava dados de veículos); placeholder até chegar um vídeo novo
    images: [],
  },
  {
    slug: 'agendamento-online',
    name: 'Sistema de Agendamento Online',
    tagline: 'Agendamento de serviços com escolha de horário disponível',
    category: 'gestao',
    context: 'cliente',
    featured: false,
    order: 11,
    problem: 'Agendar serviços por mensagem gerava conflitos de horário e retrabalho.',
    solution:
      'Sistema em que o cliente seleciona o serviço, registra seus dados e escolhe um horário disponível.',
    highlights: [],
    stack: {
      front: ['HTML', 'CSS', 'JavaScript'],
      back: ['PHP'],
    },
    images: [],
    video: projectVideo('agendamento-online'),
  },
];

/** Projetos ordenados pelo campo `order`. */
export const sortedProjects = [...projects].sort((a, b) => a.order - b.order);
export const featuredProjects = sortedProjects.filter((p) => p.featured);
