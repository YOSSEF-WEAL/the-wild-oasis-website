import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

function ReservationCard({ booking, onDelete })
{
  const {
    id,
    guestId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    status,
    created_at,
    cabins: { name, image },
  } = booking;

  return (
    <div
      className="w-full flex border border-primary-800 max-md:flex-col max-md:rounded-lg max-md:overflow-hidden "
    >
      {/* Image */}
      <div className="relative h-32 aspect-square max-md:w-full max-md:h-40">
        <Image
          src={image}
          fill
          alt={`Cabin ${name}`}
          className="
            object-cover border-r border-primary-800
            max-md:border-r-0 max-md:border-b
          "
        />
      </div>

      {/* Details */}
      <div className="flex-grow px-6 py-3 flex flex-col max-md:px-4 max-md:py-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xl font-semibold max-md:text-lg">
            {numNights} nights in Cabin {name}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg text-primary-300 max-md:text-sm">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex gap-5 mt-auto items-baseline flex-wrap">
          <p className="text-xl font-semibold text-accent-400 max-md:text-lg">
            ${totalPrice}
          </p>
          <p className="text-primary-300 max-md:hidden">&bull;</p>
          <p className="text-lg text-primary-300 max-md:text-sm">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="ml-auto text-sm text-primary-400 max-md:text-xs max-md:mt-2 max-md:w-full">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div
        className="
          flex flex-col border-l border-primary-800 w-[100px] py-4
          max-md:w-full max-md:flex-row max-md:border-l-0 max-md:border-t
        "
      >
        {!isPast(startDate) ? (
          <>
            <Link
              href={`/account/reservations/edit/${id}`}
              className="
                group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900
                max-md:justify-center max-md:border-b-0 max-md:border-r
              "
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation onDelete={onDelete} bookingId={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}

export default ReservationCard;
