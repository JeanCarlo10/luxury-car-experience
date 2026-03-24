// import {
//   Wrench,
//   Settings,
//   Activity,
//   Disc3,
//   Move,
//   ShieldCheck,
// } from "lucide-react";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { motion } from "framer-motion";
// import { SlideUp } from "@/animations";

// const services = [
//   {
//     icon: Wrench,
//     title: "Manutenção Preventiva",
//     description:
//       "Troca de óleo, filtros e revisões periódicas para manter seu veículo em dia.",
//   },
//   {
//     icon: Settings,
//     title: "Reparos Mecânicos",
//     description:
//       "Diagnóstico e conserto de motor, câmbio, suspensão e outros sistemas.",
//   },
//   {
//     icon: Activity,
//     title: "Injeção Eletrônica",
//     description:
//       "Análise computadorizada e regulagem do sistema de injeção eletrônica.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Sistema Eletrônico (ABS e Airbag)",
//     description:
//       "Diagnóstico e reparo dos sistemas ABS e Airbag, garantindo segurança.",
//   },
// ];

// const Services = () => {
//   return (
//     <section id="service" className="py-20 bg-(--background)">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <motion.h2
//             variants={SlideUp(0.2)}
//             initial="initial"
//             whileInView={"animate"}
//             className="text-4xl text-(--foreground) md:text-5xl font-bold mb-4"
//           >
//             Nossos Serviços
//           </motion.h2>
//           <motion.p
//             variants={SlideUp(0.4)}
//             initial="initial"
//             whileInView={"animate"}
//             className="text-xl text-(--muted-foreground) max-w-2xl mx-auto"
//           >
//             Soluções completas para manter seu veículo funcionando perfeitamente
//           </motion.p>
//         </div>

//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {services.map((service, index) => {
//             const Icon = service.icon;
//             return (
//               <motion.div
//                 key={index}
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.4, delay: index * 0.1 }}
//                 whileHover={{
//                   scale: 1.04,
//                 }}
//               >
//                 <Card className="h-full bg-(--card) rounded-2xl transition-all duration-300 cursor-pointer group">
//                   <CardHeader>
//                     <div className="w-16 h-16 bg-(--sub-card) rounded-xl flex items-center justify-center mb-4 transition-transform">
//                       <Icon className="w-8 h-8 text-(--gold)" />
//                     </div>
//                     <CardTitle className="text-2xl text-(--foreground) mb-2">
//                       {service.title}
//                     </CardTitle>
//                     <CardDescription className="text-md text-(--foreground)/50">
//                       {service.description}
//                     </CardDescription>
//                   </CardHeader>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Services;

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
  },
  {
    icon: SprayCan,
    title: "Higienização interna",
    description:
      "Limpeza profunda da parte interna do veículo, removendo sujeiras, manchas e odores para mais conforto e conservação.",
    image: HigienizacaoBg,
    imagePosition: "center ",
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
            className="mb-4 text-4xl font-bold text-(--foreground) md:text-5xl"
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
