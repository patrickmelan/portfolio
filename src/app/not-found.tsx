"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-8xl font-bold text-cyan-400">404</h1>
      <Image
        src="/obiwan.png"
        alt="These are not the pages you're looking for"
        width={550}
        height={550}
        className="w-[550px] h-auto"
        loading="eager"
      />
      <button
        onClick={() => router.push("/")}
        className="hover:cursor-pointer mt-2 px-6 py-3 rounded-full border border-cyan-500/50 text-cyan-400 text-sm font-medium hover:bg-cyan-500/10 hover:border-cyan-400 transition-all duration-200">
        Return Home
      </button>
    </div>
  );
}
