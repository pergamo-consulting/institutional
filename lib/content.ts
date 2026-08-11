/**
 * Todo o texto da home num lugar só.
 * Trocar copy aqui não exige mexer em componente.
 */

export const nav = [
  { href: "#servicos", label: "Serviços" },
  { href: "#como-trabalhamos", label: "Como trabalhamos" },
  { href: "#casos", label: "Casos" },
  { href: "#sobre", label: "Sobre" },
] as const;

export const hero = {
  eyebrow: "Consultoria + Software House",
  title: "Sistemas sob medida para operações que não podem parar.",
  lead: "Entendemos a sua operação antes da primeira linha de código — e ficamos até o sistema rodar sozinho, em produção.",
  primaryCta: { href: "#contato", label: "Agendar diagnóstico" },
  secondaryCta: { href: "#casos", label: "Ver casos" },
  trustLabel: "Operações que já rodam com a gente",
  // Larguras dos placeholders de logo de cliente (px).
  trustMarks: [96, 78, 110, 86],
  indexLabel: "O que fazemos",
  index: [
    { num: "01", name: "Consultoria de tecnologia" },
    { num: "02", name: "Desenvolvimento sob medida" },
    { num: "03", name: "Dados e integrações" },
    { num: "04", name: "Squad dedicado" },
  ],
  note: "Diagnóstico de 45 minutos, sem custo. Você sai com escopo, riscos e uma faixa de investimento — mesmo que não feche com a gente.",
};

/**
 * `value` alimenta a contagem animada. `to` é o número final,
 * `prefix`/`suffix` são o texto ao redor que não conta.
 */
export const stats = [
  {
    srLabel: "Tempo de mercado",
    to: 12,
    prefix: "",
    suffix: " anos",
    label: "de software rodando em produção",
  },
  {
    srLabel: "Projetos entregues",
    to: 80,
    prefix: "+",
    suffix: "",
    label: "projetos entregues ponta a ponta",
  },
  {
    srLabel: "Tempo até o primeiro deploy",
    to: 4,
    prefix: "",
    suffix: " semanas",
    label: "do primeiro contato ao primeiro deploy",
  },
];

export const whereWeFit = {
  title: "Quando o sistema de prateleira vira o gargalo.",
  lead: "A empresa cresceu, o processo ficou específico e o ERP não acompanha. O time compensa com planilha, retrabalho e gente boa fazendo trabalho de máquina. É aí que a gente chega.",
  symptoms: [
    {
      key: "A",
      title: "Planilha virou sistema crítico",
      desc: "Uma pessoa segura o processo inteiro e ninguém mais entende a fórmula.",
    },
    {
      key: "B",
      title: "Legado que ninguém encosta",
      desc: "Funciona, mas cada mudança custa semanas e um susto no deploy.",
    },
    {
      key: "C",
      title: "Time interno sem banda",
      desc: "A fila de demandas cresce mais rápido do que dá para contratar.",
    },
  ],
};

export const services = [
  {
    num: "01",
    title: "Consultoria de tecnologia",
    desc: "Diagnóstico da operação, desenho de arquitetura e um roadmap que cabe no seu orçamento e no seu time.",
    tags: ["Diagnóstico", "Arquitetura", "Roadmap", "Due diligence técnica"],
  },
  {
    num: "02",
    title: "Desenvolvimento sob medida",
    desc: "Web, mobile e back-office construídos em cima do seu processo — não do processo genérico de um produto de prateleira.",
    tags: ["Aplicações web", "Mobile", "Back-office", "Modernização de legado"],
  },
  {
    num: "03",
    title: "Dados e integrações",
    desc: "ERP, marketplace, banco e planilha falando a mesma língua, com painel que a diretoria abre sem pedir ajuda.",
    tags: ["APIs e integrações", "ETL", "Painéis", "Automação"],
  },
  {
    num: "04",
    title: "Squad dedicado",
    desc: "Um time nosso acoplado ao seu, com rito, board aberto e entrega quinzenal. Você contrata capacidade, não headcount.",
    tags: ["Time dedicado", "Sustentação", "SRE / observabilidade"],
  },
];

