/**
 * Todo o texto da home num lugar só.
 * Trocar copy aqui não exige mexer em componente.
 */

export const nav = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-trabalhamos', label: 'Como trabalhamos' },
  { href: '#casos', label: 'Casos' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#duvidas', label: 'Dúvidas' },
] as const;

export const hero = {
  eyebrow: 'Consultoria e software para operação crítica',
  title: 'Quem senta na reunião com você é quem escreve o código.',
  lead: 'Diagnóstico em 2 semanas, software rodando em 4. Sem troca de time depois da assinatura: o mesmo engenheiro do primeiro café atende o plantão.',
  primaryCta: { href: '#contato', label: 'Agendar diagnóstico gratuito' },
  secondaryCta: { href: '#casos', label: 'Ver casos' },
  trustLabel: 'Quem já roda com a gente',
  indexLabel: 'O que fazemos',
  index: [
    { num: '01', name: 'Consultoria de tecnologia' },
    { num: '02', name: 'Desenvolvimento sob medida' },
    { num: '03', name: 'Dados e integrações' },
    { num: '04', name: 'Squad dedicado' },
  ],
  note: 'Primeira conversa: 45 minutos, sem custo e sem vendedor. Você sai com escopo e faixa de investimento. Se o certo for não contratar a gente, a gente diz.',
};

/**
 * `value` alimenta a contagem animada. `to` é o número final,
 * `prefix`/`suffix` são o texto ao redor que não conta.
 */
export const stats = [
  {
    srLabel: 'Experiência somada do time',
    to: 17,
    prefix: '',
    suffix: ' anos',
    label: 'de engenharia somados entre os quatro',
  },
  {
    srLabel: 'Sistemas em produção',
    to: 2,
    prefix: '',
    suffix: '',
    label: 'sistemas nossos rodando em produção',
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
  lead: 'Em operação crítica, todo software genérico chega no ponto em que para de servir. Dali em diante, cada venda custa uma planilha nova. A gente entra antes de isso virar crise.',
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
    desc: 'Você sai com arquitetura, preço, prazo e risco por escrito, antes de assinar qualquer coisa. E não desenhamos nada que não estejamos dispostos a construir e sustentar depois.',
    tags: ['Diagnóstico', 'Arquitetura', 'Roadmap', 'Due diligence técnica'],
  },
  {
    num: '02',
    title: 'Desenvolvimento sob medida',
    desc: 'O sistema se adapta ao processo, nunca o contrário. Web, mobile e back-office desenhados em cima do fluxo que sua equipe já roda hoje.',
    tags: ['Aplicações web', 'Mobile', 'Back-office', 'Modernização de legado'],
  },
  {
    num: '03',
    title: 'Dados e integrações',
    desc: 'O dado certo no painel certo, sem exportar CSV às 23h. ERP, banco, marketplace e planilha conversando num fluxo só.',
    tags: ['APIs e integrações', 'ETL', 'Painéis', 'Automação'],
  },
  {
    num: '04',
    title: 'Squad dedicado',
    desc: 'Capacidade de engenharia dentro do seu rito, sem virar headcount seu. Board aberto, entrega quinzenal, contrato por capacidade e um ritmo que dá pra manter.',
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
      desc: 'Preço, prazo e o que fica de fora, por escrito, antes de começar. Projeto que só fecha se alguém se sacrificar, a gente não fecha.',
    },
    {
      when: 'Ciclos de 2 semanas',
      title: 'Construção',
      desc: 'Software em ambiente real a cada quinzena. Sem big bang no final.',
    },
    {
      when: 'Pós go-live',
      title: 'Sustentação',
      desc: 'SLA, monitoramento e evolução. Ou a entrega das chaves, com seu time sabendo operar sem a gente.',
    },
  ],
};

/**
 * Só entra caso que existe. `metric` é o que o projeto é, não um número
 * inventado: enquanto não houver resultado medido em produção, nada de %.
 */
export const cases = [
  {
    sector: 'Varejo · Estados Unidos',
    metric: 'Portal B2B',
    body: 'O pedido de revenda saiu do e-mail e da planilha e virou um portal próprio. O comprador fecha sozinho, o time comercial acompanha tudo num lugar só e passa a enxergar o que vende, para quem e em que ritmo.',
    // Unsplash, uso livre. Trocar por foto real da operação quando houver.
    image: '/cases/portal-b2b.jpg',
    imageAlt: 'Picape com faróis auxiliares acesos ao entardecer',
    href: '#contato',
  },
  {
    sector: 'Social · Eventos',
    metric: 'App de eventos',
    body: 'Aplicativo para organizar e gerir evento, do grande ao rolê de fim de semana. O combinado sai espalhado pelo grupo de mensagem e passa a ficar num lugar só: quem vai, quando e onde.',
    image: '/cases/app-eventos.jpg',
    imageAlt: 'Grupo de amigos com estrelinhas na beira da água à noite',
    href: '#contato',
  },
];

