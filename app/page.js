import Image from "next/image";
import Link from "next/link";
import bg from '@/public/bg.png';

export default function HomePage()
{
    return <main className="mt-24">
        <Image src={bg} fill quality={80} placeholder="blur" className="object-cover object-top" alt="Mountains and forests with two cabins" />

        <div className="relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl text-primary-50 mb-10 tracking-tight font-normal">
                Welcome to paradise.
            </h1>
            <Link
                href="/cabins"
                className="bg-accent-500 px-4 md:px-8 py-3 md:py-6 text-primary-800 text-base  md:text-lg font-semibold rounded-lg hover:bg-accent-600 transition-all"
            >
                Explore luxury cabins
            </Link>
        </div>
    </main>
}