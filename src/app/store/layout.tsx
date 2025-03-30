"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

type BreadcrumbItem = {
  routeSegment: string;
  label: string;
  route?: string;
  href?: string;
};

const BREADCRUMB_ITEMS: BreadcrumbItem[] = [
  {
    routeSegment: "menu",
    label: "Выбор квартиры",
  },
  {
    routeSegment: "complex",
    label: "Выбор дома",
  },
  {
    routeSegment: "apartments",
    // can use query params instead of hardcoding this
    label: "3-к квартира 61 м², Секция 1",
  },
  {
    routeSegment: "houses",
    label: "Выбор квартиры на плане",
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
      route: "store",
      href: "/store/menu",
    },
  ];

  let currentRoute = "";
  segments.forEach((segment) => {
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
    <div className="bg-light-grey min-h-screen">
      <div className="text-sm md:text-base px-4 md:px-16 pt-16">
        {breadcrumbs.map(({ label, route, href }, index) => {
          const isLast = index === lastIndex;
          return (
            <div key={index} className="inline-flex items-center">
              {route && !isLast ? (
                <Link
                  href={href ?? route}
                  className="text-slate-800 hover:text-black transition-colors duration-200"
                >
                  {label}
                </Link>
              ) : (
                <span className="text-gray-500">{label}</span>
              )}
              {!isLast && <span className="mx-2 text-gray-400"> — </span>}
            </div>
          );
        })}
      </div>

      {children}
    </div>
  );
}
