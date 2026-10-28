import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroBanner from "@/assets/sabores-que-crescem-hero.webp.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sabores que Crescem — 105 Receitas para Bebés dos 6 aos 24 meses" },
      {
        name: "description",
        content:
          "E-book com 105 receitas de alimentação infantil para bebés dos 6 aos 24 meses, com bónus sobre recusa alimentar.",
      },
      {
        property: "og:title",
        content: "Sabores que Crescem — 105 Receitas para Bebés dos 6 aos 24 meses",
      },
      {
        property: "og:description",
        content: "105 receitas de alimentação infantil, organizadas por idade, dos 6 aos 24 meses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      // O banner é o maior elemento visível (LCP): pré-carregado com prioridade máxima.
      { rel: "preload", as: "image", href: heroBanner.url, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "text/javascript",
        children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','4083380155288045');fbq('track','PageView');`,
      },
    ],
  }),
});

// ================== EDIÇÃO RÁPIDA ==================
// Altere aqui os textos, o prazo do temporizador e o checkout.

const CHECKOUT_URL = "https://checkout.escalepay.com/5515180";

// Temporizador da barra superior. Inicia em 9:47 (587 segundos) no momento em
// que o visitante entra na página. Persistido no navegador: o mesmo visitante
// não recebe tempo novo ao actualizar a página.
const TIMER_DURATION_SECONDS = 9 * 60 + 47;
const TIMER_STORAGE_KEY = "sqc-offer-timer-start";
const TIMER_LABEL = "Esta oportunidade termina em:";


const guideCategories = [
  "Papinhas leves",
  "Papinhas mais grossas",
  "Sopinhas para bebés",
  "Outras ideias de refeições infantis",
  "Pratinhos adaptados à mesa da família",
];

const deliverySteps = [
  {
    title: "Faz a tua compra",
    text: "Acede ao checkout e preenche os dados solicitados.",
  },
  {
    title: "Efectua o pagamento",
    text: "Escolhe um dos métodos de pagamento disponíveis no checkout.",
  },
  {
    title: "Recebe o teu e-book",
    text: "Após a confirmação do pagamento, recebes o acesso ao e-book por e-mail. O WhatsApp pode ser utilizado como apoio à entrega, quando configurado.",
  },
];

// Depoimentos reais já fornecidos (WebP comprimido em public/depoimentos).
// Para adicionar ou remover, edite esta lista.
const testimonials = [
  {
    src: "/depoimentos/depoimento-judite.webp",
    alt: "Depoimento real de cliente mostrando uma refeição preparada para o bebé",
    width: 720,
    height: 1279,
  },
  {
    src: "/depoimentos/depoimento-anatercia.webp",
    alt: "Depoimento real de cliente mostrando uma receita preparada para o bebé",
    width: 720,
    height: 1279,
  },
  {
    src: "/depoimentos/depoimento-gilda.webp",
    alt: "Depoimento real de cliente sobre uma receita que o bebé adorou",
    width: 720,
    height: 1090,
  },
];

// ================== FIM DA EDIÇÃO RÁPIDA ==================

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function OfferTimerBar() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    let start = Number(window.localStorage.getItem(TIMER_STORAGE_KEY));
    if (!Number.isFinite(start) || start <= 0) {
      start = Date.now();
      try {
        window.localStorage.setItem(TIMER_STORAGE_KEY, String(start));
      } catch {
        // armazenamento indisponível: o temporizador funciona apenas nesta visita
      }
    }
    const tick = () => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setSecondsLeft(Math.max(0, TIMER_DURATION_SECONDS - elapsed));
    };
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="sticky top-0 z-40 bg-timer-bar px-3 py-2">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-xs font-semibold text-timer-text sm:text-sm">
        <span>{TIMER_LABEL}</span>
        <span className="rounded-md bg-background px-2 py-0.5 font-black tabular-nums text-timer-value">
          {secondsLeft === null ? formatTimer(TIMER_DURATION_SECONDS) : formatTimer(secondsLeft)}
        </span>
      </p>
    </div>
  );
}

