"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import type { RefObject } from "react";

// GSAP só toca o DOM no cliente. O guard evita qualquer execução durante o
// prerender estático do Next.
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
}

/* -------------------------------------------------------------------------- */
/*  Identidade de movimento da marca                                           */
/*                                                                            */
/*  Arquétipo: Corporate. O site vende confiabilidade de engenharia, então o   */
/*  movimento é decidido e sem overshoot — nada quica.                         */
/* -------------------------------------------------------------------------- */

/** Três durações, e só. Qualquer animação sai de uma delas. */
export const DUR = {
  quick: 0.18, // feedback de interação
  base: 0.4, // troca de estado, entrada de card
  slow: 0.6, // revelação de seção
} as const;

/** Uma curva para ~80% das animações. Entrada desacelera, nunca acelera. */
export const EASE = {
  out: "power2.out",
  inOut: "power3.inOut",
  none: "none",
} as const;

/** Teto de 500ms no stagger total: acima disso o último item parece travado. */
export const STAGGER = {
  tight: 0.04,
  base: 0.07,
  wide: 0.1,
} as const;

/** Deslocamento de entrada. Curto o bastante para ler como fade, não como slide. */
export const RISE = 24;

/**
 * Envelope padrão de toda animação da página.
 *
 * - roda dentro de `useGSAP`, com `scope`, então seletores não vazam da seção
 *   e tudo é revertido no unmount;
 * - `build` só é chamado quando o usuário NÃO pede movimento reduzido. Quem
 *   pede simplesmente vê a página estática — que é o estado natural do CSS,
 *   já que nada aqui nasce com `opacity: 0` na folha de estilo.
 */
export function useMotion(
  scope: RefObject<HTMLElement | null>,
  build: () => (() => void) | void,
  deps: unknown[] = []
) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // Repassa o retorno de `build` para o matchMedia: é o cleanup da seção
      // (ex.: SplitText.revert(), que precisa devolver o texto original ao DOM).
      mm.add("(prefers-reduced-motion: no-preference)", () => build());
      return () => mm.revert();
    },
    { scope, dependencies: deps }
  );
}

/**
 * Entrada padrão de seção: sobe e aparece quando entra na viewport.
 *
 * `once: true` — entrada de conteúdo institucional não deve reanimar a cada
 * vez que o usuário rola de volta; isso vira ruído.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element,
  vars: gsap.TweenVars = {}
) {
  return gsap.from(targets, {
    autoAlpha: 0,
    y: RISE,
    duration: DUR.slow,
    ease: EASE.out,
    stagger: STAGGER.base,
    scrollTrigger: { trigger, start: "top 85%", once: true },
    ...vars,
  });
}

/**
 * Camada secundária: as réguas lime crescem da esquerda em vez de aparecer.
 * É o gesto que dá vida ao layout sem competir com o texto.
 */
export function drawRule(targets: gsap.TweenTarget, trigger: Element, delay = 0) {
  return gsap.from(targets, {
    scaleX: 0,
    transformOrigin: "left center",
    duration: DUR.base,
    ease: EASE.out,
    delay,
    scrollTrigger: { trigger, start: "top 85%", once: true },
  });
}

/**
 * Camada ambiente: paralaxe discreto em blocos de imagem.
 * Só em elementos decorativos — nunca em texto (desconforto de leitura).
 */
export function parallax(target: gsap.TweenTarget, trigger: Element, amount = 8) {
  return gsap.fromTo(
    target,
    { yPercent: -amount / 2 },
    {
      yPercent: amount / 2,
      ease: EASE.none,
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: 0.5 },
    }
  );
}

/** Contagem numérica. `format` monta o texto final a cada frame. */
export function countUp(
  node: HTMLElement,
  to: number,
  trigger: Element,
  format: (value: number) => string
) {
  const counter = { value: 0 };
  return gsap.to(counter, {
    value: to,
    duration: 1.1,
    ease: EASE.out,
    snap: { value: 1 },
    scrollTrigger: { trigger, start: "top 85%", once: true },
    onUpdate: () => {
      node.textContent = format(counter.value);
    },
  });
}

/**
 * O HTML é estático: o navegador pinta a página antes de a hidratação rodar.
 * Se o bundle demorou, o usuário JÁ VIU o conteúdo — escondê-lo para reanimar
 * seria uma piscada que parece defeito.
 *
 * Só animamos entrada de load quando a hidratação chegou rápido o bastante
 * para que o efeito ainda faça sentido. Acima disso, entrega estático.
 *
 * Não vale para animação de scroll: aquela é disparada por gesto do usuário,
 * nunca compete com o primeiro paint.
 */
export function isFreshLoad(budgetMs = 1500) {
  if (typeof performance === "undefined") return false;
  return performance.now() < budgetMs;
}

/**
 * Revelação de headline linha a linha, subindo por trás de uma máscara.
 *
 * `autoSplit` refaz a divisão quando a fonte termina de carregar ou a largura
 * muda — sem isso as linhas quebram no lugar errado. Devolve um `revert` que
 * restaura o texto original (importante para leitores de tela).
 *
 * Se o plugin falhar por qualquer motivo, cai num fade simples: o título nunca
 * fica preso invisível.
 */
export function revealHeadline(
  el: HTMLElement,
  { delay = 0, scroll = true }: { delay?: number; scroll?: boolean } = {}
) {
  // Abaixo da dobra a revelação tem de esperar o scroll. Sem isso a animação
  // roda no load, fora da tela, e o usuário só encontra o estado final.
  // O hero é a exceção: já está visível, então dispara direto (scroll: false).
  const scrollTrigger = scroll
    ? { trigger: el, start: "top 88%" as const, once: true }
    : undefined;

  try {
    const split = SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 110,
          duration: DUR.slow,
          ease: EASE.out,
          stagger: STAGGER.base,
          delay,
          scrollTrigger,
        }),
    });
    return () => split.revert();
  } catch {
    gsap.from(el, {
      autoAlpha: 0,
      y: 20,
      duration: DUR.slow,
      ease: EASE.out,
      delay,
      scrollTrigger,
    });
    return () => {};
  }
}

export { gsap, ScrollTrigger, SplitText };
