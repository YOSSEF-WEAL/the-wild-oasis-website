import Image from "next/image";
import Link from "next/link";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

export default async function page()
{
  const cabins = await getCabins();

  return (
    <div className="px-4 md:px-8 py-8 md:py-12 max-w-7xl mx-auto">
      {/* First Section - Welcome */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-x-24 lg:gap-y-32 text-base md:text-lg items-center mb-16 md:mb-24 lg:mb-32">
        <div className="lg:col-span-3 order-2 lg:order-1">
          <h1 className="text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
            Welcome to The Wild Oasis
          </h1>

          <div className="space-y-6 md:space-y-8">
            <p>
              Where nature&apos;s beauty and comfortable living blend seamlessly.
              Hidden away in the heart of the Italian Dolomites, this is your
              paradise away from home. But it&apos;s not just about the luxury
              cabins. It&apos;s about the experience of reconnecting with nature
              and enjoying simple pleasures with family.
            </p>
            <p>
              Our{" "}
              <span className="text-accent-400 font-semibold">
                {cabins.length}
              </span>{" "}
              luxury cabins provide a cozy base, but the real freedom and peace
              you&apos;ll find in the surrounding mountains. Wander through lush
              forests, breathe in the fresh air, and watch the stars twinkle above
              from the warmth of a campfire or your hot tub.
            </p>
            <p>
              This is where memorable moments are made, surrounded by
              nature&apos;s splendor. It&apos;s a place to slow down, relax, and
              feel the joy of being together in a beautiful setting.
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 order-1 lg:order-2">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={image1}
              placeholder="blur"
              alt="Family sitting around a fire pit in front of cabin"
              className="w-full h-64 md:h-80 lg:h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Second Section - Family Management */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-x-24 lg:gap-y-32 text-base md:text-lg items-center">
        <div className="lg:col-span-2 order-1">
          <div className="relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={image2}
              alt="Family that manages The Wild Oasis"
              className="w-full h-64 md:h-80 lg:h-auto object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-3 order-2">
          <h2 className="text-3xl md:text-4xl mb-6 md:mb-10 text-accent-400 font-medium">
            Managed by our family since 1962
          </h2>

          <div className="space-y-6 md:space-y-8">
            <p>
              Since 1962, The Wild Oasis has been a cherished family-run retreat.
              Started by our grandparents, this haven has been nurtured with love
              and care, passing down through our family as a testament to our
              dedication to creating a warm, welcoming environment.
            </p>
            <p>
              Over the years, we&apos;ve maintained the essence of The Wild Oasis,
              blending the timeless beauty of the mountains with the personal
              touch only a family business can offer. Here, you&apos;re not just a
              guest; you&apos;re part of our extended family. So join us at The
              Wild Oasis soon, where tradition meets tranquility, and every visit
              is like coming home.
            </p>

            <div className="pt-4">
              <Link
                href="/cabins"
                className="inline-block rounded-lg bg-accent-500 px-6 md:px-8 py-4 md:py-5 text-primary-800 text-base md:text-lg font-semibold hover:bg-accent-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Explore our luxury cabins
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}