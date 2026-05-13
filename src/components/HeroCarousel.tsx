import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import HeroVideo from "@/assets/Video01.mp4";

type Slide = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  type?: "image" | "video";
  positionMobile?: string;
  positionDesktop?: string;
  textVariant?: "light" | "dark";
};

const slides: Slide[] = [
  {
    src: HeroVideo,
    alt: "Vídeo aplicando pelicula",
    type: "video",
    title: "",
    subtitle: "",
    textVariant: "light",
  },
];

const handleScroll = () => {
  const nextSection = document.getElementById("service");

  if (nextSection) {
    nextSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

const HeroCarousel = () => {
  return (
    <section className="relative  w-full">
      <div className="relative w-full h-screen overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, Navigation]}
          slidesPerView={1}
          effect="fade"
          loop
          navigation
          observer={false}
          observeParents={false}
          watchSlidesProgress={false}
          resizeObserver
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          className="w-full h-full"
        >
          {slides.map((item, i) => {
            const textClass =
              item.textVariant === "dark" ? "text-black" : "text-white";

            return (
              <SwiperSlide key={i} className="w-full h-full">
                <div className="absolute inset-0 overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    // preload={i === 0 ? "auto" : "metadata"}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-black/45" />

                  <div className="absolute inset-0 flex items-center">
                    <div className="container mx-auto px-8">
                      <div className="max-w-xl text-center md:text-left">
                        {/* TITLE */}
                        <h1
                          className={`font-extrabold text-3xl sm:text-4xl lg:text-6xl whitespace-pre-line ${textClass}`}
                        >
                          {item.title}
                        </h1>

                        {/* SUBTITLE */}
                        <p
                          className={`mt-8 text-sm sm:text-base lg:text-l font-semibold ${textClass}`}
                        >
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Ícone animado de scroll */}
        <motion.button
          type="button"
          onClick={handleScroll}
          aria-label="Rolar para a próxima seção"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          className="group absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 flex-col cursor-pointer items-center gap-3 text-white/70 transition hover:text-(--gold)"
        >
          

          <span className="relative flex h-14 w-8 justify-center rounded-full border border-white/30 bg-black/20 backdrop-blur-md transition group-hover:border-(--gold)/80">
            <motion.span
              animate={{
                y: [8, 22, 8],
                opacity: [1, 0.35, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 h-2 w-1 rounded-full bg-white/80 transition group-hover:bg-(--gold)"
            />
          </span>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroCarousel;
