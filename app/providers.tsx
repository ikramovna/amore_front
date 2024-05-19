"use client";

import { FC, ReactNode } from "react";
import "./globals.css";
import "react-multi-carousel/lib/styles.css";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ProgressBar
          height="3px"
          color="#047FC6"
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster />
        {children}
      </QueryClientProvider>
    </>
  );
};

export default Providers;
