"use client";
import BackButton from "@/components/ui/BackButton";
import { useApartmentsQuery } from "@/hooks/useApartmentsQuery";
import { useParams } from "next/navigation";
import {
  FaBed,
  FaRulerCombined,
  FaKey,
  FaLock,
  FaTag,
  FaHome,
  FaMoneyBillWave,
} from "react-icons/fa";
import Image from "next/image";
import Spinner from "@/components/Spinner";

export default function ApartmentPage() {
  const params = useParams<{ id: string }>();
  const apartmentId = Number.parseInt(params.id);

  const {
    data: apartment,
    isLoading,
    isError,
  } = useApartmentsQuery({
    type: "apartment",
    id: apartmentId,
  });

  const getStatusIcon = () => {
    switch (apartment?.status) {
      case "available":
        return <FaKey className="text-green-600" />;
      case "reserved":
        return <FaTag className="text-yellow-500" />;
      case "sold":
        return <FaHome className="text-red-600" />;
      default:
        return <FaLock className="text-gray-600" />;
    }
  };

  const getStatusText = () => {
    switch (apartment?.status) {
      case "available":
        return "Свободно";
      case "reserved":
        return "Зарезервировано";
      case "sold":
        return "Продано";
      default:
        return "Занято";
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !apartment) {
    return (
      <main className="min-h-dvh bg-white px-4 md:px-16 py-11 mt-16">
        <BackButton text="Назад к выбору этажа" />
        <div className="max-w-4xl mx-auto mt-8 text-center py-16">
          <h2 className="text-2xl font-bold text-red-600">Ошибка загрузки</h2>
          <p className="mt-4 text-gray-600">
            Не удалось загрузить информацию о квартире
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-dvh bg-white px-4 md:px-16 py-11 mt-16">
      <BackButton text="Назад к выбору этажа" />

      <div className="max-w-4xl mx-auto mt-8">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900">
            Квартира №{apartment.apartmentNumber}
          </h1>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm font-medium">
            {getStatusIcon()}
            {getStatusText()}
          </span>
        </div>
        <p className="text-gray-500 mt-2">Этаж {apartment.floorNumber}</p>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Image Section */}
          <div className="relative aspect-square bg-gray-100 rounded-xl overflow-hidden">
            {apartment.imageMapping ? (
              <Image
                src={"/images/apartmentwithghostsabsolutelyfree.png"}
                alt={`Квартира ${apartment.apartmentNumber}`}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span>Изображение отсутствует</span>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaBed />
                  <span className="text-sm">Комнат</span>
                </div>
                <p className="text-xl font-semibold mt-1">
                  {apartment.rooms || "—"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaRulerCombined />
                  <span className="text-sm">Площадь</span>
                </div>
                <p className="text-xl font-semibold mt-1">
                  {apartment.squareMeters
                    ? `${apartment.squareMeters} м²`
                    : "—"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 text-gray-600">
                  <FaMoneyBillWave />
                  <span className="text-sm">Цена</span>
                </div>
                <p className="text-xl font-semibold mt-1">
                  {apartment.price
                    ? `${apartment.price.toLocaleString()} ₽`
                    : "—"}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-medium text-lg mb-4">Информация</h3>
              <p className="text-gray-600">{"Описание отсутствует"}</p>
            </div>

            {apartment.status === "available" && (
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Оставить заявку
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
