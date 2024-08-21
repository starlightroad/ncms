const { PrismaClient } = require('@prisma/client');
const client = new PrismaClient();
const brypt = require('bcrypt');
const placeholderData = require('../app/data/placeholder-data.js');

const seedCompanies = async () => {
  const { companies } = placeholderData;

  try {
    const insertedCompanies = await Promise.all(
      companies.map(async (company) => {
        return client.company.create({
          data: {
            name: company.name,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedCompanies.length} companies.`);
  } catch (error) {
    console.error('Failed to seed companies:', error);
    throw error;
  }
};

const seedUsers = async () => {
  const { users } = placeholderData;

  try {
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const company = await client.company.findUnique({ where: { name: user.company_name } });
        const hashedPassword = await brypt.hash(user.password, 10);

        return client.user.create({
          data: {
            companyId: company.id,
            name: user.name,
            email: user.email,
            password: hashedPassword,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedUsers.length} users.`);
  } catch (error) {
    console.error('Failed to seed users:', error);
    throw error;
  }
};

const seedLocations = async () => {
  const { locations } = placeholderData;

  try {
    const insertedLocations = await Promise.all(
      locations.map(async (location) => {
        const { company_name, name, street, city, state, zip } = location;

        const companyPro = client.company.findUnique({
          where: { name: company_name },
        });
        const coordsPro = getXYCoordinates({ street, city, state, zip });

        const [company, coords] = await Promise.all([companyPro, coordsPro]);

        return client.location.create({
          data: {
            companyId: company.id,
            name,
            street,
            city,
            state,
            zip,
            longitude: coords.x,
            latitude: coords.y,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedLocations.length} locations.`);
  } catch (error) {
    console.error('Failed to seed locations:', error);
    throw error;
  }
};

const seedVendors = async () => {
  const { vendors } = placeholderData;

  try {
    const insertedVendors = await Promise.all(
      vendors.map(async (vendor) => {
        const company = await client.company.findUnique({ where: { name: vendor.company_name } });

        return client.vendor.create({
          data: {
            companyId: company.id,
            name: vendor.name,
            website: vendor.website,
            phone: vendor.phone,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedVendors.length} vendors.`);
  } catch (error) {
    console.error('Failed to seed vendors:', error);
    throw error;
  }
};

const seedCircuits = async () => {
  const { circuits } = placeholderData;

  try {
    const insertedCircuits = await Promise.all(
      circuits.map(async (circuit) => {
        const company = await client.company.findUnique({ where: { name: circuit.company_name } });

        const vendorPro = client.vendor.findUnique({
          where: { companyId: company.id, name: circuit.vendor_name },
        });
        const location1Pro = client.location.findUnique({
          where: { companyId: company.id, name: circuit.location1_name },
        });
        const location2Pro = client.location.findUnique({
          where: { companyId: company.id, name: circuit.location2_name },
        });
        const [vendor, location1, location2] = await Promise.all([
          vendorPro,
          location1Pro,
          location2Pro,
        ]);

        return client.circuit.create({
          data: {
            companyId: company.id,
            vendorId: vendor.id,
            location1Id: location1.id,
            location2Id: location2.id,
            cid: circuit.circuit_id,
            type: circuit.type,
            capacity: circuit.capacity,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedCircuits.length} circuits.`);
  } catch (error) {
    console.error('Failed to seed circuits:', error);
    throw error;
  }
};

const seedStats = async () => {
  const { mapLoads } = placeholderData;

  try {
    const insertedStats = await Promise.all(
      mapLoads.map(async (stat) => {
        const company = await client.company.findUnique({ where: { name: stat.company_name } });

        return client.mapLoad.create({
          data: {
            companyId: company.id,
            monthId: stat.month_id,
            day: stat.day,
            year: stat.year,
            count: stat.count,
          },
        });
      }),
    );

    console.log(`Seeded ${insertedStats.length} stats.`);
  } catch (error) {
    console.error('Failed to seed stats:', error);
    throw error;
  }
};

const main = async () => {
  await seedCompanies();
  await seedUsers();
  await seedLocations();
  await seedVendors();
  await seedCircuits();
  await seedStats();
};

main()
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await client.$disconnect();
    process.exit(1);
  });

async function getXYCoordinates(address) {
  const apiUrl = 'https://geocoding.geo.census.gov';
  const street = address.street.replaceAll(' ', '+');
  const { city, state, zip } = address;
  const benchmark = 'Public_AR_Current';
  const url = `${apiUrl}/geocoder/locations/address?street=${street}&city=${city}&state=${state}&zip=${zip}&benchmark=${benchmark}&format=json`;

  const res = await fetch(url);
  const data = await res.json();

  const coords = { x: null, y: null };

  if (data.result.addressMatches.length) {
    coords.x = data.result.addressMatches[0].coordinates.x.toFixed(6);
    coords.y = data.result.addressMatches[0].coordinates.y.toFixed(6);
  }

  return coords;
}
