import type { Profile } from './types';

export const profile: Profile = {
  stats: [
    { value: '4+', label: 'anos em desenvolvimento' },
    { value: '7', label: 'projetos para clientes' },
    { value: '4', label: 'sistemas próprios em uso diário' },
  ],
  complementar: [
    {
      title: 'Sustentação C# / .NET',
      text: 'Manutenção e evolução de sistemas internos em C#, com foco em estabilidade, correções e novas funcionalidades.',
    },
    {
      title: 'SQL Server e bancos de ERP',
      text: 'Administração de bancos SQL Server de sistemas ERP: consultas, manutenção e proteção dos dados.',
    },
  ],
  links: {
    whatsapp: 'https://wa.me/5515981164972',
    linkedin: 'https://www.linkedin.com/in/filipe-rodrigues-dos-santos-79781894/',
    github: 'https://github.com/FilSantos12',
    cv: 'https://drive.google.com/file/d/14x6GAMKbA38yWJrjQxBtghEammo6nQCS/view?usp=drive_link',
  },
};
