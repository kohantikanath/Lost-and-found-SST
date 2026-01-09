import { auth, currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import ItemDetailsClient from "@/components/ItemDetailsClient";
import { FoundItem } from "@/types";

export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>; // 1. Updated type to Promise
}) {
  // 2. Await the params before using properties
  const { id } = await params;

  const { userId, getToken } = await auth();
  const user = await currentUser();

  const email = user?.emailAddresses[0]?.emailAddress;

  const adminEmails =
    process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()) || [];
  const isAdmin = email ? adminEmails.includes(email) : false;

  // Build absolute base URL from request headers to avoid relying on env vars
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${proto}://${host}` : process.env.NEXT_PUBLIC_APP_URL;

  // Get auth token for server-to-server request
  const token = await getToken();

  // 3. Use 'id' directly here
  const res = await fetch(`${baseUrl}/api/items/${id}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Item not found
      </div>
    );
  }

  const item: FoundItem = await res.json();

  // Optimize image URL for Cloudinary
  const optimizedUrl = item.imageUrl.replace(
    "/upload/",
    "/upload/w_800,h_600,c_fill,g_auto/"
  );

  return (
    <ItemDetailsClient
      item={item}
      optimizedUrl={optimizedUrl}
      isAdmin={isAdmin}
    />
  );
}
