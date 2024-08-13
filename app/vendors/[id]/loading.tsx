function Header() {
  return (
    <div className="mb-6 flex justify-between">
      <div className="h-9 w-48 rounded-lg bg-gray-100"></div>
      <div className="flex space-x-3">
        <div className="h-9 w-20 rounded-lg bg-gray-100"></div>
        <div className="h-9 w-20 rounded-lg bg-gray-100"></div>
      </div>
    </div>
  );
}

function Card() {
  return <div className="col-span-1 h-80 rounded-md bg-gray-100"></div>;
}

export default function Loading() {
  return (
    <div className="bg-white">
      <div className="animate-pulse">
        <Header />
        <Card />
      </div>
    </div>
  );
}
