import React from 'react'
import DateSelector from './DateSelector'
import ReservationForm from './ReservationForm'
import { getBookedDatesByCabinId, getCabin, getSettings } from '../_lib/data-service';

async function Reservation({ cabin })
{
    const [setting, bookedDates] = await Promise.all([
        getSettings(),
        getBookedDatesByCabinId(cabin.id)]);


    return (
        <div className="grid grid-cols-2 mt-10 border border-primary-800 min-h-[400px] mb-10 text-accent-400">
            <DateSelector setting={setting} bookedDates={bookedDates} cabin={cabin} />
            <ReservationForm cabin={cabin} />
        </div>
    )
}

export default Reservation
