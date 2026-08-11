/**
 * Todo o texto da home num lugar só.
 * Trocar copy aqui não exige mexer em componente.
 */

export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '#casos', label: 'Casos' },
  { href: '#sobre', label: 'Sobre' },
] as const;

export const hero = {
  eyebrow: 'Consultoria + Software House',
  title: 'Software feito por quem entendeu a sua operação primeiro.',
  lead: 'Diagnóstico, arquitetura, código e sustentação — o mesmo time do primeiro dia ao plantão.',
  primaryCta: { href: '#contato', label: 'Agendar diagnóstico' },
  secondaryCta: { href: '#casos', label: 'Ver casos' },
  trustLabel: 'Quem já roda com a gente',
  // Larguras dos placeholders de logo de cliente (px).
  trustMarks: [96, 78, 110, 86],
  indexLabel: 'O que fazemos',
  index: [
    { num: '01', name: 'Consultoria de tecnologia' },
    { num: '02', name: 'Desenvolvimento sob medida' },
    { num: '03', name: 'Dados e integrações' },
    { num: '04', name: 'Squad dedicado' },
  ],
  note: 'Primeira conversa: 45 minutos, sem custo e sem vendedor. Você sai com escopo e faixa de investimento.',
};

/**
 * `value` alimenta a contagem animada. `to` é o número final,
 * `prefix`/`suffix` são o texto ao redor que não conta.
 */
export const stats = [
  {
    srLabel: 'Tempo de mercado',
    to: 12,
    prefix: '',
    suffix: ' anos',
    label: 'construindo sistemas críticos',
  },
  {
    srLabel: 'Projetos em produção',
    to: 80,
    prefix: '+',
    suffix: '',
    label: 'projetos em produção hoje',
  },
  {
    srLabel: 'Tempo até o primeiro deploy',
    to: 4,
    prefix: '',
    suffix: ' semanas',
    label: 'até o primeiro deploy',
  },
];

export const whereWeFit = {
  title: 'O sinal clássico: o processo cresceu e o sistema não.',
  lead: 'Toda operação chega no ponto em que o software genérico para de servir. Dali em diante, cada venda custa uma planilha nova. A gente entra antes de isso virar crise.',
  symptoms: [
    {
      key: 'A',
      title: 'A planilha que ninguém pode abrir errado',
      desc: 'O fechamento do mês depende de uma aba que só uma pessoa entende.',
    },
    {
      key: 'B',
      title: 'O sistema que ninguém quer mexer',
      desc: 'Mudar um campo leva três semanas e um susto no deploy.',
    },
    {
      key: 'C',
      title: 'O backlog que só cresce',
      desc: 'O time interno apaga incêndio; o roadmap fica pra depois.',
    },
  ],
};

export const services = [
  {
    num: '01',
    title: 'Consultoria de tecnologia',
    desc: 'Mapeamos a operação, desenhamos a arquitetura e entregamos um plano com preço, prazo e risco — antes de você assinar qualquer coisa.',
    tags: ['Diagnóstico', 'Arquitetura', 'Roadmap', 'Due diligence técnica'],
  },
  {
    num: '02',
    title: 'Desenvolvimento sob medida',
    desc: 'Web, mobile e back-office desenhados em cima do seu fluxo real. O sistema se adapta ao processo — nunca o contrário.',
    tags: ['Aplicações web', 'Mobile', 'Back-office', 'Modernização de legado'],
  },
  {
    num: '03',
    title: 'Dados e integrações',
    desc: 'ERP, banco, marketplace e planilha num fluxo só. O dado certo no painel certo — sem exportar CSV às 23h.',
    tags: ['APIs e integrações', 'ETL', 'Painéis', 'Automação'],
  },
  {
    num: '04',
    title: 'Squad dedicado',
    desc: 'Engenheiros nossos dentro do seu rito: board aberto, entrega quinzenal, contrato por capacidade — não por headcount.',
    tags: ['Time dedicado', 'Sustentação', 'SRE / observabilidade'],
  },
];

