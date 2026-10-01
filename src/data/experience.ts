import type { ProjectImage } from './types';
import { profile } from './profile';
import fech1 from '../assets/experiencia/fech_img1.png';
import fech2 from '../assets/experiencia/fech_img2.png';
import fech3 from '../assets/experiencia/fech_img3.png';
import fech4 from '../assets/experiencia/fech_img4.png';
import fech5 from '../assets/experiencia/fech_img5.png';
import fech6 from '../assets/experiencia/fech_img6.png';
import sge1 from '../assets/experiencia/projeto2_img1.png';
import sge2 from '../assets/experiencia/projeto2_img2.png';
import sge3 from '../assets/experiencia/projeto2_img3.png';
import db1 from '../assets/experiencia/projeto3_img3.png';
import db2 from '../assets/experiencia/projeto3_img4.png';

export type ExperienceBlock = {
  id: string;
  title: string;
  /** Abertura do bloco: o mesmo texto do "Também atuo com" da home. */
  intro: string;
  /** Resumo das antigas páginas susten.Software.html e dba.html. */
  items: { title: string; text: string }[];
  images: ProjectImage[];
};

const [sustentacao, banco] = profile.complementar;

export const experience: ExperienceBlock[] = [
  {
    id: 'sustentacao',
    title: sustentacao.title,
    intro: sustentacao.text,
    items: [
      {
        title: 'Suporte ao ERP',
        text: 'Suporte ao sistema ERP de uma pequena empresa, mantendo integrados os processos administrativos, financeiros e operacionais.',
      },
      {
        title: 'Correções e testes',
        text: 'Análise e resolução de problemas, testes e adaptação do sistema às necessidades do negócio.',
      },
      {
        title: 'Evolução contínua',
        text: 'Novas funcionalidades e melhorias em módulos existentes, entregando valor sem comprometer a estabilidade.',
      },
    ],
    images: [
      {
        src: sge2,
        alt: 'SGE — Sistema de Controle: tela de abertura de chamados com o menu de módulos',
      },
      { src: sge1, alt: 'Tela de chamados do SGE em edição no Visual Studio' },
      { src: sge3, alt: 'Código C# do SGE no Visual Studio' },
      { src: fech1, alt: 'Gerenciador de senhas de fechaduras: tela de login' },
      {
        src: fech2,
        alt: 'Gerenciador de senhas de fechaduras: tela principal com a lista de fechaduras',
      },
      { src: fech3, alt: 'Gerenciador de senhas de fechaduras: consulta e cadastro de fechaduras' },
      {
        src: fech4,
        alt: 'Gerenciador de senhas de fechaduras: log de eventos com filtros e exportação em CSV, HTML e PDF',
      },
      {
        src: fech5,
        alt: 'Gerenciador de senhas de fechaduras: ativação de senhas de uma fechadura',
      },
      {
        src: fech6,
        alt: 'Gerenciador de senhas de fechaduras: consulta de usuários e perfis de acesso',
      },
    ],
  },
  {
    id: 'banco-de-dados',
    title: banco.title,
    intro: banco.text,
    items: [
      {
        title: 'Administração',
        text: 'Manutenção, proteção e operação dos bancos de dados do ERP, garantindo que os dados sejam armazenados e recuperados corretamente.',
      },
      {
        title: 'Estrutura e desempenho',
        text: 'Estruturação e otimização do banco integrado ao ERP, com foco em performance, integridade e disponibilidade.',
      },
    ],
    images: [
      { src: db1, alt: 'SQL Server Management Studio com as tabelas do banco do ERP' },
      { src: db2, alt: 'Diagrama do modelo de dados no MySQL Workbench' },
    ],
  },
];
