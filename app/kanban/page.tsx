import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { CustomKanban } from "./CustomKanban";
export default async function ProtectedRoute() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }

  return <>
  <CustomKanban/>
  </>;
}
