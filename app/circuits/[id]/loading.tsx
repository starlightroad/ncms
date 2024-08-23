function Header() {
  return (
    <div className="mb-6 flex justify-end lg:justify-between">
      <div className="hidden h-9 w-48 rounded-lg bg-gray-100 lg:block"></div>
      <div className="flex space-x-3">
        <div className="h-9 w-20 rounded-lg bg-gray-100"></div>
        <div className="h-9 w-20 rounded-lg bg-gray-100"></div>
      </div>
    </div>
  );
}

function Cards() {
  return (
    <div className="grid grid-cols-1 grid-rows-4 gap-6 lg:grid-cols-2">
      <div className="col-span-1 h-80 rounded-md bg-gray-100"></div>
      <div className="col-span-1 h-80 rounded-md bg-gray-100"></div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="bg-white py-8 lg:py-16">
      <div className="animate-pulse">
        <Header />
        <Cards />
      </div>
    </div>
  );
}
