import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="z-10 flex w-full items-center justify-between border-b-[0.2px] border-slate-400 bg-gray-100 px-6 py-4">
      {/* logo */}
      <Image src="/archivLogo.svg" alt="Archiv Logo" width={60} height={10} />

      {/* nav links */}
      <div></div>

      {/* auth buttons */}
      <ul className="flex items-center gap-4">
        <li>
          <button className="text-sm font-medium text-slate-600">Login</button>
        </li>
        <li>
          <button className="rounded-md bg-blue-500/50 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600/50">
            Sign Up
          </button>
        </li>
      </ul>
    </nav>
  );
}
