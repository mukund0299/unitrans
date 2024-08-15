import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";

export default function SideNav() {
    return (
      <div className="flex h-full flex-col px-3 py-4 md:px-2">
        <Link
          className="mb-2 flex h-20 items-end justify-start rounded-md p-4"
          href="/"
        >
        <Image src={"/unitrans_small.png"} height={50} width={50} alt="Unitrans logo" />
        </Link>
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
          <NavLinks />
          <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        </div>
      </div>
    );
  }