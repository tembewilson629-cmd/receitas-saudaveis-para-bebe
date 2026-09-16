import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import offerCover from "../assets/file_00000000898c8211bbac3c406716fa09.png.asset.json";

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
    links: [{ rel: "canonical", href: "/" }],
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

function MiniVsl() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  return (
    <div className="aspect-[9/16] overflow-hidden rounded-lg bg-video shadow-video">
      {shouldLoadVideo ? (
        <iframe
          className="h-full w-full border-0"
          src="https://www.youtube-nocookie.com/embed/aiR9Xm3Bgrg?autoplay=1&rel=0"
          title="Vídeo de apresentação do guia +100 Receitas Saudáveis para Bebés"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button
          className="group relative h-full w-full cursor-pointer overflow-hidden bg-video"
          type="button"
          aria-label="Reproduzir vídeo de apresentação do guia"
          onClick={() => setShouldLoadVideo(true)}
        >
          <img
            className="h-full w-full object-cover"
            src="https://i.ytimg.com/vi/aiR9Xm3Bgrg/hqdefault.jpg"
            alt="Pré-visualização do vídeo de apresentação do guia"
            width={480}
            height={360}
            loading="lazy"
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
      <section className="px-5 pb-9 pt-10 sm:pt-14">
        <h1 className="mx-auto max-w-3xl rounded-lg bg-headline-band px-5 py-6 text-center text-4xl font-extrabold leading-tight text-headline-foreground shadow-headline sm:px-8 sm:py-7 sm:text-5xl lg:text-6xl">
          +100 Receitas <span className="text-headline-accent">Saudáveis</span> para Bebés
        </h1>
      </section>

      <section className="border-y border-border bg-vsl-section px-5 py-14 sm:py-16">
        <div className="mx-auto max-w-sm sm:max-w-md">
          <p className="mb-7 text-center text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">Veja o que você vai receber</p>
          <MiniVsl />
        </div>
      </section>

      <section className="border-b border-border bg-carousel py-14 sm:py-16" aria-label="Páginas do e-book">
        <div className="mx-auto max-w-6xl">
          <div className="px-5 pb-8 text-center">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">As receitas na prática</h2>
            <p className="carousel-cue mx-auto mt-4 w-fit rounded-full bg-card px-4 py-2 text-sm font-bold text-primary shadow-image">Deslize para ver mais receitas <span aria-hidden="true">→</span></p>
          </div>
          <div className="carousel-scroll flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:gap-5">
            {carouselImages.map((image, index) => (
              <figure
                className="w-[82vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-lg bg-card shadow-image sm:w-80"
                key={image.src}
              >
                <img
                  className="aspect-[3/5] h-auto w-full object-cover object-top"
                  src={image.src}
                  alt={image.alt}
                  width={768}
                  height={1280}
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : index === 1 ? "auto" : "low"}
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-offer px-4 py-8 sm:px-6 sm:py-12">
        <div className="mx-auto grid max-w-5xl items-center gap-6 rounded-lg border border-offer-border bg-card px-4 py-5 shadow-offer sm:px-6 sm:py-7 md:grid-cols-[minmax(220px,0.72fr)_minmax(0,1fr)] md:gap-8 lg:px-8">
          <img
            className="mx-auto h-auto w-full max-w-60 rounded-lg shadow-cover sm:max-w-68 md:max-w-64 lg:max-w-72"
            src={offerCover.url}
            alt="Capa do guia Sabores que Crescem"
            width={768}
            height={1152}
            loading="lazy"
            decoding="async"
          />

          <div className="min-w-0">
            <p className="mb-3 w-fit rounded-full bg-offer-badge px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide text-offer-badge-foreground">
              Oferta especial
            </p>
            <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">
              +100 Receitas <span className="text-health">Saudáveis</span> para Bebés
            </h2>
            <p className="mt-3 border-l-4 border-health pl-3 text-base font-semibold leading-relaxed text-foreground">
              Um guia completo com receitas para bebés dos 6 aos 24 meses. Dentro do guia:
            </p>
            <ul className="mt-4 space-y-2">
              {guideContents.map((item) => (
                <li className="flex items-start gap-2.5 text-base leading-snug" key={item}>
                  <span className="mt-1.5 size-2 shrink-0 rounded-full bg-health" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 border-y border-offer-border py-4" aria-label="Preço promocional">
              <p className="text-lg font-extrabold text-price-old line-through decoration-2">250 MZN</p>
              <p className="mt-1 text-xs font-extrabold uppercase tracking-wide text-muted-foreground">Por apenas</p>
              <p className="mt-1 text-4xl font-black leading-none text-price sm:text-5xl">175 MZN</p>
              <p className="mt-3 w-fit rounded-md bg-savings px-3 py-1.5 text-sm font-extrabold text-savings-foreground">
                Você economiza 75 MZN
              </p>
            </div>
            <a
              className={`offer-cta mt-4 flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-lg bg-primary px-6 py-3.5 text-center text-lg font-extrabold text-primary-foreground shadow-cta transition-all hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.98] md:min-w-72 ${isCheckoutLoading ? "pointer-events-none opacity-90" : ""}`}
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
                "Adquirir o Guia"
              )}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
