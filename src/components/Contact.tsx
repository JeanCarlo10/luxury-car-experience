import { MapPin, Phone, Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { IMaskInput } from "react-imask";
import { motion } from "framer-motion";
import { SlideUp } from "@/animations";

const quoteFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome obrigatório!" })
    .max(100, { message: "Nome deve ter menos de 100 caracteres" }),
  email: z
    .string()
    .trim()
    .email({ message: "E-mail inválido!" })
    .max(255, { message: "E-mail deve ter menos de 255 caracteres" }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "Telefone obrigatório!" })
    .max(20, { message: "Telefone deve ter menos de 20 caracteres" }),
  service: z.string().min(1, { message: "Selecione um serviço" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Mensagem obrigatória!" })
    .max(1000, { message: "Mensagem deve ter menos de 1000 caracteres" }),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

const WHATSAPP_NUMBER = "5545999739942";
const WHATSAPP_TEXT = "Olá! Gostaria de agendar um atendimento.";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_TEXT
)}`;

const Contact = () => {
  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    const serviceTextMap: Record<string, string> = {
      "manutencao-preventiva": "Manutenção Preventiva",
      "revisao-completa": "Revisão Completa",
      "troca-oleo": "Troca de Óleo",
      freios: "Sistema de Freios",
      suspensao: "Suspensão",
      eletrica: "Parte Elétrica",
      motor: "Motor",
      outro: "Outro",
    };

    const serviceText =
      serviceTextMap[data.service] || "Serviço não especificado";

    let message;
    if (data.service === "outro") {
      message = `Olá!\n\nNome: ${data.name}\nE-mail: ${data.email}\nTelefone: ${data.phone}\nServiço: ${serviceText}\nMensagem: ${data.message}`;
    } else {
      message = `Olá! Gostaria de solicitar um orçamento:\n\nNome: ${data.name}\nE-mail: ${data.email}\nTelefone: ${data.phone}\nServiço: ${serviceText}\nMensagem: ${data.message}`;
    }

    const encodedMessage = encodeURIComponent(message);

    const WHATSAPP_CONTACT = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(WHATSAPP_CONTACT, "_blank", "noopener,noreferrer");

    toast.success(
      "Mensagem enviada com sucesso! Entraremos em contato em breve."
    );

    form.reset({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
    });
  };

  return (
    <section id="contact" className="pb-20 bg-background">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <motion.h2
            variants={SlideUp(0.2)}
            initial="initial"
            whileInView={"animate"}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Entre em <span className="text-(--primary)">Contato</span>
          </motion.h2>
          <motion.p
            variants={SlideUp(0.4)}
            initial="initial"
            whileInView={"animate"}
            className="text-lg text-(--muted-foreground) max-w-2xl mx-auto"
          >
            Estamos prontos para atender você e cuidar do seu veículo
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="rounded-lg p-6 shadow-custom">
            <div className="flex flex-col gap-2">
              <h1 className="text-(--primary) text-3xl font-semibold">
                Solicitar Orçamento
              </h1>
              <span className="text-sm mb-8">
                Preencha o formulário e entraremos em contato
              </span>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold">
                        Nome <span className="text-(--primary)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Seu nome completo"
                          className="border border-(--input) focus:border-(--primary) focus:ring-2 focus:ring-(--primary) focus:outline-none h-10 px-3 py-2 shadow-none rounded-md w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-(--primary)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold">
                        E-mail <span className="text-(--primary)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="seu@email.com"
                          className="border border-(--input) focus:border-(--primary) focus:ring-2 focus:ring-(--primary) focus:outline-none h-10 px-3 py-2 shadow-none rounded-md w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-(--primary)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold">
                        Telefone <span className="text-(--primary)">*</span>
                      </FormLabel>
                      <FormControl>
                        <IMaskInput
                          {...field}
                          mask="(00) 00000-0000"
                          placeholder="(99) 99999-9999"
                          className="border border-(--input) focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none h-10 px-3 py-2 shadow-none rounded-md w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-(--primary)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold">
                        Serviço <span className="text-(--primary)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Controller
                          control={form.control}
                          name="service"
                          render={({ field: controllerField }) => (
                            <Select
                              {...controllerField}
                              defaultValue={field.value}
                              onValueChange={controllerField.onChange}
                            >
                              <FormControl>
                                <SelectTrigger className="border border-(--input) focus:border-(--primary) focus:ring-1 focus:ring-(--primary) focus:outline-none h-10 px-3 py-2 shadow-none rounded-md w-full">
                                  <SelectValue placeholder="Selecione o serviço" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="bg-white border-(--input)">
                                <SelectItem
                                  value="manutencao-preventiva"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Manutenção Preventiva
                                </SelectItem>
                                <SelectItem
                                  value="revisao-completa"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Revisão Completa
                                </SelectItem>
                                <SelectItem
                                  value="troca-oleo"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Troca de Óleo
                                </SelectItem>
                                <SelectItem
                                  value="freios"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Sistema de Freios
                                </SelectItem>
                                <SelectItem
                                  value="suspensao"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Suspensão
                                </SelectItem>
                                <SelectItem
                                  value="eletrica"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Parte Elétrica
                                </SelectItem>
                                <SelectItem
                                  value="motor"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Motor
                                </SelectItem>
                                <SelectItem
                                  value="outro"
                                  className="hover:bg-(--primary) hover:text-white focus:bg-(--primary) focus:text-white"
                                >
                                  Outro
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </FormControl>
                      <FormMessage className="text-(--primary)" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="gap-0.5 font-semibold">
                        Mensagem <span className="text-(--primary)">*</span>
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Descreva o problema ou serviço desejado..."
                          className="min-h-[225px] border border-(--input) focus:border-(--primary) focus:ring-2 focus:ring-(--primary) focus:outline-none h-10 px-3 py-2 shadow-none rounded-md w-full"
                        />
                      </FormControl>
                      <FormMessage className="text-(--primary)" />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full py-6 bg-red-600 text-white font-semibold rounded-lg shadow-custom hover:bg-(--button-primary-medium) cursor-pointer"
                >
                  Enviar solicitação
                </Button>
              </form>
            </Form>
          </div>

          {/* Contact Info Cards */}
          <div className="flex flex-col gap-8">
            <div className="rounded-lg p-6 shadow-custom flex flex-col gap-8">
              <div className="flex flex-col md:flex-row">
                <div className="min-w-12 min-h-12 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4 mb-1">
                  <FaWhatsapp className="w-6 h-6 text-white" />
                </div>

                <div className="flex flex-col">
                  <span className="text-lg font-semibold">WhatsApp</span>

                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-medium hover:underline"
                    aria-label="Abrir conversa no WhatsApp"
                  >
                    (45) 99973-9942
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="min-w-12 min-h-12 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4 mb-1">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">Telefone</span>
                  <span className="text-base flex-wrap">(45) 3522-4002</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="min-w-12 min-h-12 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4 mb-1">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">E-mail</span>
                  <a
                    className="sm:text-base md:text-sm lg:text-base"
                    href="mailto:luizanunciosface@hotmail.com"
                  >
                    luizanunciosface@hotmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="min-w-12 min-h-12 w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4 mb-1">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">Endereço</span>
                  <span className="text-base flex-wrap">
                    Rua Di Cavalcanti, 1832 - Foz do Iguaçu - PR
                  </span>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-lg p-4 overflow-hidden shadow-custom">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3600.775641084764!2d-54.59041532480658!3d-25.512528036161832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94f6900cd05545cf%3A0xf81cdec09b221b72!2sLuiz%20Centro%20Automotivo!5e0!3m2!1spt-BR!2sbr!4v1763529954277!5m2!1spt-BR!2sbr"
                width="100%"
                height="350"
                style={{ borderRadius: 4 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de localização da empresa"
                aria-label="Mapa mostrando a localização da empresa"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
