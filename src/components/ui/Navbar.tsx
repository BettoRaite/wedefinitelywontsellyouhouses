"use client";
import Image from "next/image";
import Link from "next/link";
import { BiPhone } from "react-icons/bi";

function Navbar() {
  return (
    <nav className="h-24 flex items-center justify-between text-gold nunito-sans px-16">
      <Image
        width={126}
        height={30}
        src={"/logo.svg"}
        alt="piermont"
        className="relative bottom-2"
      />
      <ul className="flex gap-6 font-extrabold overflow-hidden">
        <li>
          <Link href={"#"}>О проекте</Link>
        </li>
        <li>
          <Link href={"#"}>Архитектура и благоустройство</Link>
        </li>
        <li>
          <Link href={"#"}>Выбор квартиры</Link>
        </li>
        <li>
          <Link href={"#"}>Контакты</Link>
        </li>
      </ul>
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-6">
          <p className="font-extrabold text-lg">+7 347 200-00-00</p>
          <BiPhone className="w-7 h-7 hover:rotate-40 transition duration-300" />
        </div>
        <button
          className="text-[1rem] rounded-[77px] px-10 py-4 border
            hover:bg-gold hover:text-slate-50 uppercase font-bold  transition duration-300 "
        >
          Выбрать квартиру
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
