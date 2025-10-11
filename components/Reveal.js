import { motion } from "framer-motion";

export function Section({ children, className = "" }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

export function FadeUp({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
