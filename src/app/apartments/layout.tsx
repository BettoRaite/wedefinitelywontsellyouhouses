"use client";
import { usePathname } from "next/navigation";
type RouteLabel = {
  routeSegment: string;
  label: string;
};

const ROUTE_LABEL: RouteLabel[] = [
  {
    routeSegment: "start",
    label: "выбор квартиры",
  },
];


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const path: RouteLabel[] = [];
  const pathLenght = path.length;
  for (const s of segments) {
    const i = ROUTE_LABEL.find(({ routeSegment }) => routeSegment === s);
    if(i) {
      path.push(i);
    }
  }
  return (
    <div className="bg-light-grey px-16">
      <div className="pt-16">{path.map(()={

        })}</div>
      {children}
    </div>
  );
}
