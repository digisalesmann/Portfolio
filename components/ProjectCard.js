// components/ProjectCard.js
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProjectCard({ title, description, href, image }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
      }}
      whileHover={{ scale: 1.02 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl 
                 border border-black/10 dark:border-white/10 
                 bg-white dark:bg-gray-900 shadow-sm 
                 transition-all duration-500"
    >
      <Link href={href || "#"} target="_blank" rel="noopener noreferrer">
        {/* Hover border glow */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-brand/60 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-500 pointer-events-none" />

        {/* Image */}
        {image && (
          <div className="aspect-[16/9] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={`${title} preview`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="relative p-5">
          <h3 className="text-lg md:text-xl font-semibold leading-snug group-hover:text-brand transition-colors">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}