import { motion } from "framer-motion";

export default function Message() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-8">
      {/* Desktop/Large screens */}
      <div className="hidden md:block w-full h-full">
        {/* Heading top-left */}
        <motion.div
          className="absolute top-20 left-20 max-w-[500px]"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="text-black font-heading text-6xl font-semibold leading-tight">
            É muito fácil anunciar na Beeva
          </h1>
        </motion.div>

        {/* Subtext bottom-right */}
        <motion.div
          className="absolute bottom-20 right-20 max-w-[550px] text-right"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h2 className="font-semibold font-heading text-4xl mb-4">
            Criar um anúncio em 11 passos
          </h2>
          <p className="text-gray-700 font-sans text-lg leading-relaxed">
            Aqui perguntaremos informações básicas sobre a casa, vai poder
            adicionar o preço base, um título e cinco ou mais fotos.
          </p>
        </motion.div>
      </div>

      {/* Mobile/Tablet */}
      <div className="md:hidden flex flex-col items-center text-center gap-6">
        <motion.h1
          className="text-black font-heading text-3xl font-semibold leading-snug"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          É muito fácil anunciar na Beeva
        </motion.h1>

        <motion.div
          className="max-w-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h2 className="font-semibold font-heading text-xl mb-2">
            Criar um anúncio em 11 passos
          </h2>
          <p className="text-gray-700 font-sans text-base leading-relaxed">
            Aqui perguntaremos informações básicas sobre a casa, vai poder
            adicionar o preço base, um título e cinco ou mais fotos.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
