import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

export const revalidate = 15;

export async function generateMetadata({ params })
{
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

export async function generateStaticParams()
{
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

export default async function Page({ params })
{
  const cabin = await getCabin(params.cabinId);

  const { name } = cabin;

  return (
    <div className="min-h-screen bg-primary-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pt-4 md:pt-8 pb-8 md:pb-12">
        <div className="mb-8 md:mb-16">
          <Cabin cabin={cabin} />
        </div>

        <div className="space-y-6 md:space-y-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight mb-4 md:mb-6">
              Reserve Cabin{" "}
              <span className="text-accent-500 block sm:inline">{name}</span>{" "}
              <span className="block sm:inline">today.</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-primary-300 font-medium">
              Pay on arrival.
            </p>
          </div>

          <Suspense fallback={
            <div className="flex justify-center items-center min-h-[400px]">
              <Spinner />
            </div>
          }>
            <Reservation cabin={cabin} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}