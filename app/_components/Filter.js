"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter()
{
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const activeFilter = searchParams.get('capacity') ?? 'all';


    function handleFilter(filter)
    {
        const params = new URLSearchParams(searchParams);
        params.set('capacity', filter);
        router.replace(`${pathName}?${params.toString()}`, { scroll: false })

    }

    return (
        <div className="border border-primary-800 flex">
            <Button filter={'all'} handleFilter={handleFilter} activeFilter={activeFilter}>All Cabins</Button>
            <Button filter={'small'} handleFilter={handleFilter} activeFilter={activeFilter}>1&mdash;3 Guests</Button>
            <Button filter={'medium'} handleFilter={handleFilter} activeFilter={activeFilter}>4&mdash;7 Guests</Button>
            <Button filter={'large'} handleFilter={handleFilter} activeFilter={activeFilter}>8&mdash;12 Guests</Button>
        </div>
    )
}

function Button({ children, filter, handleFilter, activeFilter })
{
    return <button onClick={() => handleFilter(filter)} className={`${filter === activeFilter ? 'bg-primary-700 text-primary-50' : ''} px-5 py-2 cursor-pointer transition-colors hover:bg-primary-700`} >{children}</button>

}

export default Filter;
