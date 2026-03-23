import { useEffect, useMemo, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";
import GoogleLogo from "@/assets/google.svg";
import { Star, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { loadGoogleMaps } from "@/utils/googleMaps";

type GoogleReview = {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description?: string;
  profile_photo_url?: string;
  time?: number;
};

const PLACE_ID = "ChIJz0VV0AyQ9pQRchsim8DeHPg";
const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=" + PLACE_ID;

function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  const fullStars = Math.floor(rating);
  const decimal = rating - fullStars;
  const hasHalf = decimal >= 0.25 && decimal < 0.75;
  const extraFull = decimal >= 0.75 ? 1 : 0;

  const filled = Math.min(5, fullStars + extraFull);
  const empty = 5 - filled - (hasHalf ? 1 : 0);

  const starClass = `text-[var(--primary)]`;
  const emptyClass = `text-neutral-300`;

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: filled }).map((_, i) => (
        <Star
          key={`full-${i}`}
          style={{ width: size, height: size }}
          className={`fill-(--primary) ${starClass}`}
        />
      ))}

      {hasHalf && (
        <span
          className="relative inline-block"
          style={{ width: size, height: size }}
        >
          <Star style={{ width: size, height: size }} className={emptyClass} />
          <span className="absolute inset-0 overflow-hidden w-1/2">
            <Star
              style={{ width: size, height: size }}
              className={`fill-(--primary) ${starClass}`}
            />
          </span>
        </span>
      )}

      {Array.from({ length: empty }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          style={{ width: size, height: size }}
          className={emptyClass}
        />
      ))}
    </div>
  );
}

function clampText(text: string, maxChars = 120) {
  const t = (text || "").trim();
  if (t.length <= maxChars) return { short: t, needsMore: false };
  return { short: t.slice(0, maxChars).trimEnd() + "...", needsMore: true };
}

const Reviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [ratingAvg, setRatingAvg] = useState<number | null>(null);
  const [totalRatings, setTotalRatings] = useState<number | null>(null);

  // ✅ Agora começa false: só mostra "carregando" quando a seção entrar na tela
  const [loading, setLoading] = useState(false);
  const [hasTried, setHasTried] = useState(false);

  const isMobile = useIsMobile();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<GoogleReview | null>(null);

  const apiKey = import.meta.env.VITE_API_REVIEW_KEY as string;

  const hasGoogle = useMemo(
    () => typeof window !== "undefined" && (window as any).google,
    []
  );

  const fetchReviews = useCallback(() => {
    const g = (window as any).google;
    if (!g?.maps?.places) return;

    const service = new g.maps.places.PlacesService(
      document.createElement("div")
    );

    service.getDetails(
      {
        placeId: PLACE_ID,
        fields: ["rating", "user_ratings_total", "reviews"],
      },
      (place: any, status: any) => {
        setLoading(false);

        if (status !== g.maps.places.PlacesServiceStatus.OK || !place) {
          setReviews([]);
          return;
        }

        setRatingAvg(typeof place.rating === "number" ? place.rating : null);
        setTotalRatings(
          typeof place.user_ratings_total === "number"
            ? place.user_ratings_total
            : null
        );

        const list: GoogleReview[] = Array.isArray(place.reviews)
          ? place.reviews
          : [];
        list.sort((a, b) => (b.time ?? 0) - (a.time ?? 0));
        setReviews(list);
      }
    );
  }, []);

  //Lazy load: só carrega script quando a seção aparecer
  useEffect(() => {
    const el = document.getElementById("avaliacoes");
    if (!el) return;

    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;

        // evita refazer várias vezes
        if (hasTried) {
          io.disconnect();
          return;
        }

        setHasTried(true);
        setLoading(true);

        try {
          if (!apiKey) throw new Error("VITE_API_REVIEW_KEY não definida");
          await loadGoogleMaps(apiKey);
          fetchReviews();
        } catch (e) {
          setLoading(false);
          setReviews([]);
        } finally {
          io.disconnect();
        }
      },
      { rootMargin: "250px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [apiKey, fetchReviews, hasTried, hasGoogle]);

  // Fecha modal com ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const openModal = (r: GoogleReview) => {
    setSelected(r);
    setOpen(true);
  };

  return (
    <section id="avaliacoes" className="py-20 bg-(--background)">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-10">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-4xl md:text-5xl font-bold mb-3"
          >
            O Que Nossos{" "}
            <span className="text-(--primary)">Clientes Dizem</span>
          </motion.h2>

          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="text-lg text-(--muted-foreground) max-w-2xl mx-auto"
          >
            Avaliações reais de clientes satisfeitos com nossos serviços
          </motion.p>
        </div>

        <div className="mb-8 flex flex-col gap-4 rounded-2xl bg-neutral-100 p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <img
                src={GoogleLogo}
                alt="Logo Google"
                width={98}
                height={32}
                className="h-8 w-auto"
                loading="lazy"
              />
              <span className="text-lg font-semibold text-black">
                Avaliações
              </span>
            </div>

            {ratingAvg !== null && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-3xl font-bold text-black">
                  {ratingAvg.toFixed(1)}
                </span>

                <Stars rating={ratingAvg} size={20} />

                {totalRatings !== null && (
                  <span className="text-sm text-neutral-600">
                    ({totalRatings})
                  </span>
                )}
              </div>
            )}
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noreferrer"
            className="md:ml-auto inline-flex items-center justify-center rounded-full bg-(--button-primary) px-6 py-2 text-white font-semibold hover:bg-(--button-primary-medium) transition"
          >
            Avalie-nos no Google
          </a>
        </div>

        {loading && (
          <div className="text-center text-(--muted-foreground)">
            Carregando avaliações...
          </div>
        )}

        {!loading && hasTried && reviews.length === 0 && (
          <div className="text-center text-(--muted-foreground)">
            Não foi possível carregar as avaliações agora.
          </div>
        )}

        {!loading && reviews.length > 0 && (
          <Swiper
            className="pagination-bullet-review"
            modules={[Pagination, Autoplay]}
            grabCursor={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 1.1 },
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {reviews.map((r, idx) => {
              const { short, needsMore } = clampText(
                r.text || "",
                isMobile ? 180 : 200
              );

              return (
                <SwiperSlide key={idx} className="pb-10">
                  <div className="h-[300px] bg-neutral-100 rounded-2xl  p-5 shadow-sm flex flex-col">
                    <div className="mb-4 flex items-center gap-3">
                      <img
                        src={r.profile_photo_url || "/avatar-placeholder.png"}
                        alt={`Foto de ${r.author_name}`}
                        className="w-10 h-10 rounded-full object-cover"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />

                      <div className="min-w-0">
                        <p className="font-semibold text-(--foreground) truncate">
                          {r.author_name || "Cliente"}
                        </p>
                        <p className="text-xs text-(--muted-foreground)">
                          {r.relative_time_description || ""}
                        </p>
                      </div>
                    </div>

                    <Stars rating={r.rating ?? 0} />

                    <div className="mt-3 flex-1">
                      <p className="text-(--foreground) text-sm leading-relaxed">
                        {short}
                      </p>

                      {needsMore && (
                        <button
                          onClick={() => openModal(r)}
                          className="mt-2 text-sm font-semibold text-(--primary) hover:underline cursor-pointer"
                        >
                          Ler mais
                        </button>
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

      {/* Modal (popup) */}
      {open && selected && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/60 px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setOpen(false);
          }}
        >
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-black/5 transition cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img
                src={selected.profile_photo_url || "/avatar-placeholder.png"}
                alt={`Foto de ${selected.author_name}`}
                className="w-12 h-12 rounded-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-semibold">
                  {selected.author_name || "Cliente"}
                </p>
                <p className="text-sm text-neutral-500">
                  {selected.relative_time_description || ""}
                </p>
              </div>
            </div>

            <Stars rating={selected.rating ?? 0} />

            <p className="mt-4 text-neutral-800 leading-relaxed whitespace-pre-line">
              {selected.text || ""}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Reviews;