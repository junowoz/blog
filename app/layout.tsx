import Image from "next/image";
import Link from "next/link";
import "../styles/globals.css";

//This wraps everything I create in the HTML
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const header = (
        <header>
            <div className="text-center bg-slate-600 p-8 my-6 rounded-md">
                <Link href={"/"}>
                    <Image
                        src="/logo.png"
                        width={40}
                        height={40}
                        className="mx-auto"
                        alt={"Logo"}
                    />
                    {/* <h1 className="text-2xl text-white font-bold mt-4">Blog</h1> */}
                </Link>
            </div>
        </header>
    );

    const footer = (
        <footer>
            <div>
                <h3 className="border-t border-slate-100 mt-12 py-6 text-center text-slate-400">
                    @junowoz
                </h3>
            </div>
        </footer>
    );

    return (
        <html>
            <head />
            <body>
                <div className="mx-auto max-w-2xl px-6">
                    {header}
                    {children}
                    {footer}
                </div>
            </body>
        </html>
    );
}
