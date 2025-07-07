'use client';

import { XMarkIcon } from '@heroicons/react/24/solid';
import { format } from 'date-fns';
import { useReservation } from './ReservationContext';

function ReservationReminder()
{
  // CHANGE
  const { ring, resetRange } = useReservation();

  if (!ring.from || !ring.to) return null;

  return (
    <div className='fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center'>
      <p>
        <span>👋</span> Don&apos;t forget to reserve your dates <br /> from{' '}
        {format(new Date(ring.from), 'MMM dd yyyy')} to{' '}
        {format(new Date(ring.to), 'MMM dd yyyy')}
      </p>
      <button onClick={resetRange} className='rounded-full cursor-pointer p-1 hover:bg-accent-600 transition-all'>
        <XMarkIcon className='h-8 w-8' />
      </button>
    </div>
  );
}

export default ReservationReminder;
