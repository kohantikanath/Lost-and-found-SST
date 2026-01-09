import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/models/User";
import { connectDB } from "@/lib/db";

export async function syncUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  await connectDB();

  const email = clerkUser.emailAddresses[0]?.emailAddress;
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") || [];
  const role = adminEmails.includes(email) ? "admin" : "student";

  // Upsert pattern: Update if exists, create if new
  const user = await User.findOneAndUpdate(
    { clerkId: clerkUser.id },
    {
      clerkId: clerkUser.id,
      name: `${clerkUser.firstName} ${clerkUser.lastName}`,
      email: email,
      image: clerkUser.imageUrl,
      role: role,
    },
    { upsert: true, new: true }
  );

  return user;
}
