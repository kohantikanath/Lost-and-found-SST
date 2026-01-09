import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center text-center p-6">
      {/* Background Glow Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[#f06524]/10 blur-[120px] pointer-events-none" />

      <div className="w-20 h-20 bg-[#f06524] rounded-3xl mb-8 flex items-center justify-center text-4xl shadow-2xl shadow-[#f06524]/30">
        🔍
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-none">
        {`Find What's `} <span className="text-[#f06524]">Lost.</span>
        <br />
        {`Return What's `} <span className="text-[#7c3aed]">Found.</span>
      </h1>

      <p className="text-gray-400 max-w-lg mb-12 text-lg font-medium leading-relaxed">
        The official campus hub for misplaced belongings. Seamlessly connect
        with owners and secure your items.
      </p>

      <SignedOut>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Link
            href="/sign-in"
            className="flex-1 bg-[#f06524] text-white px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all text-center"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="flex-1 bg-[#161926] border border-gray-800 text-white px-8 py-4 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all text-center"
          >
            Register
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <Link
          href="/items"
          className="bg-white text-black px-12 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          Open Dashboard <span>→</span>
        </Link>
      </SignedIn>
    </div>
  );
}
