import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import heroBanner from "@/assets/file_00000000898c8211bbac3c406716fa09.png.asset.json";
import deliveryBanner from "@/assets/como-vais-receber.webp.asset.json";
import productCover from "@/assets/capa-sabores-que-crescem.webp.asset.json";
import guaranteeSeal from "@/assets/selo-garantia-ebook.png.asset.json";
import videoPreview from "@/assets/sabores-que-crescem-video-preview.jpg.asset.json";

const trackMetaEvent = (eventName: string) => {
  if (typeof window !== "undefined") {
    const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq;
    if (typeof fbq === "function") fbq("track", eventName);
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
      children: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1454533756172964');fbq('track','PageView');fbq('track','ViewContent');`,
    }],
  }),
});

// ================== EDIÇÃO RÁPIDA ==================
const CHECKOUT_URL = "https://pay.tutora.co.mz/687ef6b7655441aba48bc83fbd13b6f8";
const TIMER_DURATION_SECONDS = 9 * 60 + 47;
const TIMER_STORAGE_KEY = "sqc-offer-timer-start";
const TIMER_LABEL = "Esta oportunidade termina em:";
const MIN_VIEWERS = 13;
const MAX_VIEWERS = 27;
const PURCHASE_NOTIFICATION_INTERVAL = 12_000;
const SALE_NAMES = [
  "Maria Luísa Kiala", "Ana Paula Ngola", "Isabel Domingas Matondo", "Joana Tchissola",
  "Teresa Kimbamba", "Luzia Nzinga", "Beatriz Mavungo", "Carolina Quissanga",
  "Fátima Cambinda", "Domingas Chilombo", "Albertina Mbala", "Esperança Kambunji",
  "Celeste Sambo", "Filomena Cuanza", "Graça Lukamba", "Helena Tchindele", "Inês Bunga",
  "Josefa Malonga", "Lurdes Kassoma", "Madalena Zua", "Natália Kipungu", "Odete Samakuva",
  "Paula Quimbanda", "Rosa Mussungo", "Sandra Lutucuta", "Sónia Kalandula", "Telma Kapingala",
  "Ulda Mpinda", "Vanda Chivukuvuku", "Zuleica Capita", "Adriana Nsimba", "Benvinda Kiluange",
  "Cláudia Tembo", "Dalila Ngunza", "Edna Cassule", "Flávia Kalunga", "Gisela Muanza",
  "Hortênsia Bumba", "Ivone Katumbela", "Jacinta Mukuba", "Kátia Lemba", "Luena Quiteque",
  "Mariana Kussunga", "Nádia Cahala", "Olinda Quissama", "Palmira Lubanzadio",
  "Quitéria Mabiala", "Rute Kangamba", "Silvana Chitunda", "Tânia Muhongo",
];
const guideCategories = [
  "Papinhas leves", "Papinhas mais grossas", "Sopinhas para bebés",
  "Outras ideias de refeições infantis", "Pratinhos adaptados à mesa da família",
];
const testimonials = [
  { src: "/depoimentos/depoimento-judite.webp", alt: "Depoimento real de cliente mostrando uma refeição preparada para o bebé", width: 720, height: 1279 },
  { src: "/depoimentos/depoimento-anatercia.webp", alt: "Depoimento real de cliente mostrando uma receita preparada para o bebé", width: 720, height: 1279 },
  { src: "/depoimentos/depoimento-gilda.webp", alt: "Depoimento real de cliente sobre uma receita que o bebé adorou", width: 720, height: 1090 },
];
// ================== FIM DA EDIÇÃO RÁPIDA ==================

