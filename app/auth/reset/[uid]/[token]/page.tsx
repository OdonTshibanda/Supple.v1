import ResetPasswordForm from "../../ResetPasswordForm";

export default async function ResetPasswordPage({
  params,
}: { params: Promise<{ uid: string; token: string }> }) {
  const { uid, token } = await params;
  return <ResetPasswordForm uid={uid} token={token} />;
}
