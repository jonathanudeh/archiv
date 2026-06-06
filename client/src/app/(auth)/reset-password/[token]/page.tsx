import ResetPasswordForm from "@/src/features/auth/components/ResetPassword";

type Props = {
  params: Promise<{
    token: string;
  }>;
};

export default async function ResetPasswordPage({ params }: Props) {
  const { token } = await params;

  return (
    <main className="mx-auto min-h-screen max-w-md px-6 pt-10">
      <h1 className="mb-2 text-3xl font-bold text-[#172033]">Reset Password</h1>

      <p className="mb-8 text-slate-500">Enter your new password below.</p>

      <ResetPasswordForm token={token} />
    </main>
  );
}
