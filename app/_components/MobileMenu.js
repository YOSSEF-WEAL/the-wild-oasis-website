"use client";
import Link from "next/link";
import { useState } from "react";

export default function MobileMenu({ session })
{
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () =>
    {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () =>
    {
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="md:hidden z-50 relative w-8 h-8 flex flex-col justify-center items-center space-y-1"
                aria-label="Toggle menu"
            >
                <span
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                        }`}
                ></span>
                <span
                    className={`block h-0.5 w-6 bg-current transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-0" : ""
                        }`}
                ></span>
                <span
                    className={`block h-0.5 w-6 bg-current transform transition-all duration-300 ease-in-out ${isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                        }`}
                ></span>
            </button>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-primary-950/80 bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={closeMenu}
            ></div>

            {/* Mobile Navigation Menu */}
            <nav
                className={`fixed top-0 right-0 h-full w-70 bg-primary-900 shadow-2xl z-50 md:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="pt-20 px-8">
                    <ul className="space-y-6">
                        <li>
                            <button
                                onClick={closeMenu}
                                className="block text-xl hover:text-accent-400 p-4 transition-colors active:text-accent-400 w-full bg-primary-800"
                            >
                                Close
                            </button>
                        </li>
                        <li>
                            <Link
                                href="/"
                                onClick={closeMenu}
                                className="block text-xl hover:text-accent-400 p-4 transition-colors active:text-accent-400 border-b border-primary-800"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/cabins"
                                onClick={closeMenu}
                                className="block text-xl hover:text-accent-400 p-4 transition-colors active:text-accent-400 border-b border-primary-800"
                            >
                                Cabins
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/about"
                                onClick={closeMenu}
                                className="block text-xl hover:text-accent-400 p-4 transition-colors active:text-accent-400 border-b border-primary-800"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            {session?.user?.image ? (
                                <Link
                                    href="/account"
                                    onClick={closeMenu}
                                    className="block text-xl hover:text-accent-400 p-4 transition-colors active:text-accent-400 border-b border-primary-800"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            className="rounded-full w-8 h-8"
                                            src={session.user.image}
                                            alt={session.user.name || "User"}
                                            referrerPolicy="no-referrer"
                                        />
                                        <span>Guest area</span>
                                    </div>
                                </Link>
                            ) : (
                                <Link
                                    href="/account"
                                    onClick={closeMenu}
                                    className="block text-xl hover:text-accent-400 p-4 transition-colors active:text-accent-400 border-b border-primary-800"
                                >
                                    Guest area
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}