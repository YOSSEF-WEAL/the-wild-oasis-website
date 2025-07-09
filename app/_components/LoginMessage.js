import Link from "next/link";

function LoginMessage() {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-800">
      <p className="text-center text-2xl py-6 self-center">
        Please login to reserve this cabin right now
      </p>
      <Link
        href="/login"
        className="underline text-lg px-6 py-3 w-fit h-fit bg-accent-500 text-white "
      >
        login
      </Link>
    </div>
  );
}

export default LoginMessage;
