import { createFileRoute } from "@tanstack/react-router";
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
      <section className="px-5 pb-8 pt-10 sm:pt-14">
        <h1 className="mx-auto max-w-3xl text-center text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          +100 Receitas <span className="text-health">Saudáveis</span> para Bebés
        </h1>
      </section>

      <section className="mx-auto max-w-sm px-5 pb-12 sm:max-w-md">
        <p className="mb-4 text-center text-lg font-semibold">Veja o que você vai receber</p>
        <div className="aspect-[9/16] overflow-hidden rounded-lg bg-video shadow-video">
          <iframe
            className="h-full w-full border-0"
            src="https://www.youtube-nocookie.com/embed/aiR9Xm3Bgrg?rel=0"
            title="Vídeo de apresentação do guia +100 Receitas Saudáveis para Bebés"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="border-y border-border bg-carousel py-10" aria-label="Páginas do e-book">
        <div className="mx-auto max-w-6xl">
          <div className="px-5 pb-6 text-center">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">As receitas na prática</h2>
            <p className="mt-2 text-sm font-medium text-muted-foreground">Deslize para ver mais receitas →</p>
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

      <section className="bg-offer px-5 py-14 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[minmax(280px,0.85fr)_minmax(0,1fr)] md:gap-16">
          <img
            className="mx-auto h-auto w-full max-w-sm rounded-lg shadow-cover"
            src={offerCover.url}
            alt="Capa do guia Sabores que Crescem"
            width={768}
            height={1152}
            loading="lazy"
            decoding="async"
          />

          <div>
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              +100 Receitas <span className="text-health">Saudáveis</span> para Bebés
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Um guia completo com receitas para bebés dos 6 aos 24 meses. Dentro do guia:
            </p>
            <ul className="mt-6 space-y-3">
              {guideContents.map((item) => (
                <li className="flex items-start gap-3 text-base leading-relaxed" key={item}>
                  <span className="mt-2 size-2 shrink-0 rounded-full bg-health" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7" aria-label="Preço promocional">
              <p className="text-lg font-semibold text-muted-foreground line-through">250 MZN</p>
              <p className="mt-1 text-3xl font-extrabold text-foreground">Por apenas 175 MZN</p>
            </div>
            <a
              className="mt-6 flex min-h-14 w-full items-center justify-center rounded-lg bg-primary px-6 py-4 text-center text-lg font-bold text-primary-foreground shadow-cta transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:w-fit md:min-w-64"
              href="https://checkout.escalepay.com/5515180"
            >
              Adquirir o Guia
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
