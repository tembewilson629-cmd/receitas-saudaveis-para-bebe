import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/file_00000000898c8211bbac3c406716fa09.png.asset.json";
import deliveryBanner from "@/assets/como-vais-receber.webp.asset.json";
import productCover from "@/assets/capa-sabores-que-crescem.webp.asset.json";
import guaranteeSeal from "@/assets/selo-garantia-ebook.png.asset.json";
import videoPreview from "@/assets/sabores-que-crescem-video-preview.jpg.asset.json";

const trackMetaEvent = (eventName: string) => {
  if (typeof window === "undefined") return;
  try {
    const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", eventName);
  } catch {
    // Uma falha do pixel não deve impedir a navegação para o checkout.
  }
};

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sabores que Crescem — 105 Receitas para Bebés dos 6 aos 24 meses" },
      { name: "description", content: "E-book com 105 receitas de alimentação infantil para bebés dos 6 aos 24 meses, com bónus sobre recusa alimentar." },
      { property: "og:title", content: "Sabores que Crescem — 105 Receitas para Bebés dos 6 aos 24 meses" },
      { property: "og:description", content: "105 receitas de alimentação infantil, organizadas por idade, dos 6 aos 24 meses." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroBanner.url, fetchPriority: "high" },
    ],
    scripts: [{
      type: "text/javascript",
      children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1454533756172964');fbq('track','PageView');`,
    }],
  }),
});

const CHECKOUT_URL = "https://pay.tutora.co.mz/687ef6b7655441aba48bc83fbd13b6f8";
const TIMER_DURATION_SECONDS = 9 * 60 + 47;
const TIMER_STORAGE_KEY = "sqc-offer-timer-start";
const TIMER_LABEL = "Esta oportunidade termina em:";
const guideCategories = [
  "Papinhas leves", "Papinhas mais grossas", "Sopinhas para bebés",
  "Outras ideias de refeições infantis", "Pratinhos adaptados à mesa da família",
];
const testimonials = [
  { src: "/depoimentos/depoimento-judite.webp", alt: "Depoimento real de cliente mostrando uma refeição preparada para o bebé", width: 720, height: 1279 },
  { src: "/depoimentos/depoimento-anatercia.webp", alt: "Depoimento real de cliente mostrando uma receita preparada para o bebé", width: 720, height: 1279 },
  { src: "/depoimentos/depoimento-gilda.webp", alt: "Depoimento real de cliente sobre uma receita que o bebé adorou", width: 720, height: 1090 },
];

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function OfferTimerBar() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    let start = Date.now();
    try {
      const storedStart = Number(window.localStorage.getItem(TIMER_STORAGE_KEY));
      if (Number.isFinite(storedStart) && storedStart > 0 && storedStart <= start) {
        start = storedStart;
      } else {
        window.localStorage.setItem(TIMER_STORAGE_KEY, String(start));
      }
    } catch {
      // Sem armazenamento, a contagem continua durante esta visita.
    }

    const tick = () => setSecondsLeft(Math.max(0, TIMER_DURATION_SECONDS - Math.floor((Date.now() - start) / 1000)));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return <div className="sticky top-0 z-40 bg-timer-bar px-3 py-2">
    <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-xs font-semibold text-timer-text sm:text-sm">
      <span>{TIMER_LABEL}</span>
      <span className="rounded-md bg-background px-2 py-0.5 font-black tabular-nums text-timer-value">
        {secondsLeft === null ? formatTimer(TIMER_DURATION_SECONDS) : formatTimer(secondsLeft)}
      </span>
    </p>
  </div>;
}

function VideoPlaceholder() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => setIsHydrated(true), []);

  return <div className="relative mx-auto aspect-[9/16] w-full max-w-64 overflow-hidden rounded-xl border border-border bg-placeholder-bg sm:max-w-72">
    <iframe
      ref={iframeRef}
      className={`absolute inset-0 size-full ${isPlaying ? "z-10" : "pointer-events-none"}`}
      src="https://www.youtube-nocookie.com/embed/L_JNPBYVbdo?enablejsapi=1&autoplay=0&mute=1&playsinline=1"
      title="Vídeo de apresentação do guia Sabores que Crescem"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      onLoad={() => setIsPlayerReady(true)}
    />
    {!isPlaying && <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 overflow-hidden px-4 text-center">
      <img className="absolute inset-0 size-full scale-110 object-cover blur-sm" src={videoPreview.url} alt="" width={480} height={360} loading="lazy" fetchPriority="low" decoding="async" />
      <Button
        type="button"
        variant="default"
        size="icon"
        className="relative size-14 rounded-full shadow-cta motion-safe:animate-[preview-pulse_1.8s_ease-in-out_infinite]"
        aria-label="Reproduzir vídeo de apresentação"
        disabled={!isHydrated || !isPlayerReady}
        onClick={() => {
          const playerWindow = iframeRef.current?.contentWindow;
          playerWindow?.postMessage(JSON.stringify({ event: "command", func: "unMute", args: [] }), "*");
          playerWindow?.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
          setIsPlaying(true);
        }}
      ><span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-current" aria-hidden="true" /></Button>
      <span className="relative rounded bg-background px-2 py-1 text-xs font-semibold text-foreground sm:text-sm">{isPlayerReady ? "Toca para ver o vídeo" : "A preparar o vídeo…"}</span>
    </div>}
  </div>;
}

