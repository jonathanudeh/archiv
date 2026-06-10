import ProfileActivity from "@/src/features/profile/components/ProfileActivity";
import ProfileHeader from "@/src/features/profile/components/ProfileHeader";

export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-4xl p-5">
      <ProfileHeader />
      <ProfileActivity />
    </main>
  );
}
