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
        const company = await client.company.findUnique({
          where: { name: location.company_name },
        });

        return client.location.create({
          data: {
            companyId: company.id,
            name: location.name,
            street: location.street,
            city: location.city,
            state: location.state,
            zip: location.zip,
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

const main = async () => {
  await seedCompanies();
  await seedUsers();
  await seedLocations();
  await seedVendors();
  await seedCircuits();
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
