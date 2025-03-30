"use client";
import Spinner from "@/components/Spinner";
import useComplexQuery from "@/hooks/useComplexQuery";
import { Complex, Floor, FloorImageMapping, House } from "@/lib/types";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import ImageMapper, { MapArea } from "react-img-mapper";
import { MouseTooltipWrapper } from "@/components/MouseTooltipWrapper";
import { normalizeImageMapping } from "@/lib/utils/math";

export default function ComplexPage() {
  const { data, status } = useComplexQuery({
    type: "complexes",
    // supposedly we sort in some way to get one complex
    params: "?sort=yearBuilt&status=active",
  });
  const imageRef = useRef<HTMLImageElement | undefined | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const [tooltipState, setTooltipState] = useState<
    ({ floor?: Floor; house?: House } & { isHovered?: boolean }) | null
  >(null);
  const [hasImageLoaded, setHasImageLoaded] = useState(false);

  useEffect(() => {
    setHasImageLoaded(false);
  }, [data]);

  // using memo, to cache an expensive calculation
  // like if tooltip state updates, we won't recalc.
  const areas = useMemo(() => {
    const image = imageRef.current;

    if (status === "success" && image && hasImageLoaded) {
      const [complex] = data as Complex[];

      const areas2D = complex.houses.map((house) => {
        // YES I KNOW IT NEEDS A REFACTOR
        if (house.imageMapping) {
          const { shapeType, color } = house.imageMapping;
          return {
            house,
            id: String(house.id),
            title: house.name || `Floor ${house}`,
            shape: shapeType,
            name: "1",
            strokeColor: "rgba(0,0,0,0)",
            coords: normalizeImageMapping(house.imageMapping, image),
            preFillColor: color,
            href: `complex/houses/1?floorNumber=5`,
          } as MapArea;
        }
        // filter floors that have image mapping
        return house.floors
          .filter((f) => f.imageMapping)
          .map((item) => {
            const { shapeType, color } = item.imageMapping as FloorImageMapping;
            return {
              floor: item,
              house,
              id: String(item.id),
              title: item.name || `Floor ${item.floorNumber}`,
              shape: shapeType,
              name: "1",
              strokeColor: "rgba(0,0,0,0)",
              coords: normalizeImageMapping(
                item.imageMapping as FloorImageMapping,
                image,
              ),
              preFillColor: color,
              href: `complex/houses/${house.id}?floorNumber=${item.floorNumber}`,
            } as MapArea;
          });
      });

      return areas2D.flat();
    }
    return [];
  }, [status, data, hasImageLoaded]);

  if (status === "error") {
    return "ops...";
  }

  const complex = data?.at(0);

  let tooltip: ReactNode | null = null;
  if (tooltipState) {
    // this is tooltip content
    const floor = tooltipState.floor?.floorNumber;
    tooltip = (
      <div className="backdrop-blur-sm p-4 rounded-lg bg-gold relative -top-[110%] -right-[110%] pointer-events-none">
        <p className="text-white">{tooltipState.house?.name}</p>
        <div className="min-w-11/12 min-h-[1px] bg-white my-2 rounded-xl" />
        <p className="text-white w-50">
          {Number.isFinite(floor)
            ? `${floor} Этаж`
            : "It's too expensive bro. We do not sell it."}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-dvh px-16">
      <section>
        <h1 className="text-5xl mb-16 comfortaa text-gold font-bold mt-11">
          Выбор дома
        </h1>
        <MouseTooltipWrapper ref={tooltipRef} element={tooltip}>
          <div className="relative min-h-dvh">
            {!hasImageLoaded && <Spinner className="absolute" />}

            {complex ? (
              <ImageMapper
                ref={(r) => {
                  imageRef.current = r?.getRefs().imgRef;
                }}
                src={complex.complexImageUrl}
                name={complex.name}
                areas={areas}
                onLoad={() => setHasImageLoaded(true)}
                onMouseEnter={(area) => {
                  if (imageRef.current)
                    imageRef.current.style.cursor = "pointer";
                  const { house, floor } = area as MapArea & {
                    house?: House;
                    floor?: Floor;
                  };
                  if (house)
                    setTooltipState({
                      floor: floor,
                      house: house,
                    });
                }}
                onMouseLeave={() => {
                  if (imageRef.current)
                    imageRef.current.style.cursor = "default";
                  setTooltipState(null);
                }}
              />
            ) : (
              <Spinner />
            )}
          </div>
        </MouseTooltipWrapper>
      </section>
    </main>
  );
}
