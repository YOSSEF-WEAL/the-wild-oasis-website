import Header from "./_components/Header";
import
{
  ReservationProvider,
} from "./_components/ReservationContext";
import { CabinDateProvider } from "./_components/CabinDateContext";
import "./_styles/globals.css";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children })
{
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-2 md:px-8 md:py-12 py-1 min-h-full">
          <main className="max-w-[85rem] mx-auto">
            <ReservationProvider>
              <CabinDateProvider>{children}</CabinDateProvider>
            </ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
