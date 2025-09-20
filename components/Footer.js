export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5 dark:border-white/10">
      <div className="mx-auto text-center max-w-6xl px-4 py-6 text-sm text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} BuildWithVictor — Full-Stack • Web3 • AI/ML
      </div>
    </footer>
  );
}
