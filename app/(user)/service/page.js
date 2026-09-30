import Image from "next/image";

const team = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Senior Full Stack Developer",
    image: "/men1.jpeg",
    experience: "5+ Years Experience",
  },
  {
    id: 2,
    name: "Priya Verma",
    role: "UI/UX Designer",
    image: "/women1.jpg",
    experience: "4+ Years Experience",
  },
  {
    id: 3,
    name: "Aman Kumar",
    role: "Frontend Developer",
    image: "/men2.jpg",
    experience: "3+ Years Experience",
  },
  {
    id: 4,
    name: "Neha Singh",
    role: "Backend Developer",
    image: "/women2.jpg",
    experience: "4+ Years Experience",
  },
];

const services = [
  {
    title: "Web Development",
    description:
      "Modern, responsive and scalable websites built with the latest technologies.",
    icon: "💻",
  },
  {
    title: "Mobile Development",
    description:
      "Fast and user-friendly mobile applications for Android and iOS platforms.",
    icon: "📱",
  },
  {
    title: "UI/UX Design",
    description:
      "Clean and engaging user experiences designed around your business needs.",
    icon: "🎨",
  },
];

export const metadata = {
  title: "My Services - Meet Our Team of Experts",
  description: "Meet our team of experts and explore the services we offer to help your business grow.",
  authors: [{ name: "Your Name", url: "http://localhost:3000" }],
  keywords: ["services", "team", "experts", "web development", "mobile development", "UI/UX design"],
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: {
    url: "http://localhost:3000",
  },
  openGraph: {
    title: "My Services - Meet Our Team of Experts",
    description: "Meet our team of experts and explore the services we offer to help your business grow.",
    url: "http://localhost:3000/services",
    siteName: "My Services",
    images: [
      {
        url: "http://localhost:3000/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "My Services - Meet Our Team of Experts",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Services - Meet Our Team of Experts",
    description: "Meet our team of experts and explore the services we offer to help your business grow.",
    images: ["http://localhost:3000/twitter-image.jpg"],
  },
}

export default function Service() {
  return (
    <main className="bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-extrabold tracking-[2px] text-teal-600 dark:text-teal-500">
            OUR TEAM
          </span>

          <h2 className="mt-2 font-work text-3xl font-bold sm:text-4xl">
            Meet Our Experts
          </h2>

          <p className="mt-4 leading-7 text-slate-500 dark:text-slate-400">
            A talented team of developers, designers and technology experts
            working together to create great products.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl
                     dark:border-slate-800 dark:bg-slate-900
                     dark:hover:border-slate-700 dark:hover:shadow-2xl dark:hover:shadow-teal-500/5"
            >
              <div className="relative h-72 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-black/60" />
              </div>

              <div className="p-5 text-center">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {member.name}
                </h3>

                <p className="mt-1 text-sm font-semibold text-teal-600 dark:text-teal-400">
                  {member.role}
                </p>

                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {member.experience}
                </p>

                <div className="mt-5 flex justify-center gap-2">
                  {["in", "gh", "tw"].map((label) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 transition
                             hover:bg-teal-50 hover:text-teal-600
                             dark:bg-slate-800 dark:text-slate-300
                             dark:hover:bg-slate-700 dark:hover:text-teal-400"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}