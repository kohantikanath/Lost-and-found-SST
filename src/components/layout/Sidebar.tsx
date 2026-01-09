import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Sidebar() {
  const { user } = useUser();
  const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") || [];
  const isAdmin =
    user?.primaryEmailAddress?.emailAddress &&
    adminEmails.includes(user.primaryEmailAddress.emailAddress);

  return (
    <nav>
      {/* Standard Links */}
      <Link href="/">Dashboard</Link>

      {/* Conditional Admin Link */}
      {isAdmin && (
        <Link href="/admin/manage" className="text-[#f06524]">
          Admin Management
        </Link>
      )}
    </nav>
  );
}
