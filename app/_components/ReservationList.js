"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteReservation } from "../_lib/actions";

function ReservationList({ bookings })
{
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) =>
      curBookings.filter((booking) => booking.id !== bookingId)
  );

  async function handleDelete(bookingId)
  {
    optimisticDelete(bookingId);
    await deleteReservation(bookingId);
  }

  return (
    <ul
      className="flex flex-col gap-2 p-2"
    >
      {optimisticBookings.map((booking) => (
        <li
          key={booking.id}
          className="
            flex
            justify-center
            items-stretch
          "
        >
          <ReservationCard
            booking={booking}
            onDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
}

export default ReservationList;
