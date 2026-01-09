import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignOutButton,
} from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-[#0f111a]">
          <nav className="flex justify-between items-center p-5 border-b border-gray-800 bg-[#161926]/50 backdrop-blur-md sticky top-0 z-[60]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#f06524] rounded-lg" />
              <span className="text-white font-black text-xl tracking-tighter">
                CAMPUS
              </span>
            </div>

            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
