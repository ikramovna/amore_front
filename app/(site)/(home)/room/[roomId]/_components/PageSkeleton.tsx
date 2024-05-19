"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function PageSkeleton() {
  return (
    <div className="flex flex-col xl:flex-row gap-8 py-8">
      <div className="w-full xl:w-4/6">
        <Skeleton className="w-full !h-[540px]" />
      </div>
      <div className="w-full xl:w-4/12">
        <div className="flex justify-between items-start">
          <Skeleton className="w-2/4 h-8" />
          <div className="flex items-center gap-0">
            <Skeleton className="w-20 h-8" />
          </div>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <Skeleton className="w-20 h-8" />
        </div>
        <div className="flex flex-col gap-2 mt-3">
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
          <Skeleton className="w-full h-6" />
        </div>
        <div className="block md:flex justify-between xl:block">
          <div className="flex items-center gap-2 mt-4">
            <Skeleton className="w-20" />
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Skeleton className="w-20 h-20 rounded-full" />
            <Skeleton className="w-52 h-8" />
          </div>
        </div>
        <div className="flex xl:w-full xl:flex-col mt-8 gap-2">
          <Skeleton className="w-full h-10" />
          <Skeleton className="w-full h-10" />
        </div>
      </div>
    </div>
  );
}
