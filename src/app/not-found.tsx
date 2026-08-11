import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy px-6 py-16 text-center text-slate-300">
      <p className="font-mono text-sm font-medium uppercase tracking-widest text-accent">
        404 Page Not Found
      </p>

      <Image
        src="/obiwan.png"
        alt="These are not the pages you're looking for"
        width={550}
        height={550}
        className="h-auto w-full max-w-xl rounded-2xl border border-white/10"
        loading="eager"
      />

      <Link
        href="/"
        className="group mt-2 inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 text-sm font-medium text-accent transition-colors duration-200 hover:border-accent hover:bg-accent/10">
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        Return Home
      </Link>
    </div>
  );
}
