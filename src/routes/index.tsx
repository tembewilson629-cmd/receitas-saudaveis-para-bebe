import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import offerCover from "../assets/file_00000000898c8211bbac3c406716fa09.png.asset.json";
import bonusCover from "../assets/bonus-bebe-recusa-comida-v2.png.asset.json";
import juditeTestimonial from "../assets/depoimento-judite.png.asset.json";
import anaterciaTestimonial from "../assets/depoimento-anatercia.png.asset.json";
import gildaTestimonial from "../assets/depoimento-gilda.png.asset.json";
import heroBanner from "../assets/receitas-saudaveis-banner.webp.asset.json";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "+100 Receitas Saudáveis para Bebés" },
      {
        name: "description",
        content: "Guia completo com mais de 100 receitas saudáveis para bebés dos 6 aos 24 meses.",
      },
      { property: "og:title", content: "+100 Receitas Saudáveis para Bebés" },
      {
        property: "og:description",
        content: "Receitas de alimentação infantil para bebés dos 6 aos 24 meses.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://i.ytimg.com" },
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

const carouselImages = [
  { src: "/carousel/receita-1.jpg", alt: "Capa do e-book Sabores que Crescem" },
  { src: "/carousel/receita-2.jpg", alt: "Página de copyright e aviso do e-book" },
  { src: "/carousel/receita-3.jpg", alt: "Página com orientações para usar o e-book" },
  { src: "/carousel/receita-4.jpg", alt: "Receita de papa de batata-doce" },
  { src: "/carousel/receita-5.jpg", alt: "Receita de papa de feijão-nhemba" },
  { src: "/carousel/receita-6.jpg", alt: "Receita de papa de feijão-nhemba com courgette" },
  { src: "/carousel/receita-7.jpg", alt: "Receita de salada de legumes cozidos em cubos" },
  { src: "/carousel/receita-8.jpg", alt: "Receita de salada de fruta em cubos" },
];

const guideContents = [
  "Papinhas nutritivas",
  "Purês suaves",
  "Papas grossas",
  "Receitas de saladas adaptadas para bebés",
  "Combinações de alimentos saudáveis",
  "Receitas de introdução alimentar",
  "Pratinhos adaptados para bebés no início da mastigação",
];

const testimonials = [
  { src: juditeTestimonial.url, alt: "Depoimento de cliente mostrando uma refeição preparada para o bebé" },
  { src: anaterciaTestimonial.url, alt: "Depoimento de cliente mostrando uma receita preparada para o bebé" },
  { src: gildaTestimonial.url, alt: "Depoimento de cliente sobre uma receita que o bebé adorou" },
];

const OFFER_DURATION_SECONDS = 3 * 60 * 60 + 27 * 60 + 16;

