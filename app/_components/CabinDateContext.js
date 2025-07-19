"use client";

import { createContext, useContext, useState } from "react";

const CabinDateContext = createContext();

const initialDateState = { from: null, to: null };

function CabinDateProvider({ children }) {
  const [dateRange, setDateRange] = useState(initialDateState);
  const resetDateRange = () => setDateRange(initialDateState);

  return (
    <CabinDateContext.Provider
      value={{ dateRange, setDateRange, resetDateRange }}
    >
      {children}
    </CabinDateContext.Provider>
  );
}

function useCabinDateRange() {
  const context = useContext(CabinDateContext);

  if (context === undefined) {
    throw new Error(
      "useCabinDateRange must be used within a CabinDateProvider"
    );
  }

  return context;
}

export { CabinDateProvider, useCabinDateRange };