function formatTimer(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getRandomName(previousName?: string) {
  const options = SALE_NAMES.filter((name) => name !== previousName);
  return options[Math.floor(Math.random() * options.length)];
}

function PurchaseNotifications() {
  const [notification, setNotification] = useState<{ id: number; name: string } | null>(null);
  const [isInteractive, setIsInteractive] = useState(false);
  const idleTimeoutRef = useRef<number | null>(null);
  const previousNameRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const markInteractive = () => {
      setIsInteractive(true);
      if (idleTimeoutRef.current !== null) window.clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = window.setTimeout(() => setIsInteractive(false), 2500);
    };
    const listeners: Array<[string, EventListener]> = [
      ["pointerdown", markInteractive], ["pointermove", markInteractive], ["keydown", markInteractive],
      ["touchstart", markInteractive], ["scroll", markInteractive],
    ];
    listeners.forEach(([eventName, handler]) => window.addEventListener(eventName, handler, { passive: true }));
    return () => {
      listeners.forEach(([eventName, handler]) => window.removeEventListener(eventName, handler));
      if (idleTimeoutRef.current !== null) window.clearTimeout(idleTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isInteractive) return;
    const timeout = window.setTimeout(() => {
      const name = getRandomName(previousNameRef.current);
      previousNameRef.current = name;
      setNotification({ id: Date.now(), name });
    }, PURCHASE_NOTIFICATION_INTERVAL);
    return () => window.clearTimeout(timeout);
  }, [isInteractive, notification]);

  if (!notification) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 w-[min(22rem,calc(100vw-1.5rem))]" aria-live="polite" aria-atomic="true">
      <div key={notification.id} className="animate-[fadeIn_0.25s_ease-out] rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-offer">
        <p><span className="font-semibold">Demonstração:</span> {notification.name} adquiriu o guia.</p>
      </div>
    </div>
  );
}

function OfferTimerBar() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  useEffect(() => {
    let start = Date.now();
    try {
      const storedStart = Number(window.localStorage.getItem(TIMER_STORAGE_KEY));
      if (Number.isFinite(storedStart) && storedStart > 0 && storedStart <= start) start = storedStart;
      else window.localStorage.setItem(TIMER_STORAGE_KEY, String(start));
    } catch { /* Sem armazenamento, a contagem continua durante esta visita. */ }
    const tick = () => setSecondsLeft(Math.max(0, TIMER_DURATION_SECONDS - Math.floor((Date.now() - start) / 1000)));
    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, []);
  return (
    <div className="sticky top-0 z-40 bg-timer-bar px-3 py-2">
      <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-center text-xs font-semibold text-timer-text sm:text-sm">
        <span>{TIMER_LABEL}</span>
        <span className="rounded-md bg-background px-2 py-0.5 font-black tabular-nums text-timer-value">{secondsLeft === null ? formatTimer(TIMER_DURATION_SECONDS) : formatTimer(secondsLeft)}</span>
      </p>
    </div>
  );
}

function VideoPlaceholder() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  useEffect(() => setIsHydrated(true), []);
  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-64 overflow-hidden rounded-xl border border-border bg-placeholder-bg sm:max-w-72">
      <iframe ref={iframeRef} className={`absolute inset-0 size-full ${isPlaying ? "z-10" : "pointer-events-none"}`} src="https://www.youtube-nocookie.com/embed/L_JNPBYVbdo?enablejsapi=1&autoplay=1&mute=1&playsinline=1&rel=0&controls=1" title="Vídeo de apresentação do Sabores que Crescem" allow="autoplay; encrypted-media; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy" onLoad={() => setIsPlayerReady(true)} />
      {!isPlaying && <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 overflow-hidden px-4 text-center">
        <img className="absolute inset-0 size-full scale-110 object-cover blur-sm" src={videoPreview.url} alt="" width={480} height={360} loading="lazy" fetchPriority="low" decoding="async" />
        <Button type="button" variant="default" size="icon" className="relative size-14 rounded-full shadow-cta motion-safe:animate-[preview-pulse_1.8s_ease-in-out_infinite]" aria-label="Reproduzir vídeo de apresentação" disabled={!isHydrated || !isPlayerReady} onClick={() => {
          const playerWindow = iframeRef.current?.contentWindow;
          playerWindow?.postMessage(JSON.stringify({ event: "command", func: "unMute", args: [] }), "*");
          playerWindow?.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
          setIsPlaying(true);
        }}><span className="ml-1 block h-0 w-0 border-y-[10px] border-l-[16px] border-y-transparent border-l-current" aria-hidden="true" /></Button>
        <span className="relative rounded bg-background px-2 py-1 text-xs font-semibold text-foreground sm:text-sm">{isPlayerReady ? "Toca para ver o vídeo" : "A preparar o vídeo…"}</span>
      </div>}
    </div>
  );
}

