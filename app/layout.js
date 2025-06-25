import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";
// import "@/app/_styles/globals.css";
import "./_styles/globals.css";

export const metadata = {
  title: "The Wild Oasis",
  description: "The Wild Oasis Website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>

        <footer>Copyright by The Wild Oasis</footer>
      </body>
    </html>
  );
}
