import Skeleton from "./Skeleton";

function RecentTransactionsSkeleton() {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl">

      {/* Header */}

      <div className="mb-5 flex items-center justify-between">

        <Skeleton className="h-7 w-52 rounded-xl" />

        <Skeleton className="h-8 w-24 rounded-full" />

      </div>

      {/* Transactions */}

      <div className="space-y-4">

        {[1, 2, 3, 4, 5].map((item) => (

          <div
            key={item}
            className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >

            <div className="space-y-3">

              <Skeleton className="h-5 w-40" />

              <div className="flex gap-3">

                <Skeleton className="h-6 w-20 rounded-full" />

                <Skeleton className="h-5 w-28" />

              </div>

            </div>

            <div className="space-y-3 text-right">

              <Skeleton className="ml-auto h-6 w-24" />

              <Skeleton className="ml-auto h-4 w-20" />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentTransactionsSkeleton;