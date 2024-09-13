"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ChatBubbleOvalLeftEllipsisIcon, FolderOpenIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
const ACTIVE_ROUTE = "py-1 px-2 text-gray-300 bg-gray-200 rounded-xl";
const INACTIVE_ROUTE =
  "py-1 px-2 text-gray-500 hover:text-gray-300 hover:bg-gray-100 rounded-xl";

function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <br />

      </>
    );
  }
  return (
    <>
      <button className="btn float float-right" onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function NavMenu() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <div>
        {session && (
          <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-56 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
              <div className="h-full px-3 py-4 overflow-y-auto bg-zinc-50 flex flex-col justify-between">
                <div className="one">
                  <ul className="space-y-2 font-medium">
                    <li className={pathname === "/" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                      <Link href="/" className="flex items-center p-2 text-gray-900 rounded-lg  group">
                        <FolderOpenIcon className="w-5 fill-black" />
                        <span className="ms-3">Dashboard</span>
                      </Link>
                    </li>
                    <li className={pathname === "/kanban" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                      <Link href="/kanban" className="flex items-center p-2 text-gray-900 rounded-lg group">
                        <CalendarDaysIcon className="w-5 fill-black" />
                        <span className="ms-3">kanban</span>
                      </Link>
                    </li>
                    <li className={pathname === "/chat" ? ACTIVE_ROUTE : INACTIVE_ROUTE}>
                      <Link href="/chat" className="flex items-center p-2 text-gray-900 rounded-lg group">
                        <ChatBubbleOvalLeftEllipsisIcon className="w-6" />
                        <span className="ms-3">Chat</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="two space-y-2">
                  <div className="flex items-center p-2 text-gray-900 rounded-lg group btn btn-ghost hover:bg-gray-100">
                  <UserCircleIcon className="w-4"/>
                    <button >{session?.user?.name}</button>
                  </div>
                  <button className="btn w-full rounded-xl" onClick={() => signOut()}>Sign out</button>
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
      <AuthButton />

    </>
  );
}