function ViewerIndicator({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const [viewerCount, setViewerCount] = useState(18);
  const [isInView, setIsInView] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), { threshold: 0.01 });
    observer.observe(section);
    const updatePageVisibility = () => setIsPageVisible(document.visibilityState === "visible");
    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", updatePageVisibility); };
  }, [sectionRef]);
  useEffect(() => {
    if (!isInView || !isPageVisible) return;
    const timeout = window.setTimeout(() => setViewerCount((current) => {
      const direction = current <= MIN_VIEWERS ? 1 : current >= MAX_VIEWERS ? -1 : Math.random() < 0.5 ? -1 : 1;
      const change = 1 + Math.floor(Math.random() * 3);
      return Math.min(MAX_VIEWERS, Math.max(MIN_VIEWERS, current + direction * change));
    }), 8000 + Math.floor(Math.random() * 10001));
    return () => window.clearTimeout(timeout);
  }, [isInView, isPageVisible, viewerCount]);
  return <div className="mx-auto mt-4 flex w-fit max-w-full items-center justify-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm">
    <span className="relative flex size-2 shrink-0" aria-hidden="true"><span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-green-600" /></span>
    <UsersRound className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /><span className="text-left">Pessoas a assistir neste momento</span>
    <span className="font-extrabold tabular-nums text-foreground" aria-label={`${viewerCount} pessoas`}>{viewerCount}</span>
  </div>;
}

function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  return <section ref={sectionRef} className="border-y border-border bg-accent px-5 py-10 sm:px-6 sm:py-14" aria-labelledby="video-title">
    <div className="mx-auto max-w-3xl text-center">
      <h2 id="video-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">Vê o que vais encontrar dentro do Sabores que Crescem</h2>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">Conhece melhor o guia, vê os tipos de receitas incluídas e descobre como está organizado para te ajudar a planear as refeições do teu bebé.</p>
      <div className="mt-8"><VideoPlaceholder /></div><ViewerIndicator sectionRef={sectionRef} />
    </div>
  </section>;
}

