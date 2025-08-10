import Link from "next/link";
import { auth } from "../_lib/auth";
import MobileMenu from "./MobileMenu";

export default async function Navigation()
{
  const session = await auth();
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block z-10 text-xl">
        <ul className="flex gap-10 items-center">
          <li>
            <Link
              href="/"
              className="hover:text-accent-400 p-3 transition-colors active:text-accent-400"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/cabins"
              className="hover:text-accent-400 p-3 transition-colors active:text-accent-400"
            >
              Cabins
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="hover:text-accent-400 p-3 transition-colors active:text-accent-400"
            >
              About
            </Link>
          </li>
          <li>
            {session?.user?.image ? (
              <Link
                href="/account"
                className="hover:text-accent-400 p-3 transition-colors active:text-accent-400 flex items-center gap-4"
              >
                <img
                  className="rounded-full w-8 h-8"
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  referrerPolicy="no-referrer"
                />
                <span>Guest area</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="hover:text-accent-400 p-3 transition-colors active:text-accent-400"
              >
                Guest area
              </Link>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Component */}
      <MobileMenu session={session} />
    </>
  );
}