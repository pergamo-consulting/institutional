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

## Pendências antes de publicar

O wireframe é estrutural, então isto ainda é marcador:

- **Fotos** — os blocos hachurados. Trocar `<span class="photo-layer">` pela
  `<img>` real: a camada já é o alvo do paralaxe e tem folga de 8% em cima e
  embaixo para o deslocamento não descobrir borda.
- **Logos de clientes** — os retângulos em `hero.trustMarks` (`lib/content.ts`).
- **Métricas dos casos** — `−38%`, `9 → 1` e `11 dias → 4h` são exemplos;
  trocar pelos números reais.
- **Depoimento** — nome, cargo e empresa reais.
- **Casos** — os links "Ver o caso" apontam para `#contato`; trocar quando
  existirem as páginas internas.
- **Dados de contato** — WhatsApp, CNPJ e endereço estão como `0000`.
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
