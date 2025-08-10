import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

function CabinCard({ cabin })
{
  const { id, name, maxCapacity, regularPrice, discount, image, cabinId } =
    cabin;

  return (
    <div className="border-primary-800 border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Desktop Layout - Image on left */}
      <div className="hidden lg:flex">
        <div className="flex-1 relative w-full min-w-96 h-64">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 400px"
          />
        </div>

        <div className="flex-grow flex flex-col">
          <div className="flex-grow pt-5 pb-4 px-7 bg-primary-950">
            <h3 className="text-accent-500 font-semibold text-2xl mb-3">
              Cabin {name}
            </h3>

            <div className="flex gap-3 items-center mb-2">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <p className="text-lg text-primary-200">
                For up to <span className="font-bold">{maxCapacity}</span> guests
              </p>
            </div>

            <p className="flex gap-3 justify-end items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-3xl font-[350]">
                    ${regularPrice - discount}
                  </span>
                  <span className="line-through font-semibold text-primary-600">
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-[350]">${regularPrice}</span>
              )}
              <span className="text-primary-200">/ night</span>
            </p>
          </div>

          <div className="bg-primary-950 border-t border-t-primary-800 text-right">
            <Link
              href={`/cabins/${cabinId || id}`}
              className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900 w-full"
            >
              Details & reservation &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Tablet & Mobile Layout - Image on top */}
      <div className="lg:hidden">
        {/* Image Section */}
        <div className="relative w-full h-64 md:h-80">
          <Image
            src={image}
            alt={`Cabin ${name}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 400px"
          />
        </div>

        {/* Content Section */}
        <div className="bg-primary-950">
          <div className="pt-5 pb-4 px-4 md:px-7">
            <h3 className="text-accent-500 font-semibold text-xl md:text-2xl mb-3">
              Cabin {name}
            </h3>

            <div className="flex gap-3 items-center mb-4">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <p className="text-base md:text-lg text-primary-200">
                For up to <span className="font-bold">{maxCapacity}</span> guests
              </p>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2 md:gap-3 items-baseline">
                {discount > 0 ? (
                  <>
                    <span className="text-2xl md:text-3xl font-[350]">
                      ${regularPrice - discount}
                    </span>
                    <span className="line-through font-semibold text-primary-600 text-sm md:text-base">
                      ${regularPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl md:text-3xl font-[350]">
                    ${regularPrice}
                  </span>
                )}
                <span className="text-primary-200 text-sm md:text-base">/ night</span>
              </div>
            </div>
          </div>

          {/* Button Section */}
          <div className="border-t border-t-primary-800">
            <Link
              href={`/cabins/${cabinId || id}`}
              className="block py-4 px-4 md:px-6 text-center md:text-right hover:bg-accent-600 transition-all hover:text-primary-900 font-medium"
            >
              Details & reservation &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;