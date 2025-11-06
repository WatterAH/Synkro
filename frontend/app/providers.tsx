"use client";
import { Toaster } from "sonner";
import { ProgressProvider } from "@bprogress/next/app";
import { UserProvider } from "@/context/UserContext";
import { CookiesProvider } from "react-cookie";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <CookiesProvider>
        <ProgressProvider
          height="6px"
          color="#6fb0a2"
          options={{ showSpinner: false }}
          shallowRouting
        >
          {children}
          <Toaster richColors position="top-right" />
        </ProgressProvider>
      </CookiesProvider>
    </UserProvider>
  );
}
