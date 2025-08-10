import React from "react";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";
import
{
  getBookedDatesByCabinId,
  getCabin,
  getSettings,
} from "../_lib/data-service";
import { auth } from "../_lib/auth";
import LoginMessage from "./LoginMessage";

async function Reservation({ cabin })
{
  const [setting, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0 mt-6 md:mt-10 border border-primary-800 min-h-[400px] mb-6 md:mb-10 text-accent-400 rounded-lg overflow-hidden">
      {/* Date Selector */}
      <div className="order-1 lg:order-1">
        <DateSelector setting={setting} bookedDates={bookedDates} cabin={cabin} />
      </div>

      {/* Reservation Form or Login Message */}
      <div className="order-2 lg:order-2">
        {session?.user ? (
          <ReservationForm cabin={cabin} user={session.user} />
        ) : (
          <LoginMessage />
        )}
      </div>
    </div>
  );
}

export default Reservation;