export const process = {
  title: "Quatro etapas, sem surpresa no meio do caminho.",
  steps: [
    {
      when: "Semana 1–2",
      title: "Diagnóstico",
      desc: "Entrevistas, mapa de sistemas e a lista honesta do que dói.",
    },
    {
      when: "Semana 3–4",
      title: "Escopo e arquitetura",
      desc: "O que entra, o que fica pra depois, quanto custa e por quê.",
    },
    {
      when: "Ciclos de 2 semanas",
      title: "Construção",
      desc: "Entrega quinzenal em ambiente real, com o seu time no board.",
    },
    {
      when: "Pós go-live",
      title: "Sustentação",
      desc: "SLA, monitoramento e evolução — ou transferência pro seu time.",
    },
  ],
};

export const cases = [
  {
    sector: "Logística",
    metric: "~38%",
    body: "no tempo de fechamento de rota depois de trocar o roteirizador legado por um serviço próprio.",
    href: "#contato",
  },
  {
    sector: "Indústria",
    metric: "9 → 2",
    body: "planilhas paralelas viraram um único painel de apontamento de chão de fábrica.",
    href: "#contato",
  },
  {
    sector: "Serviços financeiros",
    metric: "11 dias",
    body: "de onboarding de cliente reduzidos a poucas horas com integração e esteira automática.",
    href: "#contato",
  },
];

export const testimonial = {
  quote:
    "Contratamos esperando um relatório. Recebemos um sistema rodando — e o time deles explicou cada decisão pro nosso.",
  name: "Nome do cliente",
  role: "Diretor de Operações",
  company: "Empresa · setor",
};

export const about = {
  title: "Gente sênior, do diagnóstico ao plantão.",
  paragraphs: [
    "Quem senta com você na reunião de escopo é quem escreve o código. Não repassamos o projeto pra um time júnior depois da assinatura.",
    "Somos uma equipe enxuta de engenheiros e consultores, com prática em operações que não podem cair.",
  ],
  stats: [
    { srLabel: "Senioridade do time", value: "100%", label: "do time sênior ou especialista" },
    { srLabel: "Renovação de contrato", value: "92%", label: "dos clientes renovam contrato" },
  ],
};

export const contact = {
  eyebrow: "Contato · 06 / 06",
  title: "Comece pelo diagnóstico. É de graça.",
  lead: "45 minutos com um engenheiro e um consultor. Você sai com escopo, riscos e faixa de investimento por escrito.",
  email: "contato@pergamo-consulting.com",
  whatsapp: { label: "+55 41 99601-2449", href: "https://wa.me/5541996012449" },
  address: "Curitiba · PR",
  fineprint: "Retornamos em até 1 dia útil. Sem lista de e-mail, sem follow-up automático.",
};

export const footer = {
  blurb:
    "Consultoria e software house. Sistemas sob medida para operações que não podem parar.",
  columns: [
    {
      title: "Serviços",
      links: [
        { label: "Consultoria", href: "#servicos" },
        { label: "Sob medida", href: "#servicos" },
        { label: "Dados", href: "#servicos" },
        { label: "Squad", href: "#servicos" },
      ],
    },
    {
      title: "Empresa",
      links: [
        { label: "Sobre", href: "#sobre" },
        { label: "Casos", href: "#casos" },
        { label: "Carreiras", href: "#contato" },
        { label: "Blog", href: "#contato" },
      ],
    },
    {
      title: "Contato",
      links: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/pergamo-consulting" },
        { label: "GitHub", href: "https://github.com/pergamo-consulting" },
        { label: "Contato", href: "mailto:contato@pergamo-consulting.com" },
      ],
    },
  ],
  legal: "© 2026 Pergamo Consulting",
  registration: "CNPJ 00.000.000/0001-00 · Curitiba, Brasil",
};
