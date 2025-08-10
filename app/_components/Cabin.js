import Image from "next/image";
import TextExpander from "./TextExpander";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";

function Cabin({ cabin })
{
    const { name, maxCapacity, image, description } = cabin;

    return (
        <div className="w-full max-w-6xl mx-auto mb-12 md:mb-16 lg:mb-24">
            {/* Mobile & Tablet Layout */}
            <div className="block lg:hidden">
                <div className="space-y-6">
                    {/* Title */}
                    <div className="text-center px-4">
                        <h1 className="text-3xl md:text-4xl font-black text-accent-100 mb-6">
                            Cabin {name}
                        </h1>
                    </div>

                    {/* Image */}
                    <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                        <Image
                            src={image}
                            fill
                            alt={`Cabin ${name}`}
                            className="object-cover"
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    {/* Content */}
                    <div className="px-4 space-y-6">
                        {/* Description */}
                        <div>
                            <p className="text-base md:text-lg text-primary-300 leading-relaxed">
                                <TextExpander>{description}</TextExpander>
                            </p>
                        </div>

                        {/* Features List */}
                        <ul className="space-y-4">
                            <li className="flex gap-3 items-start">
                                <UsersIcon className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                <span className="text-base md:text-lg">
                                    For up to <span className="font-bold">{maxCapacity}</span> guests
                                </span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <MapPinIcon className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                <span className="text-base md:text-lg">
                                    Located in the heart of the{" "}
                                    <span className="font-bold">Dolomites</span> (Italy)
                                </span>
                            </li>
                            <li className="flex gap-3 items-start">
                                <EyeSlashIcon className="h-5 w-5 text-primary-600 mt-0.5 flex-shrink-0" />
                                <span className="text-base md:text-lg">
                                    Privacy <span className="font-bold">100%</span> guaranteed
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
                <div className="relative border border-primary-800 rounded-lg overflow-hidden shadow-xl">
                    <div className="grid grid-cols-5 min-h-[500px]">
                        {/* Image Section */}
                        <div className="col-span-2 relative">
                            <Image
                                src={image}
                                fill
                                alt={`Cabin ${name}`}
                                className="object-cover"
                                sizes="40vw"
                            />
                        </div>

                        {/* Content Section */}
                        <div className="col-span-3 p-8 xl:p-12 bg-primary-950 relative">
                            {/* Title with Overlap Effect */}
                            <div className="relative -mt-4 mb-8">
                                <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-black text-accent-100 bg-primary-950 inline-block pr-8 py-2">
                                    Cabin {name}
                                </h1>
                            </div>

                            {/* Description */}
                            <div className="mb-8">
                                <p className="text-lg xl:text-xl text-primary-300 leading-relaxed">
                                    <TextExpander>{description}</TextExpander>
                                </p>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-5">
                                <li className="flex gap-4 items-center">
                                    <UsersIcon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                    <span className="text-lg xl:text-xl">
                                        For up to <span className="font-bold">{maxCapacity}</span> guests
                                    </span>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <MapPinIcon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                    <span className="text-lg xl:text-xl">
                                        Located in the heart of the{" "}
                                        <span className="font-bold">Dolomites</span> (Italy)
                                    </span>
                                </li>
                                <li className="flex gap-4 items-center">
                                    <EyeSlashIcon className="h-6 w-6 text-primary-600 flex-shrink-0" />
                                    <span className="text-lg xl:text-xl">
                                        Privacy <span className="font-bold">100%</span> guaranteed
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cabin;