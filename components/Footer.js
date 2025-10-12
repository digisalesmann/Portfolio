import Link from "next/link"; // remove if not using Next.js

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-gray-200 dark:border-gray-800 text-center">
      <div className="flex justify-center gap-5 mb-3">
        <Link href="https://github.com/digisalesmann" target="_blank">
          <i className="fab fa-github text-xl hover:text-brand transition"></i>
        </Link>
        <Link href="https://x.com/0xdsm" target="_blank">
          <i className="fa-brands fa-x-twitter text-xl hover:text-brand transition"></i>
        </Link>
        <Link href="https://linkedin.com/in/your-linkedin-username" target="_blank">
          <i className="fab fa-linkedin text-xl hover:text-brand transition"></i>
        </Link>
        <Link href="https://discord.gg/your-discord-invite" target="_blank">
          <i className="fab fa-discord text-xl hover:text-brand transition"></i>
        </Link>
        <Link href="mailto:youremail@example.com">
          <i className="fas fa-envelope text-xl hover:text-brand transition"></i>
        </Link>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-500">
        © {new Date().getFullYear()} BuildWithVictor. Built with passion and React.
      </p>
    </footer>
  );
}
