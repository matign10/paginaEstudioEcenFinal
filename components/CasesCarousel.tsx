'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const casos = [
  {
    court: "Cámara Nacional de Apelaciones en lo Criminal",
    title: "Sobreseimiento por prescripción en causa de estafa",
    description: "Se logró el sobreseimiento del imputado por prescripción de la acción penal en una causa por estafa procesal.",
    url: "#"
  },
  {
    court: "Tribunal Oral en lo Criminal Federal",
    title: "Absolución en causa por contrabando",
    description: "Absolución del imputado en juicio oral por falta de pruebas suficientes.",
    url: "#"
  },
  {
    court: "Juzgado Nacional en lo Criminal y Correccional",
    title: "Archivo de causa por amenazas",
    description: "Se logró el archivo de la causa por atipicidad de la conducta denunciada.",
    url: "#"
  },
  {
    court: "Cámara de Apelaciones en lo Penal Económico",
    title: "Revocación de procesamiento por evasión",
    description: "La Cámara revocó el procesamiento dictado en primera instancia por falta de mérito.",
    url: "#"
  },
  {
    court: "Tribunal Oral en lo Criminal",
    title: "Pena reducida en caso de lesiones",
    description: "Se obtuvo una significativa reducción de pena mediante acuerdo de juicio abreviado.",
    url: "#"
  }
];

const ITEMS_VISIBLE = 3;

export default function CasesCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = casos.length;

  const handlePrev = () => {
    setDirection(-1);
    setIndex(prev => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setDirection(1);
    setIndex(prev => (prev + 1) % total);
  };

  const visibleCasos = Array.from({ length: ITEMS_VISIBLE }, (_, i) =>
    casos[(index + i) % total]
  );

  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir * -60 }),
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-14 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-gn-black text-gn-black bg-gn-white hover:bg-gn-black hover:text-gn-white transition-colors duration-500"
        aria-label="Ver casos anteriores"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-14 z-10 w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center border border-gn-black text-gn-black bg-gn-white hover:bg-gn-black hover:text-gn-white transition-colors duration-500"
        aria-label="Ver más casos"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-8 lg:mx-0 overflow-hidden">
        <AnimatePresence mode="popLayout" custom={direction}>
          {visibleCasos.map((caso, i) => (
            <motion.a
              key={`${caso.title}-${(index + i) % total}`}
              href={caso.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="group block"
            >
              <div className="h-full bg-gn-white border border-gn-gray/20 p-6 transition-all duration-500 hover:border-gn-black hover:shadow-lg min-h-[200px] flex flex-col">
                <span className="inline-block px-3 py-1 bg-gn-black text-gn-white text-xs font-medium tracking-wide mb-4 self-start">
                  {caso.court}
                </span>
                <h3 className="text-lg font-display text-gn-black group-hover:text-gn-gray transition-colors duration-500 leading-snug mb-2">
                  {caso.title}
                </h3>
                <p className="text-sm text-gn-gray leading-relaxed flex-1">
                  {caso.description}
                </p>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {/* Page Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {casos.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index ? 'bg-gn-black w-6' : 'bg-gn-gray/30 hover:bg-gn-gray w-2'
            }`}
            aria-label={`Ir a caso ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
