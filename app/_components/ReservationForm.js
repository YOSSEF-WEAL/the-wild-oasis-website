"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext";
import { useCabinDateRange } from "./CabinDateContext";
import { createBooking } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function ReservationForm({ cabin, user })
{
  const { dateRange, resetDateRange } = useCabinDateRange();

  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = dateRange.from;
  const endDate = dateRange.to;

  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinID: id
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="h-full flex flex-col">
      {/* User Info Header */}
      <div className="bg-primary-800 text-primary-300 px-4 md:px-8 lg:px-16 py-3 md:py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
        <p className="text-sm md:text-base">Logged in as</p>

        <div className="flex gap-2 md:gap-4 items-center">
          <img
            referrerPolicy="no-referrer"
            className="h-6 md:h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p className="text-sm md:text-base truncate max-w-32 md:max-w-none">{user.name}</p>
        </div>
      </div>

      {/* Form */}
      <form
        action={async (formData) =>
        {
          await createBookingWithData(formData);
          resetDateRange();
        }}
        className="bg-primary-900 py-6 md:py-8 lg:py-10 px-4 md:px-8 lg:px-16 flex-1 text-base md:text-lg flex gap-4 md:gap-5 flex-col"
      >
        {/* Number of Guests */}
        <div className="space-y-2">
          <label htmlFor="numGuests" className="block text-sm md:text-base">
            How many guests?
          </label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-3 md:px-5 py-2 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm md:text-base"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        {/* Special Requests */}
        <div className="space-y-2">
          <label htmlFor="observations" className="block text-sm md:text-base">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            rows={3}
            className="px-3 md:px-5 py-2 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm md:text-base resize-none"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end items-center gap-4 md:gap-6 mt-auto pt-4">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-sm md:text-base text-center">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingText="Reserving...">
              Reserve now
            </SubmitButton>
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;