// Passo da entrega: entra suavemente no ecrã (fade + subida), em sequência,
// com um pequeno "pop" no número do passo. Respeita prefers-reduced-motion.
function DeliveryStep({ step, index }: { step: (typeof deliverySteps)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let timeout: number | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          timeout = window.setTimeout(() => setVisible(true), index * 140);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [index]);

  return (
    <li
      ref={ref}
      className={`reveal rounded-xl border border-border bg-card p-5 shadow-image ${visible ? "reveal-visible" : ""}`}
    >
      <span
        className="step-badge flex size-9 items-center justify-center rounded-full bg-gold text-base font-black text-primary-foreground"
        aria-hidden="true"
      >
        {index + 1}
      </span>
      <p className="mt-3 text-base font-extrabold">
        Passo {index + 1} — {step.title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
    </li>
  );
}

function ImagePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 overflow-hidden rounded-xl border-2 border-dashed border-primary/40 bg-secondary/25 px-4 text-center ${className ?? ""}`}
    >
      <span className="text-xs font-semibold text-muted-foreground sm:text-sm">{label}</span>
    </div>
  );
}

function VideoPlaceholder() {
  return (
    <div className="relative mx-auto flex aspect-[9/16] w-full max-w-64 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border-2 border-dashed border-primary/40 bg-secondary/25 px-4 text-center sm:max-w-72">
      <span
        className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta"
        aria-hidden="true"
      >
        <span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-current" />
      </span>
      <span className="text-xs font-semibold text-muted-foreground sm:text-sm">
        Espaço reservado para o vídeo — será adicionado aqui
      </span>
    </div>
  );
}

function CheckoutButton({ label, className }: { label: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <a
      className={`flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-center text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-cta transition-all hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] ${isLoading ? "pointer-events-none opacity-90" : ""} ${className ?? ""}`}
      href={CHECKOUT_URL}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      onClick={() => setIsLoading(true)}
    >
      {isLoading ? (
        <>
          <span
            className="size-5 shrink-0 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
            aria-hidden="true"
          />
          <span>Acessando checkout...</span>
        </>
      ) : (
        label
      )}
    </a>
  );
}

function Index() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <noscript>
        <img
          alt=""
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=4083380155288045&ev=PageView&noscript=1"
        />
      </noscript>

      {/* 1. Barra superior com temporizador */}
      <OfferTimerBar />

      {/* 2. Secção de abertura: o banner ocupa a headline, a sub-headline e o banner principal */}
      <section className="px-4 pb-10 pt-5 sm:px-6 sm:pb-14 sm:pt-8" aria-label="Apresentação do guia">
        <div className="mx-auto max-w-3xl">
          {/* Headline em texto acessível a leitores de ecrã e motores de busca; visualmente o banner é a headline. */}
          <h1 className="sr-only">
            Sabores que Crescem — 105 receitas para bebés dos 6 aos 24 meses
          </h1>
          {/* BANNER PRINCIPAL — substitua o ficheiro em src/assets (asset.json) pela sua nova imagem */}
          <img
            src={heroBanner.url}
            alt="Sabores que Crescem — 105 receitas para bebés, com exemplos de papinhas leves, papinhas grossas, saladas e comidas leves"
            width={1122}
            height={1402}
            fetchPriority="high"
            decoding="async"
            className="mx-auto h-auto w-full rounded-2xl shadow-image"
          />
        </div>
      </section>

      {/* 3. Vídeo explicativo */}
      <section
        className="border-y border-border bg-accent px-5 py-10 sm:px-6 sm:py-14"
        aria-labelledby="video-title"
      >
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="video-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Vê o que vais encontrar dentro do Sabores que Crescem
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Conhece melhor o guia, vê os tipos de receitas incluídas e descobre como está organizado
            para te ajudar a planear as refeições do teu bebé.
          </p>
          {/* VÍDEO — substitua este bloco pelo seu vídeo (vertical/quadrado, sem ultrapassar o ecrã) */}
          <div className="mt-8">
            <VideoPlaceholder />
          </div>
        </div>
      </section>

      {/* 4. Depoimentos de clientes */}
      <section className="px-5 py-10 sm:px-6 sm:py-14" aria-labelledby="testimonials-title">
        <div className="mx-auto max-w-6xl">
          <div className="pb-6 text-center">
            <h2 id="testimonials-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">
              O que dizem as mães que já conheceram o guia
            </h2>
          </div>
          <div className="carousel-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.src}
                className="w-[74vw] max-w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card shadow-image sm:mx-auto sm:w-full"
              >
                <img
                  className="h-auto w-full"
                  src={testimonial.src}
                  alt={testimonial.alt}
                  width={testimonial.width}
                  height={testimonial.height}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Como o cliente recebe o produto */}
      <section
        className="border-y border-border bg-accent px-5 py-10 sm:px-6 sm:py-14"
        aria-labelledby="delivery-title"
      >
        <div className="mx-auto max-w-3xl">
          <h2 id="delivery-title" className="text-center font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Como vais receber o teu e-book?
          </h2>
          <ol className="mt-8 grid gap-5 sm:grid-cols-3">
            {deliverySteps.map((step, index) => (
              <DeliveryStep key={step.title} step={step} index={index} />
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Bloco principal de oferta */}
      <section className="px-4 py-10 sm:px-6 sm:py-14" aria-labelledby="offer-title">
        <div className="mx-auto max-w-4xl rounded-2xl border border-offer-border bg-card p-4 shadow-offer sm:p-7">
          <h2 id="offer-title" className="text-center font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Tudo o que precisas para descobrir novas ideias para as refeições do teu bebé
          </h2>

          <div className="mt-7 grid items-start gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8">
            {/* IMAGEM DO PRODUTO — substitua este bloco pela capa ou mockup do e-book */}
            <ImagePlaceholder
              label="Imagem do e-book — adicione a capa ou mockup aqui"
              className="aspect-[3/4] w-full max-w-56 justify-self-center md:max-w-none"
            />
            <div>
              <p className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-secondary-foreground">
                Produto principal
              </p>
              <h3 className="mt-3 text-xl font-extrabold leading-tight sm:text-2xl">Sabores que Crescem</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                105 receitas de alimentação infantil para bebés dos 6 aos 24 meses, organizadas por idade.
              </p>
              <ul className="mt-4 grid gap-2">
                {guideCategories.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-snug sm:text-base">
                    <span
                      className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold text-[0.6rem] font-black text-primary-foreground sm:size-5 sm:text-xs"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* BÓNUS INCLUÍDO */}
          <div className="mt-7 grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-3 rounded-xl border border-offer-border bg-secondary/30 p-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:p-4">
            {/* IMAGEM DO BÓNUS — substitua este bloco pela sua imagem */}
            <ImagePlaceholder label="Imagem do bónus" className="aspect-[3/4] w-full" />
            <div className="min-w-0">
              <p className="w-fit rounded-full bg-primary px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-primary-foreground sm:text-xs">
                Bónus incluído
              </p>
              <h3 className="mt-1.5 text-base font-extrabold leading-tight sm:text-lg">
                O que fazer quando o teu bebé recusa a comida
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Um material complementar com orientações básicas para ajudar a mãe a compreender melhor
                as dificuldades na hora da refeição e a lidar com a recusa alimentar.
              </p>
            </div>
          </div>

          {/* PREÇO + BOTÃO DE COMPRA */}
          <div className="mt-7 border-t border-offer-border pt-6 text-center">
            <p className="text-4xl font-black leading-none text-primary sm:text-5xl">147 MT</p>
            <div className="mx-auto mt-5 max-w-lg">
              <CheckoutButton label="Quero o meu e-book" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. Reforço final e chamada para acção */}
      <section className="border-t border-border bg-accent px-5 py-12 text-center sm:px-6 sm:py-16">
        <h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold leading-tight sm:text-3xl">
          Descobre novas possibilidades para as refeições do teu bebé.
        </h2>
        <div className="mx-auto mt-6 max-w-lg">
          <CheckoutButton label="Quero aceder ao guia" />
        </div>
      </section>
    </main>
  );
}
