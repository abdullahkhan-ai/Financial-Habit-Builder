import Skeleton from "./Skeleton";

function TableSkeleton({
  rows = 6,
  columns = 5,
}) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/80 shadow">

      <table className="w-full">

        <thead>

          <tr className="border-b">

            {Array.from({ length: columns }).map(
              (_, index) => (
                <th
                  key={index}
                  className="px-6 py-4"
                >
                  <Skeleton className="h-5 w-24" />
                </th>
              )
            )}

          </tr>

        </thead>

        <tbody>

          {Array.from({ length: rows }).map(
            (_, row) => (
              <tr
                key={row}
                className="border-b"
              >
                {Array.from({
                  length: columns,
                }).map((_, col) => (
                  <td
                    key={col}
                    className="px-6 py-5"
                  >
                    <Skeleton className="h-5 w-24" />
                  </td>
                ))}
              </tr>
            )
          )}

        </tbody>

      </table>

    </div>
  );
}

export default TableSkeleton;