export const process = {
  title: 'Do primeiro café ao go-live, você sabe onde está.',
  steps: [
    {
      when: 'Semana 1–2',
      title: 'Diagnóstico',
      desc: 'Duas semanas dentro da operação: entrevistas, mapa de sistemas, lista do que dói.',
    },
    {
      when: 'Semana 3–4',
      title: 'Escopo e arquitetura',
      desc: 'Preço, prazo e o que fica de fora — por escrito, antes de começar.',
    },
    {
      when: 'Ciclos de 2 semanas',
      title: 'Construção',
      desc: 'Software em ambiente real a cada quinzena. Sem big bang no final.',
    },
    {
      when: 'Pós go-live',
      title: 'Sustentação',
      desc: 'SLA, monitoramento e evolução — ou a entrega das chaves pro seu time.',
    },
  ],
};

export const cases = [
  {
    sector: 'Logística',
    metric: '−38%',
    body: 'no fechamento de rota. O roteirizador legado virou um serviço próprio, desenhado para a malha deles.',
    href: '#contato',
  },
  {
    sector: 'Indústria',
    metric: '9 → 1',
    body: 'nove planilhas paralelas viraram um painel de apontamento direto no chão de fábrica.',
    href: '#contato',
  },
  {
    sector: 'Serviços financeiros',
    metric: '11 dias → 4h',
    body: 'de onboarding de cliente. Integração com o core e esteira automática de documentos.',
    href: '#contato',
  },
];

export const testimonial = {
  quote:
    'Esperávamos um diagnóstico em PDF. Recebemos um sistema em produção — e nosso time aprendeu junto, decisão por decisão.',
  name: 'Nome do cliente',
  role: 'Diretor de Operações',
  company: 'Empresa · setor',
};

export const about = {
  title: 'Sênior na reunião, sênior no código.',
  paragraphs: [
    'Quem desenha o escopo com você é quem escreve o código depois. Nada de trocar o time depois da assinatura.',
    'Somos poucos, por escolha: engenheiros e consultores que já rodaram operações de logística, indústria e finanças por dentro.',
  ],
  stats: [
    {
      srLabel: 'Senioridade do time',
      value: '100%',
      label: 'do time sênior ou especialista',
    },
    {
      srLabel: 'Renovação de contrato',
      value: '92%',
      label: 'dos clientes renovam contrato',
    },
  ],
};

export const contact = {
  eyebrow: 'Contato · 06 / 06',
  title: 'Traga o problema.<br/>A primeira análise é por nossa conta.',
  lead: '45 minutos com um engenheiro e um consultor. Escopo, riscos e faixa de investimento por escrito — feche ou não.',
  email: 'contato@pergamo-consulting.com',
  whatsapp: { label: '+55 41 99601-2449', href: 'https://wa.me/5541996012449' },
  address: 'Curitiba · PR',
  fineprint: 'Resposta em 1 dia útil, de uma pessoa. Sem automação, sem spam.',
};

export const footer = {
  blurb:
    'Consultoria e software house. Software feito por quem entendeu a operação primeiro.',
  columns: [
    {
      title: 'Serviços',
      links: [
        { label: 'Consultoria', href: '#servicos' },
        { label: 'Sob medida', href: '#servicos' },
        { label: 'Dados', href: '#servicos' },
        { label: 'Squad', href: '#servicos' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre', href: '#sobre' },
        { label: 'Casos', href: '#casos' },
        { label: 'Carreiras', href: '#contato' },
        { label: 'Blog', href: '#contato' },
      ],
    },
    {
      title: 'Contato',
      links: [
        {
          label: 'LinkedIn',
          href: 'https://www.linkedin.com/company/pergamo-consulting',
        },
        { label: 'GitHub', href: 'https://github.com/pergamo-consulting' },
        {
          label: 'Contato',
          href: 'mailto:contato@pergamo-consulting.com',
        },
      ],
    },
  ],
  legal: '© 2026 Pergamo Consulting',
  registration: 'CNPJ 00.000.000/0001-00 · Curitiba, Brasil',
};
