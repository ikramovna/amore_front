import { Skeleton } from "@/components/ui/skeleton";

export default function CardSkeleton() {
  return (
    <div className="!w-full">
      <div className="h-[300px] flex gap-2 flex-col md:flex-row">
        <Skeleton className="w-full h-full xl:w-3/4" />
        <div className="h-full flex flex-col gap-2 w-2/4 xl:w-[200px]">
          <Skeleton className="h-full !w-full" />
          <Skeleton className="h-full !w-full" />
        </div>
      </div>
      <div className="flex justify-between mt-4">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
      <div className="flex justify-between mt-2">
        <Skeleton className="w-3/4 h-8" />
        <Skeleton className="w-20 h-8" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-full h-6" />
      </div>
    </div>
  );
}
