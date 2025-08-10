"use client";

import
{
  CalendarDaysIcon,
  HomeIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SignOutButton from "./SignOutButton";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation()
{
  const pathName = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () =>
  {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () =>
  {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block w-full min-h-full">
        <ul className="flex flex-col gap-2 min-h-[600px] text-lg p-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                className={`${pathName === link.href ? "bg-primary-900" : ""
                  } py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 rounded-lg`}
                href={link.href}
              >
                {link.icon}
                <span>{link.name}</span>
              </Link>
            </li>
          ))}

          <li className="mt-auto">
            <SignOutButton />
          </li>
        </ul>
      </nav>

      {/* Mobile/Tablet Navigation */}
      <div className="lg:hidden">
        {/* Mobile Header with Hamburger */}
        <div className="flex items-center justify-between p-4 bg-primary-950">
          <h2 className="text-lg font-semibold text-primary-100">Account</h2>
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-primary-200 hover:text-primary-100 hover:bg-primary-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${isMobileMenuOpen ? "block" : "hidden"
          } bg-primary-950 border-t border-primary-800`}>
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className={`${pathName === link.href ? "bg-primary-900 border-l-4 border-accent-500" : ""
                    } py-4 px-6 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-medium text-primary-200 border-b border-primary-800 last:border-b-0`}
                  href={link.href}
                  onClick={closeMobileMenu}
                >
                  {link.icon}
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}

            <li className="border-t border-primary-700 mt-4">
              <div className="p-4" onClick={closeMobileMenu}>
                <SignOutButton />
              </div>
            </li>
          </ul>
        </div>

        {/* Mobile Horizontal Navigation (Alternative) */}
        <div className="hidden md:block lg:hidden bg-primary-950 border-t border-primary-800">
          <ul className="flex justify-around py-2">
            {navLinks.map((link) => (
              <li key={link.name} className="flex-1">
                <Link
                  className={`${pathName === link.href
                    ? "bg-primary-900 text-accent-400"
                    : "text-primary-200"
                    } py-3 px-2 hover:bg-primary-900 hover:text-primary-100 transition-colors flex flex-col items-center gap-1 font-medium text-sm rounded-lg m-1`}
                  href={link.href}
                >
                  <div className="h-5 w-5">
                    {link.icon}
                  </div>
                  <span className="text-xs">{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideNavigation;