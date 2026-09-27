import { Roboto, Work_Sans } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-roboto",
    weight: ["400", "500", "700"],
});

const workSans = Work_Sans({
    subsets: ["latin"],
    variable: "--font-work-sans",
    weight: ["400", "500", "600", "700"],
});

export const metadata = {
    title: "Next JS Tutorial",
    description: "Next.js Tutorial",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <script
                dangerouslySetInnerHTML={{
                    __html: `
                        try {
                            const t = localStorage.getItem('theme');
                            if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches)) {
                            document.documentElement.classList.add('dark');
                            }
                        } catch {}
                        `,
                }}
            />
            </head>
            <body
                className={`${roboto.variable} ${workSans.variable} ${roboto.className} flex flex-col`}
            >
                {children}
            </body>
        </html>
    );
}