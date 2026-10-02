export default function Home() {
  return (
    <main className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-extrabold tracking-[2px] text-teal-600 dark:text-teal-500">
            Home
          </span>

          <h2 className="mt-2 font-work text-3xl font-bold sm:text-4xl">
            Meet Our Experts
          </h2>

          <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">
            A talented team of developers, designers and technology experts
            working together to create great products.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"></div>
      </section>
    </main>
  );
}