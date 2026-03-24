import { Sparkles, Shield, SprayCan, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";

import PolimentoBg from "@/assets/Service01.jpg";
import HigienizacaoBg from "@/assets/Service04.png";
import PPFBg from "@/assets/Service02.jpg";
import VitrificacaoBg from "@/assets/Service03.jpg";

const services = [
  {
    icon: Sparkles,
    title: "Polimento técnico",
    description:
      "Remove marcas leves, microrriscos e opacidade da pintura, devolvendo brilho e profundidade à cor do veículo.",
    image: PolimentoBg,
    imagePosition: "center 80%",
  },
  {
    icon: SprayCan,
    title: "Higienização interna",
    description:
      "Limpeza profunda da parte interna do veículo, removendo sujeiras, manchas e odores para mais conforto e conservação.",
    image: HigienizacaoBg,
    imagePosition: "center",
  },
  {
    icon: ShieldCheck,
    title: "PPF (Paint Protection Film)",
    description:
      "Película transparente de alta proteção que ajuda a preservar a pintura contra riscos leves, sujeira e desgaste diário.",
    image: PPFBg,
    imagePosition: "center 100%",
  },
  {
    icon: Shield,
    title: "Vitrificação de pintura",
    description:
      "Aplica uma camada de proteção de alta durabilidade sobre a pintura, ajudando a conservar o brilho e facilitar a limpeza.",
    image: VitrificacaoBg,
    imagePosition: "center 75%",
  },
];

const Services = () => {
  return (
    <section id="service" className="py-20 bg-(--background)">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView="animate"
            className="mb-4 text-4xl font-bold text-(--gold) md:text-5xl"
          >
            Nossos Serviços
          </motion.h2>

          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView="animate"
            className="mx-auto max-w-2xl text-xl text-(--muted-foreground)"
          >
            Cuidado, proteção e acabamento premium para valorizar cada detalhe
            do seu veículo.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <article className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    style={{ objectPosition: service.imagePosition }}
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/45 transition-all duration-500 group-hover:bg-black/60" />

                  {/* Center content before hover */}
                  <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
                    <div className=" flex items-center text-white gap-3">
                      <Icon className="h-12 w-12" />
                      <h3 className=" text-3xl font-bold ">{service.title}</h3>
                    </div>
                  </div>

                  {/* Bottom content after hover */}
                  <div className="absolute inset-x-0 bottom-0 z-20 p-6 md:p-7">
                    <div className="translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <h3 className="text-3xl font-bold text-white">
                        {service.title}
                      </h3>

                      <div className="mt-5 h-px w-full origin-left scale-x-0 bg-white/25 transition-transform duration-500 group-hover:scale-x-100" />

                      <p className="mt-4 max-w-[95%] text-base leading-relaxed text-white/80 opacity-0 transition-all duration-500 delay-100 group-hover:opacity-100">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
