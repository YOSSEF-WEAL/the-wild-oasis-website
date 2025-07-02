import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
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
          <Link
            href="/account"
            className="hover:text-accent-400 p-3 transition-colors active:text-accent-400"
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
