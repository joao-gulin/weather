import { Skeleton } from "./ui/skeleton";

export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen space-y-3">
      <Skeleton className="h-[125px] w-full max-w-[250px] rounded-xl" />
      <div className="space-y-2 w-full max-w-[250px]">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}