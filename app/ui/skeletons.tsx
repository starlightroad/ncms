export function TableSkeleton() {
  return (
    <div className="bg-white">
      <div className="h-72 animate-pulse rounded-xl bg-gray-100"></div>
    </div>
  );
}

export function DashboardMapSkeleton() {
  return <div className="col-span-6 row-span-2 animate-pulse rounded-xl bg-gray-100"></div>;
}
