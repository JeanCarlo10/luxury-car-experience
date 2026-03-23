import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Mecanica01 from "@/assets/Mecanica_01.webp";
import Mecanica02 from "@/assets/Mecanica_02.webp";
import Mecanica03 from "@/assets/Mecanica_03.webp";
import Mecanica04 from "@/assets/Mecanica_04.webp";
import Mecanica05 from "@/assets/Mecanica_05.webp";
import Mecanica06 from "@/assets/Mecanica_06.webp";

const images = [
  { backgroundImage: Mecanica01 },
  { backgroundImage: Mecanica02 },
  { backgroundImage: Mecanica03 },
  { backgroundImage: Mecanica04 },
  { backgroundImage: Mecanica05 },
  { backgroundImage: Mecanica06 },
];

const AboutCarousel = () => {
  return (
    <div className="flex items-center justify-center">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop={true}
        grabCursor={true}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 15 },
          768: { slidesPerView: 1, spaceBetween: 15 },
          1024: { slidesPerView: 1, spaceBetween: 15 },
        }}
        className="w-full"
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <div
              className="flex items-center justify-center h-[450px] rounded-xl overflow-hidden"
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutCarousel;