function CheckoutButton({ label, className }: { label: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  return <a className={`flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-center text-base font-extrabold uppercase tracking-wide text-primary-foreground shadow-cta transition-all hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] ${isLoading ? "pointer-events-none opacity-90" : ""} ${className ?? ""}`} href={CHECKOUT_URL} aria-busy={isLoading} aria-disabled={isLoading} onClick={() => { trackMetaEvent("Lead"); setIsLoading(true); }}>
    {isLoading ? <><span className="size-5 shrink-0 animate-spin rounded-full border-2 border-spinner-track border-t-primary-foreground" aria-hidden="true" /><span>Acessando checkout...</span></> : label}
  </a>;
}

function Index() {
  return <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
    <noscript><img alt="" height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1454533756172964&ev=PageView&noscript=1" /></noscript>
    <OfferTimerBar />
    <section className="p-0" aria-label="Apresentação do guia"><h1 className="sr-only">Sabores que Crescem — 105 receitas para bebés dos 6 aos 24 meses</h1><img src={heroBanner.url} alt="Mais de 100 receitas para bebés — guia Sabores que Crescem com ideias de refeições infantis" width={1664} height={2560} fetchPriority="high" decoding="async" className="block h-auto w-full" /></section>
    <VideoSection />
    <section className="px-5 py-10 sm:px-6 sm:py-14" aria-labelledby="testimonials-title"><div className="mx-auto max-w-6xl"><div className="pb-6 text-center"><h2 id="testimonials-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">O que dizem as mães que já conheceram o guia</h2></div><div className="carousel-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">{testimonials.map((testimonial) => <figure key={testimonial.src} className="w-[74vw] max-w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-border bg-card shadow-image sm:mx-auto sm:w-full"><img className="h-auto w-full" src={testimonial.src} alt={testimonial.alt} width={testimonial.width} height={testimonial.height} loading="lazy" fetchPriority="low" decoding="async" /></figure>)}</div></div></section>
    <section aria-labelledby="delivery-title"><h2 id="delivery-title" className="sr-only">Como vais receber o teu e-book?</h2><img src={deliveryBanner.url} alt="Como vais receber o teu e-book — é simples, rápido e seguro: faz a tua compra, efectua o pagamento e recebe o e-book por e-mail após a confirmação." width={1671} height={941} loading="lazy" fetchPriority="low" decoding="async" className="block h-auto w-full" /></section>
    <section className="px-4 py-10 sm:px-6 sm:py-14" aria-labelledby="offer-title"><div className="mx-auto max-w-4xl rounded-2xl border border-offer-border bg-card p-4 shadow-offer sm:p-7"><h2 id="offer-title" className="text-center font-display text-2xl font-extrabold leading-tight sm:text-3xl">Tudo o que precisas para descobrir novas ideias para as refeições do teu bebé</h2><div className="mt-7 grid items-start gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-8"><img src={productCover.url} alt="Capa do e-book Sabores que Crescem, com 105 receitas para bebés dos 6 aos 24 meses" width={1024} height={1536} loading="lazy" fetchPriority="low" decoding="async" className="aspect-[3/4] w-full max-w-56 justify-self-center rounded-xl border border-border object-cover shadow-image md:max-w-none" /><div><p className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-secondary-foreground">Produto principal</p><h3 className="mt-3 text-xl font-extrabold leading-tight sm:text-2xl">Sabores que Crescem</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">105 receitas de alimentação infantil para bebés dos 6 aos 24 meses, organizadas por idade.</p><ul className="mt-4 grid gap-2">{guideCategories.map((item) => <li key={item} className="flex items-start gap-2 text-sm leading-snug sm:text-base"><span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-gold text-[0.6rem] font-black text-primary-foreground sm:size-5 sm:text-xs" aria-hidden="true">✓</span><span>{item}</span></li>)}</ul></div></div><div className="mt-7 border-t border-offer-border pt-6 text-center"><p className="text-4xl font-black leading-none text-primary sm:text-5xl">2.547 Kz</p><div className="mx-auto mt-5 max-w-lg"><CheckoutButton label="Quero o meu e-book" /></div></div></div></section>
    <section className="border-t border-border bg-accent px-5 py-10 text-center sm:px-6 sm:py-12" aria-labelledby="guarantee-title"><h2 id="guarantee-title" className="font-display text-2xl font-extrabold leading-tight sm:text-3xl">Garantia</h2><div className="mx-auto mt-5 max-w-40"><img src={guaranteeSeal.url} alt="Selo de garantia de 7 dias" width={480} height={480} loading="lazy" fetchPriority="low" decoding="async" className="aspect-square w-full object-contain" /></div></section>
    <section className="border-t border-border bg-accent px-5 py-12 text-center sm:px-6 sm:py-16"><h2 className="mx-auto max-w-2xl font-display text-2xl font-extrabold leading-tight sm:text-3xl">Descobre novas possibilidades para as refeições do teu bebé.</h2><div className="mx-auto mt-6 max-w-lg"><CheckoutButton label="Quero aceder ao guia" /></div></section>
    <PurchaseNotifications />
  </main>;
}
