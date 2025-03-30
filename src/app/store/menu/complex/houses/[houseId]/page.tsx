"use client";
import { useParams, useSearchParams } from "next/navigation";
import useHousesQuery from "@/hooks/useHousesQuery";
import { useApartmentsQuery } from "@/hooks/useApartmentsQuery";
import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import ImageMapper, { MapArea } from "react-img-mapper";
import Spinner from "@/components/Spinner";
import { Apartment, Floor, ImageMappingApartment } from "@/lib/types";
import BackButton from "@/components/ui/BackButton";
import Slider from "@/components/Slider";
import { generateRandomColor } from "@/lib/utils/genRandColor";
import { getPolygonCenter, getRectCenter } from "@/lib/utils/math";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
export default function HousesPage() {
  const { houseId } = useParams();
  const searchParams = useSearchParams();
  const queryFloorNumber = Number(searchParams.get("floorNumber"));
  const [floorNumber, setFloorNumber] = useState(queryFloorNumber);
  const { data: houseData, status: houseStatus } = useHousesQuery({
    type: "house",
    id: houseId as unknown as number,
  });

  const {
    status: apartmentsStatus,
    data: apartmentsData,
    isRefetching: isRefetchingApartments,
  } = useApartmentsQuery({
    type: "apartments",
    params: `?floorNumber=${floorNumber}&liter=a`,
  });

  // in order for image ref element to have the correct width/height it needs to fully load
  const [hasImageLoaded, setHasImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement | undefined | null>(null);

  const floor = houseData?.floors.find(
    (f: Floor) => f.floorNumber === floorNumber,
  );

  useEffect(() => {
    setHasImageLoaded(false);
  }, [floorNumber]);

  const [minFloor, maxFloor] = useMemo(() => {
    const minFloor = Math.min(
      ...(houseData?.floors.map((f) => f.floorNumber) || [0]),
    );
    const maxFloor = Math.max(
      ...(houseData?.floors.map((f) => f.floorNumber) || [0]),
    );
    return [minFloor, maxFloor];
  }, [houseData]);

  const areas = useMemo(() => {
    const floorPlan = imageRef.current;

    if (
      floorPlan &&
      hasImageLoaded &&
      apartmentsStatus === "success" &&
      !isRefetchingApartments
    ) {
      const areas = apartmentsData
        .filter((i) => i.imageMapping)
        .map((i) => {
          const {
            sourceImageHeight = 0,
            sourceImageWidth = 0,
            coordinates = [],
            shapeType,
            color,
          } = i.imageMapping as ImageMappingApartment;
          const normalizedCoords = coordinates.map((coord, i) => {
            if (i % 2 === 0) {
              return (coord / sourceImageWidth) * floorPlan.clientWidth;
            }
            return (coord / sourceImageHeight) * floorPlan.clientHeight;
          });

          return {
            id: String(i.id),
            title: `House ${i.id}`,
            shape: shapeType,
            name: "1",
            apartment: i,
            strokeColor: "rgba(0,0,0,0)",
            preFillColor: color ?? generateRandomColor(0.5),
            coords: normalizedCoords,
            active: false,
            href: `complex/houses/${i.id}?floorNumber=${floorNumber}`,
          } as MapArea;
        });
      return areas;
    }
    return [];
  }, [
    apartmentsStatus,
    hasImageLoaded,
    apartmentsData,
    isRefetchingApartments,
    floorNumber,
  ]);

  const calcVisibleItems = useCallback(
    (val: number) => {
      const items = [];
      if (val > minFloor) {
        items.push(val - 1);
      }
      items.push(val);
      if (val < maxFloor) {
        items.push(val + 1);
      }
      return items.reverse();
    },
    [maxFloor, minFloor],
  );

  const sliderOnChange = useCallback((val: number) => {
    setFloorNumber(val);
  }, []);

  if (houseStatus === "error" || apartmentsStatus === "error") {
    return <div className="text-red-500">Error loading data</div>;
  }

  if (!floor && houseStatus === "success") {
    return <div>Floor not found</div>;
  }
  const apartmentsLoading =
    apartmentsStatus === "pending" || isRefetchingApartments;
  return (
    <main className="min-h-dvh bg-white px-16 py-11 mt-16">
      <BackButton text="Назад к выбору этажа" />
      <section>
        <h1 className="text-5xl mb-16 comfortaa text-gold font-bold mt-11">
          Выбор квартиры
        </h1>
        <div className="relative grid grid-cols-[30%_1fr_30%]">
          {/* House info */}
          <div>
            <div>
              <p className="text-gold mb-3 text-base uppercase">Дом</p>
              <h3 className="text-3xl text-medium-grey mb-8">
                {houseData?.name ?? <Spinner position="default" />}
              </h3>
            </div>
            <div>
              <p className="text-gold mb-3 text-base uppercase">Срок сдачи</p>
              <h3 className="text-3xl text-medium-grey">
                {new Date(2028, 11, 31).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </h3>
            </div>
          </div>
          {/* Floor Plan */}
          {apartmentsLoading || !floor ? (
            <div className="flex justify-center items-center">
              <Spinner position="default" />
            </div>
          ) : (
            <div className="w-full relative">
              <ImageMapper
                ref={(r) => {
                  imageRef.current = r?.getRefs().imgRef;
                }}
                src={floor.image.url ?? ""}
                name={floor.name || "Unnamed"}
                areas={areas}
                onLoad={() => setHasImageLoaded(true)}
              />

              {/* Apartment labels */}
              {/* I KNOW IT NEEDS TO BE EXTRACTED INTO ITS OWN COMPONENT )))))*/}
              {areas.map((area) => {
                const { id, coords, shape, apartment } = area as MapArea & {
                  apartment: Apartment;
                };
                const [centerX, centerY] =
                  shape === "rect"
                    ? getRectCenter(coords)
                    : getPolygonCenter(coords);

                const { apartmentNumber, status } = apartment as Apartment;

                const isAvailable = status === "available";

                return (
                  <Link
                    href={`/store/menu/discovery/apartments/${id}`}
                    key={`${id}-label`}
                    className="absolute z-40 min-w-[80px] text-center transition-all duration-200 hover:scale-105 cursor-pointer"
                    style={{
                      left: `${centerX}px`,
                      top: `${centerY}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className={`
                                   bg-light-grey p-2 shadow-lg
                                    transition-all duration-200 hover:shadow-xl
                                 `}
                    >
                      <p className="font-thin text-slate-500 text-lg">
                        {apartmentNumber}
                      </p>
                      <p
                        className={`
                                     text-sm font-thin mt-1 flex justify-center
                                     ${isAvailable ? "text-gray-600" : "text-some-grey"}
                                   `}
                      >
                        {isAvailable ? "Свободно" : <FaLock />}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          <Slider
            isReverse
            minValue={minFloor}
            maxValue={maxFloor}
            initialValue={floorNumber}
            calculateVisibleItems={calcVisibleItems}
            onChange={sliderOnChange}
          />
        </div>
      </section>
    </main>
  );
}
