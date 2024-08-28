import Image from "next/image";
import Link from "next/link";
import { lusitana } from "../styles/fonts";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function Home() {
  return (
      <main className="flex min-h-screen flex-col p-6">
        <Image 
          src={"/unitrans_full.png"}
          width={1000}
          height={50}
          alt="Unitrans full logo"
        />
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <p
              className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}
            >
              <strong>Welcome to Unitrans Management Console.</strong> This site is currently under construction.
            </p>
            <Link
              href="/console/trainingassignments"
              className="flex items-center gap-5 self-start rounded-lg unitrans-bg-red px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
            >
              <span>Go to Training Assignments Generator</span> <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </div>
      </main>
  );
}
