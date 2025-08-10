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
import { useState, useEffect } from "react";

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
  const [numberOfMonths, setNumberOfMonths] = useState(1);

  useEffect(() =>
  {
    const handleResize = () =>
    {
      setNumberOfMonths(window.innerWidth >= 768 ? 2 : 1);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    <div className="flex flex-col h-full min-h-[400px] lg:min-h-[500px] bg-primary-950">
      {/* Calendar Section */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-full overflow-hidden">
          <style jsx global>{`
            .rdp {
              margin: 0 !important;
            }
            .rdp-table {
              font-size: 0.875rem;
            }
            @media (min-width: 768px) {
              .rdp-table {
                font-size: 1rem;
              }
            }
            .rdp-day {
              width: 2rem;
              height: 2rem;
            }
            @media (min-width: 768px) {
              .rdp-day {
                width: 2.5rem;
                height: 2.5rem;
              }
            }
            @media (min-width: 1024px) {
              .rdp-day {
                width: 3rem;
                height: 3rem;
              }
            }
            .rdp-months {
              display: flex;
              flex-direction: column;
              gap: 1rem;
            }
            @media (min-width: 768px) {
              .rdp-months {
                flex-direction: row;
                gap: 2rem;
              }
            }
            .rdp-month {
              width: 100%;
            }
            @media (min-width: 768px) {
              .rdp-month {
                width: auto;
              }
            }
          `}</style>

          <DayPicker
            className="text-primary-50 w-full"
            mode="range"
            onSelect={handleSelect}
            selected={displayDateRange}
            min={minBookingLength + 1}
            max={maxBookingLength}
            fromMonth={new Date()}
            fromDate={new Date()}
            toYear={new Date().getFullYear() + 5}
            captionLayout="dropdown"
            numberOfMonths={numberOfMonths}
            disabled={disabledDays}
          />
        </div>
      </div>

      {/* Price Summary Section */}
      <div className="bg-accent-500 text-primary-800 px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
          {/* Pricing Info */}
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6 flex-1">
            {/* Price per night */}
            <div className="flex gap-2 items-baseline">
              {discount > 0 ? (
                <>
                  <span className="text-xl md:text-2xl font-semibold">
                    ${regularPrice - discount}
                  </span>
                  <span className="line-through font-semibold text-primary-700 text-sm md:text-base">
                    ${regularPrice}
                  </span>
                </>
              ) : (
                <span className="text-xl md:text-2xl font-semibold">
                  ${regularPrice}
                </span>
              )}
              <span className="text-sm md:text-base">/night</span>
            </div>

            {/* Booking Summary */}
            {displayDateRange.from && displayDateRange.to && (
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="bg-accent-600 px-2 md:px-3 py-1 md:py-2 rounded text-lg md:text-xl font-semibold">
                  {numNights} {numNights === 1 ? 'night' : 'nights'}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="text-sm md:text-base font-bold uppercase">
                    Total
                  </span>
                  <span className="text-xl md:text-2xl font-bold">
                    ${cabinPrice}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Clear Button */}
          {dateRange && (dateRange.from || dateRange.to) && (
            <button
              className="border border-primary-800 hover:bg-primary-800 hover:text-accent-500 py-2 px-4 text-sm md:text-base font-semibold transition-colors rounded self-start sm:self-center"
              onClick={resetDateRange}
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DateSelector;