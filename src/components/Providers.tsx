"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// There are multiple approaches to this problem
// Like you can have query client as a global object
// Or do useState to sync with component life cycle
// For simplicity sake I choose to keep it as a global object(singleton)
const queryClient = new QueryClient();

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