function OfferCountdown() {
  const [secondsLeft, setSecondsLeft] = useState(OFFER_DURATION_SECONDS);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSecondsLeft((current) => (current <= 0 ? OFFER_DURATION_SECONDS : current - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  const timeParts = [hours, minutes, seconds].map((value) => String(value).padStart(2, "0"));

  return (
    <div className="flex items-center justify-between gap-3 border-t border-offer-border pt-2 sm:justify-start" aria-label={`A oferta termina em ${timeParts.join(":")}`}>
      <p className="text-xs font-bold leading-tight text-muted-foreground sm:text-sm">A oferta termina em:</p>
      <div className="flex items-center gap-1 font-black tabular-nums text-discount-foreground" aria-live="off">
        {timeParts.map((part, index) => (
          <span className="contents" key={index}>
            {index > 0 && <span aria-hidden="true">:</span>}
            <span className="min-w-8 rounded-md bg-discount px-1.5 py-1 text-center text-base sm:min-w-9 sm:text-lg">{part}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function MiniVsl() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-lg bg-video shadow-video">
      {isPlaying ? (
        <iframe
          className="h-full w-full border-0"
          src="https://www.youtube-nocookie.com/embed/aiR9Xm3Bgrg?autoplay=1&rel=0"
          title="Vídeo de apresentação do guia +100 Receitas Saudáveis para Bebés"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          className="group relative h-full w-full cursor-pointer overflow-hidden bg-video"
          type="button"
          aria-label="Reproduzir vídeo de apresentação do guia"
          onClick={() => setIsPlaying(true)}
        >
          <img
            className="h-full w-full object-cover"
            src="https://i.ytimg.com/vi/aiR9Xm3Bgrg/hqdefault.jpg"
            alt="Pré-visualização do vídeo de apresentação do guia"
            width={480}
            height={360}
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <span className="absolute inset-0 bg-video-overlay transition-colors group-hover:bg-video-overlay-hover" aria-hidden="true" />
          <span className="absolute left-1/2 top-1/2 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-transform group-hover:scale-105" aria-hidden="true">
            <span className="ml-1 block h-0 w-0 border-y-[13px] border-l-[21px] border-y-transparent border-l-current" />
          </span>
        </button>
      )}
    </div>
  );
}

function Index() {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckoutClick = () => setIsCheckoutLoading(true);

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
      <section className="bg-background px-3 py-2 sm:px-5 sm:py-3" aria-label="+100 Receitas Saudáveis para Bebés">
        <h1 className="sr-only">+100 Receitas Saudáveis para Bebés</h1>
        <img
          className="mx-auto block h-auto w-full max-w-6xl rounded-lg"
          src={heroBanner.url}
          alt="+100 Receitas Saudáveis para Bebés, com quatro sugestões de papas nutritivas"
          width={1672}
          height={941}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </section>

      <section className="border-y border-border bg-vsl-section px-5 py-4 sm:py-6">
        <div className="mx-auto max-w-52 sm:max-w-56">
          <p className="mb-3 text-center text-lg font-extrabold leading-tight text-foreground sm:text-xl">Veja o que você vai receber</p>
          <MiniVsl />
        </div>
      </section>

      <section className="border-b border-border bg-carousel py-6 sm:py-8" aria-label="Páginas do e-book">
        <div className="mx-auto max-w-6xl">
          <div className="px-5 pb-4 text-center sm:pb-5">
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">As receitas na prática</h2>
            <p className="carousel-cue mx-auto mt-2.5 w-fit rounded-full bg-card px-3 py-1.5 text-xs font-bold text-primary shadow-image sm:text-sm">Deslize para ver mais receitas <span aria-hidden="true">→</span></p>
          </div>
          <div className="carousel-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:gap-4">
            {carouselImages.map((image, index) => (
              <figure
                className="w-[62vw] max-w-60 shrink-0 snap-start overflow-hidden rounded-lg bg-card shadow-image sm:w-64"
                key={image.src}
              >
                <img
                  className="aspect-[3/5] h-auto w-full object-cover object-top"
                  src={image.src}
                  alt={image.alt}
                  width={768}
                  height={1280}
                  loading="lazy"
                  fetchPriority={index === 0 ? "auto" : "low"}
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-background py-6 sm:py-8" aria-labelledby="social-proof-title">
        <div className="mx-auto max-w-6xl">
          <div className="px-5 pb-4 text-center sm:pb-5">
            <h2 id="social-proof-title" className="text-2xl font-extrabold leading-tight sm:text-3xl">Resultados de quem já experimentou</h2>
          </div>
          <div className="carousel-scroll flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible">
            {testimonials.map((testimonial) => (
              <figure className="w-[68vw] max-w-64 shrink-0 snap-start overflow-hidden rounded-lg border border-border bg-card shadow-image sm:mx-auto sm:w-full" key={testimonial.src}>
                <img
                  className="h-auto w-full"
                  src={testimonial.src}
                  alt={testimonial.alt}
                  width={768}
                  height={1365}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offer px-3 py-6 sm:px-6 sm:py-9">
        <div className="mx-auto grid max-w-5xl grid-cols-[minmax(7.5rem,0.78fr)_minmax(0,1.22fr)] items-start gap-x-3 gap-y-3 rounded-lg border border-offer-border bg-card p-3 shadow-offer sm:grid-cols-[minmax(10rem,0.72fr)_minmax(0,1.28fr)] sm:gap-x-5 sm:p-5 md:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)] md:gap-x-7 md:p-6 lg:p-7">
          <div className="col-span-2 grid gap-2 rounded-md bg-offer px-3 py-2.5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-5">
            <p className="w-fit rounded-full bg-offer-badge px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-offer-badge-foreground sm:px-3 sm:text-xs">
              Oferta especial por tempo limitado
            </p>
            <OfferCountdown />
          </div>

          <div className="relative mx-auto w-full rounded-lg border border-offer-border bg-cover-frame p-1.5 shadow-cover sm:p-2 md:row-span-4 md:max-w-64 lg:max-w-72">
            <span className="absolute -left-2 -top-3 z-10 flex size-20 items-center justify-center rounded-full border-2 border-card bg-discount-badge px-2 text-center text-sm font-black leading-tight text-discount-badge-foreground shadow-image" aria-label="Mais de 100 receitas">
              +100<br />RECEITAS
            </span>
            <img
              className="h-auto w-full rounded-md"
              src={offerCover.url}
              alt="Capa do guia Sabores que Crescem"
              width={768}
              height={1152}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="min-w-0 self-center md:self-start">
            <h2 className="text-xl font-extrabold leading-tight sm:text-3xl">
              +100 Receitas <span className="text-health">Saudáveis</span> para Bebés
            </h2>
            <p className="mt-2 border-l-4 border-health pl-2.5 text-sm font-semibold leading-snug text-foreground sm:mt-3 sm:pl-3 sm:text-base sm:leading-relaxed">
              Um guia completo com receitas para bebés dos 6 aos 24 meses. Dentro do guia:
            </p>
          </div>

          <ul className="col-span-2 grid grid-cols-2 gap-x-3 gap-y-1.5 md:col-span-1 md:col-start-2 md:gap-x-4 md:gap-y-2">
            {guideContents.map((item) => (
              <li className="flex items-start gap-2 text-sm leading-snug sm:text-base" key={item}>
                <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-health text-[0.65rem] font-black text-primary-foreground sm:size-5 sm:text-xs" aria-hidden="true">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="col-span-2 grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 border-y border-bonus-border bg-bonus px-2 py-2.5 sm:grid-cols-[5.5rem_minmax(0,1fr)] sm:px-3 sm:py-3 md:col-span-1 md:col-start-2">
            <img
              className="h-auto w-full rounded-md border border-bonus-border shadow-image"
              src={bonusCover.url}
              alt="Capa do mini guia O Bebé Recusa a Comida?"
              width={144}
              height={188}
              loading="lazy"
              decoding="async"
            />
            <div className="min-w-0">
              <p className="w-fit rounded-full bg-bonus-badge px-2.5 py-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-bonus-badge-foreground sm:px-3 sm:text-xs">🎁 Bónus incluído</p>
              <h3 className="mt-1.5 text-base font-extrabold leading-tight sm:text-lg">O Bebé Recusa a Comida?</h3>
              <p className="mt-1 text-xs leading-snug text-muted-foreground sm:text-sm">Mini guia de gestão comportamental infantil.</p>
              <p className="mt-1.5 w-fit rounded-md bg-savings px-2 py-1 text-xs font-extrabold text-savings-foreground sm:text-sm">Grátis na sua compra!</p>
            </div>
          </div>

          <div className="col-span-2 grid grid-cols-[auto_minmax(0,1fr)] items-end gap-3 border-t border-offer-border pt-3 md:col-span-1 md:col-start-2" aria-label="Preço promocional">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
                <p className="text-base font-extrabold text-price-old line-through decoration-2 sm:text-lg">250 MZN</p>
                <p className="rounded-full bg-discount px-2 py-1 text-[0.65rem] font-black text-discount-foreground sm:px-3 sm:text-xs">30% DE DESCONTO</p>
              </div>
              <p className="mt-1 text-[0.68rem] font-extrabold uppercase tracking-wide text-muted-foreground sm:text-xs">Por apenas</p>
              <p className="mt-0.5 whitespace-nowrap text-3xl font-black leading-none text-price sm:text-5xl">175 MZN</p>
            </div>
            <a
              className={`offer-cta flex min-h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary px-3 py-3 text-center text-sm font-extrabold text-primary-foreground shadow-cta transition-all hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] sm:px-6 sm:py-3.5 sm:text-lg ${isCheckoutLoading ? "pointer-events-none opacity-90" : ""}`}
              href="https://checkout.escalepay.com/5515180"
              aria-busy={isCheckoutLoading}
              aria-disabled={isCheckoutLoading}
              onClick={handleCheckoutClick}
            >
              {isCheckoutLoading ? (
                <>
                  <span className="size-5 shrink-0 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" aria-hidden="true" />
                  <span>Acessando checkout...</span>
                </>
              ) : (
                "Adquirir o Guia →"
              )}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
