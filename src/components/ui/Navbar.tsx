"use client";
import Image from "next/image";
import Link from "next/link";
import { BiPhone } from "react-icons/bi";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMenu}
        />
      )}

      <nav className="h-24 flex items-center justify-between text-gold nunito-sans px-4 lg:px-16 relative">
        <div
          className={`
          fixed top-0 left-0 h-full w-64 lg:w-96 bg-white z-50 shadow-xl transform transition-transform duration-300
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} 2xl:hidden
        `}
        >
          <div className="p-4 border-b">
            <Image width={126} height={30} src={"/logo.svg"} alt="piermont" />
          </div>
          <ul className="flex flex-col p-4 gap-4 font-extrabold">
            <li className="hover:bg-gold hover:text-white px-4 transition-colors duration-200">
              <Link href={"#"} className="block py-2">
                О проекте
              </Link>
            </li>
            <li className="hover:bg-gold hover:text-white px-4 transition-colors duration-200">
              <Link href={"#"} className="block py-2">
                Архитектура
              </Link>
            </li>
            <li className="hover:bg-gold hover:text-white px-4 transition-colors duration-200">
              <Link href={"#"} className="block py-2">
                Выбор квартиры
              </Link>
            </li>
            <li className="hover:bg-gold hover:text-white px-4 transition-colors duration-200">
              <Link href={"#"} className="block py-2">
                Контакты
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:flex-1 flex justify-center lg:justify-start">
          <Image
            width={126}
            height={30}
            src={"/logo.svg"}
            alt="piermont"
            className="relative bottom-2"
          />
        </div>

        <ul className="hidden 2xl:block gap-6 font-extrabold flex-1 justify-center">
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

        <div className="flex items-center gap-4 lg:gap-10">
          <div className="hidden lg:flex items-center gap-6">
            <p className="font-extrabold text-lg">+7 347 200-00-00</p>
            <BiPhone className="w-7 h-7 hover:rotate-40 transition duration-300" />
          </div>
          <button
            className="hidden xl:block text-[1rem] rounded-[77px] px-6 lg:px-10 py-3 lg:py-4 border
              hover:bg-gold hover:text-slate-50 uppercase font-bold transition duration-300"
          >
            Выбрать квартиру
          </button>

          <p className="font-extrabold text-lg hidden sm:block lg:hidden">
            +7 347 200-00-00
          </p>
          <BiPhone className="lg:hidden w-6 h-7 hover:rotate-40 transition duration-300" />
          <button
            className="2xl:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
