"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import { format } from "date-fns";
import { useDateRange } from "./ReservationContext";

function ReservationReminder() {
  const { dateRange, resetDateRange } = useDateRange();

  if (!dateRange.from || !dateRange.to) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-3xl bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{" "}
        {format(new Date(dateRange.from), "MMM dd yyyy")} to{" "}
        {format(new Date(dateRange.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetDateRange}
      >
        <XMarkIcon className="h-7 w-7" />
      </button>
    </div>
  );
}

export default ReservationReminder;
