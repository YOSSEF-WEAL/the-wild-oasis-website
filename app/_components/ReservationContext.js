"use client";

import { createContext, useContext, useState } from "react";

// Reservation Context
const ReservationContext = createContext();

function ReservationProvider({ children }) {
  // Example: User information (replace with your actual reservation data)
  const [reservationData, setReservationData] = useState({
    user: { name: "Guest", id: null },
    // Add other reservation-related data here
  });

  return (
    <ReservationContext.Provider
      value={{ reservationData, setReservationData }}
    >
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }

  return context;
}

// Date Context
const DateContext = createContext();

const initialDateState = { from: null, to: null };

function DateProvider({ children }) {
  const [dateRange, setDateRange] = useState(initialDateState);
  const resetDateRange = () => setDateRange(initialDateState);

  return (
    <DateContext.Provider value={{ dateRange, setDateRange, resetDateRange }}>
      {children}
    </DateContext.Provider>
  );
}

function useDateRange() {
  const context = useContext(DateContext);

  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateProvider"); // Corrected error message
  }

  return context;
}

export { ReservationProvider, useReservation, DateProvider, useDateRange };
