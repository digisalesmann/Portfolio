// pages/_app.js
import "../styles/globals.css";
import Layout from "../components/Layout";
import ProgressBar from "../components/ProgressBar";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
      <ProgressBar />
      <Layout>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </Layout>
    </ThemeProvider>
  );
}
