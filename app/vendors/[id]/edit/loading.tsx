function Header() {
  return (
    <div className="mb-6">
      <div className="h-9 w-48 rounded-lg bg-gray-100"></div>
    </div>
  );
}

function Card() {
  return <div className="h-80 rounded-md bg-gray-100"></div>;
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
