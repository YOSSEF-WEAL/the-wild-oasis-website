import { auth } from "../_lib/auth";

export const metadata = {
  title: "Account",
};

async function page() {
  const session = await auth();
  const firstName = session.user.name.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 md-7">
      Welcome, {firstName}
    </h2>
  );
}

export default page;