function VideoSection() {
  return <section className="border-y border-border bg-accent px-5 py-10 sm:px-6 sm:py-14" aria-labelledby="video-title">
    <div className="mx-auto max-w-3xl text-center">
      <h2 id="video-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">Vê o que vais encontrar dentro do Sabores que Crescem</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Conhece melhor o guia, vê os tipos de receitas incluídas e descobre como está organizado para te ajudar a planear as refeições do teu bebé.</p>
      <div className="mt-8"><VideoPlaceholder /></div>
    </div>
  </section>;
}

function CheckoutButton({ className }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const resetTimeoutRef = useRef<number | null>(null);
  useEffect(() => () => {
    if (resetTimeoutRef.current !== null) window.clearTimeout(resetTimeoutRef.current);
  }, []);

  return <a
    className={`flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-center text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-cta transition-all hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] ${className ?? ""}`}
    href={CHECKOUT_URL}
    aria-busy={isLoading}
    onClick={(event) => {
      if (isLoading) {
        event.preventDefault();
        return;
      }
      trackMetaEvent("Lead");
      setIsLoading(true);
      // Se o navegador não concluir a navegação, permite tentar novamente.
      resetTimeoutRef.current = window.setTimeout(() => setIsLoading(false), 8000);
    }}
  >
    {isLoading ? <><span className="size-5 shrink-0 animate-spin rounded-full border-2 border-spinner-track border-t-primary-foreground" aria-hidden="true" /><span>Acessando checkout...</span></> : "Adquirir material"}
  </a>;
}

function Index() {
  return <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <noscript><img alt="" height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1454533756172964&ev=PageView&noscript=1" /></noscript>
    <OfferTimerBar />
    <section className="p-0" aria-label="Apresentação do guia">
      <h1 className="sr-only">Sabores que Crescem — 105 receitas para bebés dos 6 aos 24 meses</h1>
      <img src={heroBanner.url} alt="Mais de 100 receitas para bebés — guia Sabores que Crescem com ideias de refeições infantis" width={1664} height={2560} fetchPriority="high" decoding="async" className="block h-auto w-full" />
    </section>
    <VideoSection />
    <section className="px-5 py-10 sm:px-6 sm:py-14" aria-labelledby="testimonials-title">
      <div className="mx-auto max-w-6xl">
        <div className="pb-6 text-center">
          <h2 id="testimonials-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">O que dizem sobre as receitas</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => <img key={testimonial.src} src={testimonial.src} alt={testimonial.alt} width={testimonial.width} height={testimonial.height} loading="lazy" fetchPriority="low" decoding="async" className="mx-auto h-auto w-full max-w-sm rounded-xl border border-border object-contain" />)}
        </div>
      </div>
    </section>
    <section aria-labelledby="delivery-title">
      <h2 id="delivery-title" className="sr-only">Como vais receber o teu e-book?</h2>
      <img src={deliveryBanner.url} alt="Como vais receber o teu e-book — é simples, rápido e seguro: faz a tua compra, efectua o pagamento e recebe o e-book por e-mail após a confirmação." width={1671} height={941} loading="lazy" fetchPriority="low" decoding="async" className="block h-auto w-full" />
    </section>
    <section className="px-4 py-10 sm:px-6 sm:py-14" aria-labelledby="offer-title">
      <div className="mx-auto max-w-4xl rounded-2xl border border-offer-border bg-card p-4 shadow-offer sm:p-7">
        <h2 id="offer-title" className="text-center font-display text-2xl font-extrabold leading-tight sm:text-3xl">Tudo o que precisas para descobrir novas ideias para as refeições do teu bebé</h2>
        <div className="mt-7 grid items-start gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8">
          <img src={productCover.url} alt="Capa do e-book Sabores que Crescem, com 105 receitas para bebés dos 6 aos 24 meses" width={1024} height={1536} loading="lazy" fetchPriority="low" decoding="async" className="aspect-[3/4] w-full max-w-56 justify-self-center rounded-xl border border-border object-cover shadow-image md:max-w-none" />
          <div>
            <p className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-secondary-foreground">Produto principal</p>
            <h3 className="mt-3 text-xl font-extrabold leading-tight sm:text-2xl">Sabores que Crescem</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">105 receitas de alimentação infantil para bebés dos 6 aos 24 meses, organizadas por idade.</p>
            <ul className="mt-4 grid gap-2">{guideCategories.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-snug sm:text-base"><span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold text-[0.6rem] font-black text-primary-foreground sm:size-5 sm:text-xs" aria-hidden="true">✓</span><span>{item}</span></li>)}</ul>
          </div>
        </div>
        <div className="mt-7 border-t border-offer-border pt-6 text-center">
          <p className="text-4xl font-black leading-none text-primary sm:text-5xl">2.547 Kz</p>
          <div className="mx-auto mt-5 max-w-lg"><CheckoutButton /></div>
        </div>
      </div>
    </section>
    <section className="border-t border-border bg-accent px-5 py-10 text-center sm:px-6 sm:py-12" aria-labelledby="guarantee-title">
      <h2 id="guarantee-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">Garantia</h2>
      <div className="mx-auto mt-5 max-w-40"><img src={guaranteeSeal.url} alt="Selo de garantia de 7 dias" width={480} height={480} loading="lazy" fetchPriority="low" decoding="async" className="aspect-square w-full object-contain" /></div>
    </section>
    <section className="border-t border-border bg-accent px-5 py-12 text-center sm:px-6 sm:py-16">
      <h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold leading-tight sm:text-3xl">Descobre novas possibilidades para as refeições do teu bebé.</h2>
      <div className="mx-auto mt-6 max-w-lg"><CheckoutButton /></div>
    </section>
  </main>;
}
