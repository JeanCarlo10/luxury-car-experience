import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Studio01 from "@/assets/About01.png";
import Studio02 from "@/assets/About02.png";
import Studio03 from "@/assets/About03.jpg";

const images = [
  { backgroundImage: Studio01 },
  { backgroundImage: Studio02 },
  { backgroundImage: Studio03 },
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
