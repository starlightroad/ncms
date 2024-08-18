import { getCardData } from '@/app/data/dashboard';
import CircuitsCard from '@/app/ui/dashboard/circuits-card';
import VendorsCard from '@/app/ui/dashboard/vendors-card';
import LocationsCard from '@/app/ui/dashboard/locations-card';

export default async function CardsWrapper() {
  const data = await getCardData();

  return (
    <>
      <CircuitsCard count={data.circuitCount} />
      <VendorsCard count={data.vendorCount} />
      <LocationsCard count={data.locationCount} />
    </>
  );
}
