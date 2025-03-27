import Image from "next/image";
import Link from "next/link";

export default function ApartmentsStart() {
  return (
    <main className="min-h-dvh">
      <h1 className="mb-11 comfortaa text-5xl text-gold  mt-11 font-bold">
        Выбор дома и этажа
      </h1>
      <div className="grid md:grid-cols-2 gap-5">
        <Link
          href={"menu/discovery"}
          className="flex justify-center items-center"
        >
          <Image
            alt=""
            src={"/images/tablewithweirdtree.png"}
            width={880}
            height={580}
            className=" w-full h-full brightness-50 hover:brightness-70 cursor-pointer transition-all duration-300"
          />
          <p className="uppercase absolute text-2xl text-white font-bold nunito-sans">
            По параметрам
          </p>
        </Link>
        <Link
          href={"menu/houses"}
          className="flex justify-center items-center "
        >
          <Image
            width={880}
            height={580}
            alt=""
            src={"/images/tablewithweirdtree.png"}
            className="w-full h-full brightness-50 hover:brightness-70 cursor-pointer transition-all duration-300"
          />
          <p className="uppercase absolute text-2xl text-white font-bold nunito-sans">
            на ГЕНплане
          </p>
        </Link>
      </div>
    </main>
  );
}
