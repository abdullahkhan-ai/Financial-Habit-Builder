import Skeleton from "./Skeleton";

function PageHeaderSkeleton() {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div className="space-y-3">

        <Skeleton className="h-9 w-52" />

        <Skeleton className="h-5 w-72" />

      </div>

      <div className="flex gap-3">

        <Skeleton className="h-11 w-28 rounded-xl" />

        <Skeleton className="h-11 w-36 rounded-xl" />

      </div>

    </div>
  );
}

export default PageHeaderSkeleton;