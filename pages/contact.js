import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head><title>Contact — BuildWithVictor</title></Head>
      <section className="section">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="muted mt-2">Open to roles, collaborations, and research chats.</p>
        <ul className="mt-4 space-y-2">
          <li>Email: <a className="underline" href="mailto:victor@example.com">victor@example.com</a></li>
          <li>GitHub: <a className="underline" href="https://github.com/BuildWithVictor" target="_blank">BuildWithVictor</a></li>
          <li>Twitter/X: <a className="underline" href="https://x.com/BuildWithVictor" target="_blank">@BuildWithVictor</a></li>
          <li>Discord: BuildWithVictor</li>
        </ul>
      </section>
    </>
  );
}
