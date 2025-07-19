"use client";
import {
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useDateRange } from "./ReservationContext";

function isAlreadyBooked(dateRange, datesArr) {
  return (
    dateRange.from &&
    dateRange.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: dateRange.from, end: dateRange.to })
    )
  );
}

function DateSelector({ setting, bookedDates, cabin }) {
  const { dateRange, setDateRange, resetDateRange } = useDateRange();
  const displayDateRange = isAlreadyBooked(dateRange, bookedDates)
    ? {}
    : dateRange;

  // SETTINGS
  const { regularPrice, discount } = cabin;
  const numNights = differenceInDays(
    displayDateRange.from,
    displayDateRange.to
  );
  const cabinPrice = numNights * (regularPrice - discount);
  const range = { from: null, to: null };

  // SETTINGS
  const { minBookingLength, maxBookingLength } = setting;

  return (
    <div className="flex flex-col justify-between text-primary-50">
      <DayPicker
        className="pt-12 place-self-center fill-whites"
        mode="range"
        onSelect={setDateRange}
        selected={displayDateRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={(curDate) =>
          isPast(curDate) ||
          bookedDates.some((date) => isSameDay(date, curDate))
        }
      />

      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {displayDateRange.from && displayDateRange.to ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {dateRange.from || dateRange.to ? (
          <button
            className="border cursor-pointer border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetDateRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default DateSelector;
