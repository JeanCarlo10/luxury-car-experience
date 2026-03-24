import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import logoImage from "@/assets/Logo.png";
import { motion } from "framer-motion";

const Header = () => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll Listener otimizado
  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 90);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fecha menu mobile ao mudar para desktop
  useEffect(() => {
    if (!isMobile) setIsMobileMenuOpen(false);
  }, [isMobile]);

  // Função para scroll nas seções
  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  }, []);

  // Função para desabilitar o scroll do body quando o menu está aberto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`h-20 fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-(--blur) backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between h-20"
        >
          {/* Logo */}
          <img
            src={logoImage}
            alt="Logo - Luxury Car Experience"
            width={110}
            height={70}
            loading="eager"
            decoding="async"
            className="w-[130px] sm:w-[45px] h-auto"
          />

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav
              className="flex items-center gap-16"
              aria-label="Menu principal"
            >
              <a
                href="#home"
                className="relative group text-xl font-500 text-(--secondary-foreground)"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              >
                INÍCIO
                <span className="absolute left-0 bottom-0 block h-0.5 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out transform group-hover:scale-x-100"></span>
              </a>

              <a
                href="#service"
                className="relative group text-xl font-500 text-(--secondary-foreground)"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("service");
                }}
              >
                SERVIÇOS
                <span className="absolute left-0 bottom-0 block h-0.5 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out transform group-hover:scale-x-100"></span>
              </a>

              <a
                href="#about"
                className="relative group text-xl font-500 text-(--secondary-foreground)"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("about");
                }}
              >
                SOBRE
                <span className="absolute left-0 bottom-0 block h-0.5 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out transform group-hover:scale-x-100"></span>
              </a>

              <a
                href="#contact"
                className="relative group text-xl font-500 text-(--secondary-foreground)"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("contact");
                }}
              >
                CONTATO
                <span className="absolute left-0 bottom-0 block h-0.5 bg-white w-0 group-hover:w-full transition-all duration-500 ease-in-out transform group-hover:scale-x-100"></span>
              </a>
            </nav>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              aria-label={
                isMobileMenuOpen
                  ? "Fechar menu de navegação"
                  : "Abrir menu de navegação"
              }
              className={"cursor-pointer"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {/* Animação para o menu de hambúrguer transformando em "X" */}
              <motion.div
                className="w-6 h-1 bg-white mb-1"
                animate={{
                  rotate: isMobileMenuOpen ? 45 : 0,
                  y: isMobileMenuOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-1 bg-white mb-1"
                animate={{
                  opacity: isMobileMenuOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="w-6 h-1 bg-white"
                animate={{
                  rotate: isMobileMenuOpen ? -45 : 0,
                  y: isMobileMenuOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </button>
          )}
        </motion.div>

        {/* Mobile Navigation */}
        {isMobile && isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black opacity-80 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.nav
              aria-label="Menu móvel"
              className="fixed inset-y-0 right-0 w-[80%] sm:w-[70%] bg-(--secondary) py-12 px-8 z-50 flex flex-col overflow-y-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <button
                aria-label="Fechar menu de navegação"
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-white cursor-pointer"
              >
                <X size={28} />
              </button>

              <div className="flex flex-col gap-12">
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("home");
                  }}
                  className="text-white text-3xl hover:text-(--primary) transition-colors text-left focus-visible:outline-primary"
                >
                  Início
                </a>

                <a
                  href="#service"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("service");
                  }}
                  className="text-white text-3xl hover:text-(--primary) transition-colors text-left focus-visible:outline-primary"
                >
                  Serviços
                </a>

                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("about");
                  }}
                  className="text-white text-3xl hover:text-(--primary) transition-colors text-left focus-visible:outline-primary"
                >
                  Sobre
                </a>

                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="text-white text-3xl hover:text-(--primary) transition-colors text-left focus-visible:outline-primary"
                >
                  Contato
                </a>
              </div>

              <div className="flex flex-1 items-end">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-(--foreground) text-black cursor-pointer hover:opacity-90 transition-opacity w-full "
                >
                  Agendar
                </Button>
              </div>
            </motion.nav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
