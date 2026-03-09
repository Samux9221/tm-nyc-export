import { motion } from 'framer-motion';

export function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }} // Começa levemente transparente e abaixo
      animate={{ opacity: 1, y: 0 }}   // Sobe suavemente revelando o conteúdo
      exit={{ opacity: 0, y: -15 }}    // Ao sair, sobe e desaparece
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Curva de animação premium (estilo Apple)
    >
      {children}
    </motion.div>
  );
}