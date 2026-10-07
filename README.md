# Pergamo Consulting — site institucional

Next.js (App Router) + GSAP. Implementação da home a partir do wireframe
**`Pergamo - Wireframes Desktop.dc.html`** (opção `3a`, canvas desktop 1280) do
projeto Claude Design [`96537300`](https://claude.ai/design/p/96537300-a4b8-4e76-a32a-f358baa5cf66).
O texto em produção é a copy da variante `4a`.

Tipografia: **Space Grotesk** em tudo — inclusive rótulos, contadores e números.
Não há segunda família; `--sans` é o único token de fonte.

## Rodar

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # export estático em out/
```

`output: "export"` — o build gera HTML puro. Deploy é subir `out/` em qualquer
CDN ou host estático; não precisa de servidor Node.

## Estrutura

```
app/
  layout.tsx          metadata, Open Graph, fontes via next/font
  page.tsx            composição das seções
  globals.css         tokens, reset e primitivas (.shell, .btn, .eyebrow, .photo…)
components/
  Header.tsx          menu, estado de scroll, seção atual
  Footer.tsx          server component (não precisa de JS)
  sections/           uma pasta plana: Hero, Stats, WhereWeFit, Services,
                      Process, Cases, Testimonial, About, Contact
                      (cada uma com seu .module.css)
lib/
  content.ts          todo o texto da página
  motion.ts           tokens de movimento + hooks GSAP
public/               logotipos Pergamo (SVG)
_legacy-static/       versão HTML anterior — pode apagar
```

Regras de layout de cada seção vivem no `*.module.css` ao lado do componente,
com os próprios breakpoints. O que é compartilhado está em `globals.css`.

### Seções

| # | Âncora | Conteúdo |
|---|--------|----------|
| — | `#topo` | Header + hero escuro com índice de serviços |
| — | — | Faixa de números (contagem animada) |
| 01 | `#onde-entramos` | Sintomas A / B / C |
| 02 | `#servicos` | Quatro serviços com tags |
| 03 | `#como-trabalhamos` | Processo em quatro etapas |
| 04 | `#casos` | Três casos com métrica |
| — | — | Depoimento (faixa escura) |
| 05 | `#sobre` | Time + dois indicadores |
| 06 | `#contato` | Formulário de diagnóstico |

## Movimento

Arquétipo **Corporate**: o site vende confiabilidade de engenharia, então o
movimento é decidido e sem overshoot. Três constantes, todas em `lib/motion.ts`:

- **easing assinatura** `power2.out` para ~80% das animações;
- **três durações** — 180ms rápido, 400ms padrão, 600ms revelação;
- **entrada padrão** fade + subida de 24px, stagger 60–70ms (teto de 500ms).

Em camadas: o texto é a primária, as réguas lime que crescem da esquerda são a
secundária, e o paralaxe discreto nos blocos de foto é a ambiente.

Toda animação passa por `useMotion()`, que embrulha `useGSAP` e garante duas
coisas: escopo por seção (seletores não vazam) e revert automático no unmount.

### Quatro decisões que não são óbvias

**Nada nasce invisível no CSS.** O estado inicial é aplicado pelo GSAP, nunca
por `opacity: 0` na folha de estilo. Assim quem está sem JavaScript — e qualquer
crawler — recebe a página inteira, e uma falha no ScrollTrigger não deixa meia
página em branco.

**Entrada de load só roda se a hidratação foi rápida** (`isFreshLoad()`). O HTML
é estático, então o navegador pinta antes de hidratar; se o bundle demorou, o
usuário já viu o hero e escondê-lo para reanimar pareceria defeito. Acima de
1,5s a página simplesmente aparece pronta. Animação de scroll não tem essa
trava — ela responde a um gesto, nunca compete com o primeiro paint.

**A máscara da headline é desfeita no fim do tween.** O `SplitText` embrulha
cada linha numa máscara com `overflow: clip` da altura exata da caixa de linha.
Como os títulos usam `line-height: 1` — menor que o desenho da fonte —, a
máscara cortava descendentes e acentos (`g`, `p`, `ç`) e continuava cortando
depois que a animação acabava. Ela só serve enquanto a linha sobe, então
`onComplete`/`onInterrupt` devolvem `overflow: visible`.

**`transform` ficou fora da `transition` do `.btn`.** GSAP anima transform
inline; transição CSS na mesma propriedade briga com ele e prende o elemento no
valor inicial do tween. Cor transiciona no CSS, deslocamento é do GSAP.

### Movimento reduzido

Com `prefers-reduced-motion: reduce`, `useMotion` não chega a criar animação
nenhuma — a página fica no estado natural do CSS, que é o layout final completo.

## Verificação

Layout conferido em 1280px e 390px contra o wireframe, e o estado pós-animação
conferido contra o estado estático (mesma renderização, ao pixel). O conteúdo
das seis seções está presente no HTML de `out/index.html`.

## Lista de espera do Velo

A contagem que aparece na seção de produtos é um campo em `lib/content.ts`
(`products.items[].waitlist.count`), mantida à mão. Isso é decisão, não
pendência: enquanto a atualização for uma linha de vez em quando, infra para
isso custa mais do que resolve.

**A regra que não se quebra:** primeiro o cliente entra na lista que vocês
controlam (planilha, CRM, o que for), depois o número muda aqui. O número no
site é consequência do registro, nunca a fonte dele — e nunca um número que
não seja verdade. A página inteira foi reescrita para não ter dado inventado;
um contador inflado destrói exatamente o que ela ganhou.

**Quando automatizar:** quando atualizar passar a doer (mais de uma vez por
semana) ou o número passar da dezena, que é quando ele começa a vender sozinho.
Aí existem dois caminhos, nesta ordem de preferência:

1. **Contador na origem.** O site é servido como assets do Cloudflare Workers
   (`wrangler.jsonc`), então o mesmo deploy aceita uma rota de função sem
   infra nova: `POST /api/lista-espera` grava o lead e incrementa um contador
   em KV; `GET /api/lista-espera/contagem` devolve `{ count }`. A seção busca
   isso no carregamento e mantém o valor do `content.ts` como fallback, para a
   página nunca aparecer sem número se a rota falhar. Quem entra na lista
   incrementa o número, e ninguém atualiza nada à mão.
2. **Contagem no build.** Se não quiser JavaScript extra no cliente, um cron
   diário no GitHub Actions lê o contador e refaz o build. O número fica até
   24h atrasado, em troca de zero estado no navegador.

Enquanto o número for baixo, vale lembrar que ele é prova social fraca: dois
na lista convence menos que não mostrar contagem nenhuma. Se preferir esconder
até um patamar, é um `if` na seção.

## Pendências antes de publicar

- **CNPJ** — o do rodapé é o da empresa particular do sócio, provisório até
  sair o da Pergamo.
- **Casos** — os links apontam para `#contato`; trocar quando existirem as
  páginas internas de caso.
- **Formulário** — sem endpoint, o envio abre o cliente de e-mail com a
  mensagem pronta. Para postar num handler real:

  ```sh
  # .env.local
  NEXT_PUBLIC_CONTACT_ENDPOINT=https://…
  ```

  O componente faz `POST` do `FormData` e espera resposta `2xx`.

## Nota de dependências

`npm audit` aponta 3 vulnerabilidades altas em `postcss` e `sharp`, ambas
transitivas do Next.js e usadas só em build — não vão para o navegador.
`npm audit fix --force` alteraria a versão do Next; melhor esperar o upstream.
