import Link from "next/link";

export default function RouteToLogin() {
  return (
    <div className="wrapper">
      <h1 className="title font-Chivo font-black text-3xl">
        You must Login First!
      </h1>
      <div className="wrapper flex gap-4 mt-8">
        <Link href="/login" passHref>
          <button className="font-Commisioner font-medium text-base text-white px-8 py-3 bg-sky-400 rounded-full">
            Login
          </button>
        </Link>
        <Link href="/register" passHref>
          <button className="font-Commisioner font-medium text-base text-white px-8 py-3 bg-gray-500 rounded-full">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