export const testimonial = {
  quote:
    'Com o dealer portal, ganhamos autonomia para fazer ações de marketing e passamos a vender produtos pelos quais o cliente antes passava batido. Hoje personalizamos promoção e catálogo por dealer, e o que era demorado virou simples.',
  name: 'Vinicius',
  role: 'CFO',
  company: 'Haizer USA · Varejo',
};

export const about = {
  title: 'Somos quatro. Nenhum de nós é só de reunião.',
  paragraphs: [
    'Quatro engenheiros, dezessete anos de estrada somados. Não existe camada de gerente entre você e quem escreve o código, e o time não muda depois da assinatura, mesmo quando isso custa margem.',
    'O André veio da engenharia civil, e isso ficou no jeito da casa: a gente lê a operação antes de propor sistema, do mesmo jeito que se lê a obra antes do projeto. Falamos o problema, não o que dá venda.',
    'Nosso critério de sucesso é ruim de vender: no fim do projeto, você decide melhor sozinho do que quando a gente chegou.',
  ],
  stats: [
    {
      srLabel: 'Tamanho do time',
      value: '4',
      label: 'pessoas, todas escrevendo código',
    },
    {
      srLabel: 'Trocas de time depois da assinatura',
      value: '0',
      label: 'trocas de time depois da assinatura',
    },
  ],
};

/**
 * Objeções que aparecem na primeira reunião, respondidas antes do formulário.
 * Toda resposta aqui é uma promessa que o site já faz em outro lugar:
 * se mudar uma, confira o par (processo, serviços, contato).
 */
export const faq = {
  title: 'O que perguntam antes de fechar.',
  items: [
    {
      q: 'Quanto tempo até eu ver software rodando?',
      a: 'Diagnóstico nas semanas 1 e 2, escopo e arquitetura nas semanas 3 e 4. A partir daí, entrega em ambiente real a cada quinzena. Sem big bang no final.',
    },
    {
      q: 'Quem faz o diagnóstico é quem escreve o código?',
      a: 'Sim. Quem senta na reunião é quem constrói e quem atende o plantão. Não trocamos o time depois da assinatura, mesmo quando isso custa margem pra gente.',
    },
    {
      q: 'A primeira conversa custa quanto?',
      a: 'Nada. São 45 minutos com um engenheiro e um consultor, sem vendedor na sala. Você sai com escopo, riscos e faixa de investimento por escrito, fechando ou não.',
    },
    {
      q: 'Vocês pedem assinatura antes de eu saber preço e prazo?',
      a: 'Não. Preço, prazo e o que fica de fora vão por escrito antes de começar. Projeto que só fecha se alguém se sacrificar, seja cliente, time ou sócio, a gente não fecha.',
    },
    {
      q: 'E se meu time interno já toca parte disso?',
      a: 'Melhor. Entramos no que está travado e trabalhamos dentro do rito de vocês, com board aberto. O objetivo não é criar dependência: é o seu time decidir melhor sozinho depois.',
    },
    {
      q: 'O que acontece depois do go-live?',
      a: 'Duas saídas, você escolhe: sustentação com SLA, monitoramento e evolução; ou a entrega das chaves, com seu time treinado para operar sem a gente.',
    },
    {
      q: 'Vocês só fazem software novo ou mexem no que já existe?',
      a: 'Os dois. Integrar e modernizar o que já roda costuma sair mais barato do que recomeçar do zero, e a gente diz quando esse é o caso. ERP, banco, marketplace e as planilhas que sustentam o fechamento entram no mesmo desenho.',
    },
    {
      q: 'E se o certo for não contratar vocês?',
      a: 'A gente diz. Falamos o problema, não o que dá venda. Se a saída for ajustar o processo, trocar de plano numa ferramenta que você já paga ou contratar uma pessoa em vez de um projeto, é isso que vai no relatório.',
    },
  ],
};

export const contact = {
  eyebrow: 'Contato · 07 / 07',
  title: 'Traga o problema.<br/>A primeira análise é por nossa conta.',
  lead: '45 minutos com um engenheiro e um consultor. Escopo, riscos e faixa de investimento por escrito, feche ou não. Se o certo for não contratar a gente, a gente diz.',
  email: 'contato@pergamo-consulting.com',
  whatsapp: { label: '+55 41 99601-2449', href: 'https://wa.me/5541996012449' },
  address: 'Curitiba · PR',
  fineprint: 'Resposta em 1 dia útil, de uma pessoa. Sem automação, sem spam.',
};

export const footer = {
  blurb:
    'Consultoria e software house em Curitiba. Tecnologia para operação crítica: segurança, velocidade e custo previsível.',
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
  // CNPJ provisório: enquanto o da Pergamo não sai, vale o da empresa do sócio.
  registration: 'CNPJ 41.718.301/0001-32 · Curitiba, Brasil',
};
