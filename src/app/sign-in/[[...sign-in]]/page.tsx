import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0f111a]">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            formButtonPrimary: "bg-[#f06524] hover:bg-[#d95a1f]",
            card: "bg-[#161926] border border-gray-800",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
          },
        }}
      />
    </div>
  );
}
