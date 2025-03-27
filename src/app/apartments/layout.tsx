"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

type BreadcrumbItem = {
  routeSegment: string;
  label: string;
  route?: string;
};

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  {
    routeSegment: "menu",
    label: "Выбор квартиры",
  },
  {
    routeSegment: "houses",
    label: "Выбор дома",
  },
  {
    routeSegment: "discovery",
    label: "Выбор квартиры по параметрам",
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    {
      routeSegment: "apartments",
      label: "Главная",
      route: "menu",
    },
  ];

  let currentRoute = "";
  segments.forEach((segment, index) => {
    currentRoute += `/${segment}`;
    const item = BREADCRUMB_ITEMS.find(
      ({ routeSegment }) => routeSegment === segment,
    );
    if (item) {
      breadcrumbs.push({
        ...item,
        route: currentRoute,
      });
    }
  });

  const lastIndex = breadcrumbs.length - 1;

  return (
    <div className="bg-light-grey px-4 md:px-16 py-8 min-h-screen">
      <div className="breadcrumbs py-4 text-sm md:text-base">
        {breadcrumbs.map(({ routeSegment, label, route }, index) => {
          const isLast = index === lastIndex;
          return (
            <span key={routeSegment} className="inline-flex items-center">
              {route && !isLast ? (
                <Link
                  href={route}
                  className="text-slate-800 hover:text-black transition-colors duration-200"
                >
                  {label}
                </Link>
              ) : (
                <span className="text-gray-500">{label}</span>
              )}
              {!isLast && <span className="mx-2 text-gray-400"> — </span>}
            </span>
          );
        })}
      </div>

      {children}
    </div>
  );
}
