"use client";
import
{
  differenceInDays,
  isPast,
  isSameDay,
  isWithinInterval,
} from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useCabinDateRange } from "./CabinDateContext";

function isAlreadyBooked(dateRange, datesArr)
{
  if (!dateRange || typeof dateRange !== 'object' || !('from' in dateRange) || !('to' in dateRange)) return false;
  if (!dateRange.from || !dateRange.to) return false;
  if (!Array.isArray(datesArr)) return false;
  return datesArr.some((date) =>
    isWithinInterval(date, { start: dateRange.from, end: dateRange.to })
  );
}

function DateSelector({ setting, bookedDates, cabin })
{
  const { dateRange, setDateRange, resetDateRange } = useCabinDateRange();
  const safeBookedDates = Array.isArray(bookedDates) ? bookedDates : [];

  function handleSelect(range)
  {
    if (!range || typeof range !== 'object' || !('from' in range) || !('to' in range))
    {
      setDateRange({ from: null, to: null });
      return;
    }
    if (!range.from || !range.to)
    {
      setDateRange(range);
      return;
    }
    const days = [];
    let current = new Date(range.from);
    while (current <= range.to)
    {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    const isBooked = days.some(day =>
      safeBookedDates.some(booked => isSameDay(booked, day))
    );
    if (!isBooked)
    {
      setDateRange(range);
    } else
    {

      setDateRange({ from: null, to: null });
    }
  }

  const displayDateRange = dateRange && typeof dateRange === 'object' && 'from' in dateRange && 'to' in dateRange
    ? dateRange
    : { from: null, to: null };

  const { regularPrice, discount } = cabin;
  const validRange =
    displayDateRange.from &&
    displayDateRange.to &&
    displayDateRange.to > displayDateRange.from;

  const numNights = validRange
    ? differenceInDays(displayDateRange.to, displayDateRange.from)
    : 0;

  const cabinPrice =
    validRange && regularPrice && discount !== undefined
      ? numNights * (regularPrice - discount)
      : 0;

  const { minBookingLength, maxBookingLength } = setting;

  const disabledDays = [
    ...safeBookedDates,
    (date) => isPast(date),
  ];

  return (
    <div className="flex flex-col justify-between text-primary-50">
      <DayPicker
        className="pt-12 place-self-center fill-whites"
        mode="range"
        onSelect={handleSelect}
        selected={displayDateRange}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
        disabled={disabledDays}
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
                <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>

        {dateRange && (dateRange.from || dateRange.to) ? (
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
